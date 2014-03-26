package com.shanpow.app.android;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.actionbarsherlock.app.SherlockActivity;
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
import org.androidannotations.annotations.OptionsItem;
import org.androidannotations.annotations.OptionsMenu;
import org.androidannotations.annotations.rest.RestService;
import org.androidannotations.annotations.sharedpreferences.Pref;

import java.util.Set;

@EActivity
@OptionsMenu(R.menu.main)
public class MainActivity extends SherlockActivity {

    @RestService
    ShanpowRestClient restClient;

    @Bean
    ShanpowErrorHandler errorHandler;

    @Pref
    AppPref_ pref;

    @AfterInject
    void afterInject() {
        restClient.setRestErrorHandler(errorHandler);
    }

    @AfterViews
    void init() {
        checkCookieAndCsrfToken();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    @OptionsItem(R.id.action_settings)
    void settingsClicked() {
        Toast.makeText(this, "Settings", Toast.LENGTH_SHORT).show();
    }

    @Click
    void btn_main_newClicked() {
        doNetworkJob();
    }

    @Background
    void checkCookieAndCsrfToken() {
        //检查Cookie和CsrfToken是否存在，如果没有则通过发起获取Token的请求
        SharedPreferences sharedPref = pref.getSharedPreferences();
        Set<String> cookies = sharedPref.getStringSet(Constant.PREF_COOKIES, null);
        if (cookies == null && !pref.csrfToken().exists()) {
            //TODO:需要处理异常
            GetCsrfTokenResult result = restClient.GetCsrfToken();
            if (result.Result) {
                pref.csrfToken().put(result.Data);
            }
        }

        //设置csrfToken到restClient得Cookie中
        restClient.setCookie(Constant.CSRF_TOKEN, pref.csrfToken().get());
    }

    @Background
    void doNetworkJob() {
        LoginResult result = restClient.Login("AllenDang", "andrewd");
        if (result != null && result.Result) {
            Log.d("DEBUG", result.Data.Nickname);
        }
    }
}
