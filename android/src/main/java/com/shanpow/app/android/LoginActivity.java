package com.shanpow.app.android;

import android.app.Activity;
import android.content.SharedPreferences;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shanpow.app.entity.GetCsrfTokenResult;
import com.shanpow.app.entity.LoginResult;
import com.shanpow.app.service.ShanpowErrorHandler;
import com.shanpow.app.service.ShanpowRestClient;
import com.shanpow.app.util.AppPref_;
import com.shanpow.app.util.Constant;

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

import java.util.Set;

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

    @Bean
    ShanpowErrorHandler errorHandler;

    @Pref
    AppPref_ pref;

    @AfterViews
    void init() {
        restClient.setCookie(Constant.CSRF_TOKEN, pref.csrfToken().get());
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

    @Background
    void doLogin(String email, String password) {
        //检查Cookie和CsrfToken是否存在，如果没有则通过发起获取Token的请求
        SharedPreferences sharedPref = pref.getSharedPreferences();
        Set<String> cookies = sharedPref.getStringSet(Constant.PREF_COOKIES, null);
        if (cookies == null || !pref.csrfToken().exists()) {
            //TODO:需要处理异常
            GetCsrfTokenResult result = restClient.GetCsrfToken();
            if (result.Result) {
                pref.csrfToken().put(result.Data);
            }
        }

        restClient.setCookie(Constant.CSRF_TOKEN, pref.csrfToken().get());

        LoginResult result = restClient.Login(email, password);
        if (result == null || !result.Result) {
            afterLogin(false, R.string.error_invalid_email_or_password);
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
