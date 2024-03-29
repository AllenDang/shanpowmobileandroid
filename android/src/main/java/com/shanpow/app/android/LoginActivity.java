package com.shanpow.app.android;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Intent;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shanpow.app.entity.LoginResult;
import com.shanpow.app.service.ShanpowErrorHandler;
import com.shanpow.app.service.ShanpowRestClient;
import com.shanpow.app.util.AppPref_;
import com.shanpow.app.util.Constant;
import com.shanpow.app.util.Util;
import com.tencent.connect.UserInfo;
import com.tencent.tauth.IUiListener;
import com.tencent.tauth.Tencent;
import com.tencent.tauth.UiError;

import org.androidannotations.annotations.AfterInject;
import org.androidannotations.annotations.AfterViews;
import org.androidannotations.annotations.Background;
import org.androidannotations.annotations.Bean;
import org.androidannotations.annotations.Click;
import org.androidannotations.annotations.EActivity;
import org.androidannotations.annotations.UiThread;
import org.androidannotations.annotations.ViewById;
import org.androidannotations.annotations.rest.RestService;
import org.androidannotations.annotations.sharedpreferences.Pref;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by allendang on 14-3-26.
 */
@EActivity(R.layout.activity_login)
public class LoginActivity extends Activity {

    private static final int REQUEST_CODE_QQREGISTER = 1;

    private ProgressDialog mProgressDialog;

    Tencent mTencent;

    @ViewById
    EditText edt_email;

    @ViewById
    EditText edt_password;

    @ViewById
    TextView tv_errormsg;

    @ViewById
    Button btn_login;

    @RestService
    ShanpowRestClient restClient;

    @Bean
    ShanpowErrorHandler errorHandler;

    @Pref
    AppPref_ pref;

    @AfterViews
    void init() {
        restClient.setCookie(Constant.CSRF_TOKEN, pref.csrfToken().get());
        mTencent = Tencent.createInstance(Constant.TENCENT_APPID, getApplicationContext());
    }

    @AfterInject
    void afterInject() {
        restClient.setRestErrorHandler(errorHandler);
    }

    @Click
    void btn_loginClicked() {
        //登陆
        String email = edt_email.getText().toString();
        String password = edt_password.getText().toString();

        if (email.isEmpty() || password.isEmpty()) {
            tv_errormsg.setText(R.string.error_email_and_password_cannot_empty);
            return;
        }

        btn_login.setText(R.string.action_signing_in);
        btn_login.setEnabled(false);

        doLogin(email, password);
    }

    @Click
    void btn_qqloginClicked() {
        if (!mTencent.isSessionValid()) {
            mTencent.login(this, "get_user_info", new IUiListener() {
                @Override
                public void onComplete(Object o) {
                    doQQLogin();
                }

                @Override
                public void onError(UiError uiError) {
                    Toast.makeText(getApplicationContext(), uiError.errorMessage, Toast.LENGTH_SHORT).show();
                }

                @Override
                public void onCancel() {

                }
            });
        }
    }

    void saveUserInfo(LoginResult result) {
        //登陆成功
        //保存用户信息
        ObjectMapper mapper = new ObjectMapper();
        try {
            String jsonUserInfo = mapper.writeValueAsString(result.Data);
            pref.currentUserInJsonFormat().put(jsonUserInfo);
            afterLogin(true, 0);
        } catch (JsonProcessingException e) {
            //序列化失败
            afterLogin(false, R.string.error_failed_to_save);
        }
    }

    void launchQQRegister() {
        //获取用户信息
        UserInfo info = new UserInfo(this, mTencent.getQQToken());
        info.getUserInfo(new IUiListener() {
            @Override
            public void onComplete(Object o) {
                hideProgressDialog();

                JSONObject jso = (JSONObject) o;

                try {
                    String openId = mTencent.getOpenId();
                    String accessToken = mTencent.getAccessToken();
                    String nickname = jso.getString("nickname");
                    String avatarUrl = jso.getString("figureurl_qq_2");
                    String sex = jso.getString("gender");

                    Intent intent = new Intent(getApplicationContext(), QQRegisterActivity_.class);
                    intent.putExtra("openid", openId);
                    intent.putExtra("accesstoken", accessToken);
                    intent.putExtra("nickname", nickname);
                    intent.putExtra("avatarurl", avatarUrl);
                    intent.putExtra("sex", sex.equals("男"));
                    startActivityForResult(intent, REQUEST_CODE_QQREGISTER);

                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

            @Override
            public void onError(UiError uiError) {
                hideProgressDialog();
            }

            @Override
            public void onCancel() {
                hideProgressDialog();
            }
        });
    }

    @Background
    void doQQLogin() {
        Util.checkCsrfToken(pref, restClient);

        LoginResult result = restClient.QQLogin(mTencent.getOpenId());
        if (result == null) {
            afterLogin(false, R.string.error_qqlogin_failed);
            return;
        }

        //不能用openId找到对应用户，代表着用户是第一次用QQ账号登陆，开始注册过程
        if (!result.Result) {
            showProgressDialog();
            launchQQRegister();
            return;
        }

        saveUserInfo(result);
    }

    @Background
    void doLogin(String email, String password) {
        Util.checkCsrfToken(pref, restClient);

        LoginResult result = restClient.Login(email, password);
        if (result == null || !result.Result) {
            afterLogin(false, R.string.error_invalid_email_or_password);
            return;
        }

        saveUserInfo(result);
    }

    @UiThread
    void afterLogin(boolean isSucceeded, int resId) {
        if (isSucceeded) {
            finish();
        } else {
            btn_login.setText(R.string.action_sign_in);
            btn_login.setEnabled(true);

            tv_errormsg.setText(resId);
        }
    }

    @UiThread
    void showProgressDialog() {
        mProgressDialog = ProgressDialog.show(this, "", "正在获取QQ账号信息", true, false);
    }

    @UiThread
    void hideProgressDialog() {
        if (mProgressDialog != null) {
            mProgressDialog.dismiss();
            mProgressDialog = null;
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == REQUEST_CODE_QQREGISTER) {
            finish();
        }
    }
}
