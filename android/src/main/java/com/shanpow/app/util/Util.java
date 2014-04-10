package com.shanpow.app.util;

import android.content.Context;
import android.content.SharedPreferences;
import android.webkit.CookieManager;
import android.webkit.CookieSyncManager;

import java.util.Set;

/**
 * Created by allendang on 14-4-1.
 */
public final class Util {
    public static void SyncCookie(Context context) {
        SharedPreferences sharedPref = context.getSharedPreferences(Constant.APP_PREF, Context.MODE_PRIVATE);
        Set<String> cookies = sharedPref.getStringSet(Constant.PREF_COOKIES, null);
        if (cookies != null) {
            String cookieString = "";

            for (String c : cookies) {
                cookieString += c;
            }

            //同步到CookieSyncManager中供webview使用
            if (CookieSyncManager.createInstance(context) != null) {
                CookieManager cookieManager = CookieManager.getInstance();
                cookieManager.setCookie(Constant.URL_ROOTDOMAIN, cookieString);
                CookieSyncManager.getInstance().sync();
            }
        }
    }
}
