package com.shanpow.app.android;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.TextView;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shanpow.app.entity.LoginResult;
import com.shanpow.app.service.ShanpowErrorHandler;
import com.shanpow.app.service.ShanpowRestClient;
import com.shanpow.app.util.AppPref_;
import com.shanpow.app.util.Constant;
import com.shanpow.app.util.Util;

import org.androidannotations.annotations.AfterViews;
import org.androidannotations.annotations.Background;
import org.androidannotations.annotations.Bean;
import org.androidannotations.annotations.Click;
import org.androidannotations.annotations.EActivity;
import org.androidannotations.annotations.UiThread;
import org.androidannotations.annotations.ViewById;
import org.androidannotations.annotations.rest.RestService;
import org.androidannotations.annotations.sharedpreferences.Pref;

@EActivity(R.layout.activity_qqregister)
public class QQRegisterActivity extends Activity {

    @ViewById
    EditText et_nickname;

    @ViewById
    EditText et_email;

    @ViewById
    RadioButton rb_male;

    @ViewById
    RadioButton rb_female;

    @ViewById
    TextView tv_errormsg;

    @ViewById
    Button btn_submit;

    @RestService
    ShanpowRestClient restClient;

    @Bean
    ShanpowErrorHandler errorHandler;

    @Pref
    AppPref_ pref;

    String openId, accessToken, nickname, avatarUrl;
    boolean sex;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Intent intent = getIntent();
        openId = intent.getStringExtra("openid");
        accessToken = intent.getStringExtra("accesstoken");
        nickname = intent.getStringExtra("nickname");
        avatarUrl = intent.getStringExtra("avatarurl");
        sex = intent.getBooleanExtra("sex", true);
    }

    @AfterViews
    void init() {
        et_nickname.setText(nickname);
        rb_male.setChecked(sex);

        restClient.setCookie(Constant.CSRF_TOKEN, pref.csrfToken().get());
    }

    @Click
    void btn_submitClicked() {
        btn_submit.setEnabled(false);
        doRegister();
    }

    @Background
    void doRegister() {
        Util.checkCsrfToken(pref, restClient);

        String email = et_email.getText().toString();
        nickname = et_nickname.getText().toString();
        LoginResult result = restClient.QQRegister(nickname, email, openId, accessToken, avatarUrl, sex);
        if (result == null) {
            afterLogin(false, R.string.err_network_failed);
            return;
        }
        if (!result.Result) {
            showErrorMessage(result.ErrorMsg);
            return;
        }

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

    @UiThread
    void showErrorMessage(String msg) {
        btn_submit.setEnabled(true);
        tv_errormsg.setText(msg);
    }

    @UiThread
    void afterLogin(boolean isSucceeded, int resId) {
        if (isSucceeded) {
            finish();
        } else {
            btn_submit.setEnabled(true);
            tv_errormsg.setText(resId);
        }
    }

}
