package com.shanpow.app.util;

import android.content.Context;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;

import com.shanpow.app.android.MainApp;
import com.shanpow.app.entity.GetCsrfTokenResult;
import com.shanpow.app.service.ShanpowRestClient;

import java.util.Set;

/**
 * Created by allendang on 14-4-1.
 */
public final class Util {
    public static void checkCsrfToken(AppPref_ pref, ShanpowRestClient restClient) {
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
    }

    public static boolean isNetworkAvailable() {
        ConnectivityManager connectivityManager =
                (ConnectivityManager) MainApp.getAppContext().getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
        return activeNetworkInfo != null && activeNetworkInfo.isConnected();
    }
}
