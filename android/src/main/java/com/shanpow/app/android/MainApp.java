package com.shanpow.app.android;

import android.app.Application;
import android.content.Context;
import android.webkit.CookieManager;
import android.webkit.CookieSyncManager;

import com.shanpow.app.util.WebkitCookieManagerProxy;

import java.net.CookieHandler;
import java.net.CookiePolicy;

/**
 * Created by allendang on 14-3-26.
 */
public class MainApp extends Application {
    private static Context conext;

    @Override
    public void onCreate() {
        super.onCreate();

        MainApp.conext = this.getApplicationContext();

        CookieSyncManager.createInstance(this);
        CookieManager.getInstance().setAcceptCookie(true);
        CookieManager.setAcceptFileSchemeCookies(true);

        WebkitCookieManagerProxy coreCookieManager = new WebkitCookieManagerProxy(null, CookiePolicy.ACCEPT_ALL);
        CookieHandler.setDefault(coreCookieManager);
    }

    public static Context getAppContext() {
        return MainApp.conext;
    }
}
