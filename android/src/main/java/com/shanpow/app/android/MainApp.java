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
        try {
            CookieManager.setAcceptFileSchemeCookies(true);
        } catch (Throwable e) {
            //如果在老版本的Android机器上运行因为没有上述方法会报错。
        }
        super.onCreate();

        MainApp.conext = this.getApplicationContext();

        CookieSyncManager.createInstance(this);
        CookieManager.getInstance().setAcceptCookie(true);

        WebkitCookieManagerProxy coreCookieManager = new WebkitCookieManagerProxy(null, CookiePolicy.ACCEPT_ALL);
        CookieHandler.setDefault(coreCookieManager);
    }

    public static Context getAppContext() {
        return MainApp.conext;
    }
}
