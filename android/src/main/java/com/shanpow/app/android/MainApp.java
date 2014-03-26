package com.shanpow.app.android;

import android.app.Application;
import android.content.Context;

/**
 * Created by allendang on 14-3-26.
 */
public class MainApp extends Application {
    private static Context conext;

    @Override
    public void onCreate() {
        super.onCreate();
        MainApp.conext = this.getApplicationContext();
    }

    public static Context getAppContext() {
        return MainApp.conext;
    }
}
