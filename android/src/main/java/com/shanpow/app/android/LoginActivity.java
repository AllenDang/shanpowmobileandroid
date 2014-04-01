package com.shanpow.app.android;

import android.app.Activity;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shanpow.app.entity.LoginResult;
import com.shanpow.app.service.ShanpowRestClient;
import com.shanpow.app.util.AppPref_;
import com.shanpow.app.util.Constant;
import com.shanpow.app.util.Util;

import org.androidannotations.annotations.AfterViews;
import org.androidannotations.annotations.Background;
import org.androidannotations.annotations.Click;
import org.androidannotations.annotations.EActivity;
import org.androidannotations.annotations.UiThread;
import org.androidannotations.annotations.ViewById;
import org.androidannotations.annotations.rest.RestService;
import org.androidannotations.annotations.sharedpreferences.Pref;

/**
 * Created by allendang on 14-3-26.
 */
@EActivity(R.layout.activity_login)
public class LoginActivity extends Activity {

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

    @Pref
    AppPref_ pref;

    @AfterViews
    void init() {
        restClient.setCookie(Constant.CSRF_TOKEN, pref.csrfToken().get());
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

    @Background
    void doLogin(String email, String password) {
        LoginResult result = restClient.Login(email, password);
        if (!result.Result) {
            afterLogin(false, R.string.error_invalid_email_or_password);
            return;
        }

        //登陆成功
        //保存用户信息
        ObjectMapper mapper = new ObjectMapper();
        try {
            String jsonUserInfo = mapper.writeValueAsString(result.Data);
            pref.currentUserInJsonFormat().put(jsonUserInfo);
            Util.SyncCookie(this);
            afterLogin(true, 0);
        } catch (JsonProcessingException e) {
            //序列化失败
            afterLogin(false, R.string.error_failed_to_save);
        }
    }

    @UiThread
    void afterLogin(boolean isSucceeded, int resId) {
        if (isSucceeded) {
            MainActivity_.intent(this).start();
        } else {
            btn_login.setText(R.string.action_sign_in);
            btn_login.setEnabled(true);

            tv_errormsg.setText(resId);
        }
    }
}
