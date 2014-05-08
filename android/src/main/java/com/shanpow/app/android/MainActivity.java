package com.shanpow.app.android;

import android.os.Bundle;
import android.webkit.CookieSyncManager;

import com.umeng.analytics.MobclickAgent;

import org.androidannotations.annotations.EActivity;
import org.apache.cordova.Config;

@EActivity
public class MainActivity extends SlidingMenuBaseActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.init();

        super.loadUrl(Config.getStartUrl());

        MobclickAgent.updateOnlineConfig(this);
    }

    @Override
    protected void onPause() {
        super.onPause();
        CookieSyncManager.getInstance().sync();
        MobclickAgent.onPause(this);
    }

    @Override
    protected void onResume() {
        super.onResume();
        CookieSyncManager.getInstance().stopSync();
        MobclickAgent.onResume(this);
    }

    public void gotoUrl(String url) {
        super.loadUrl(url);
    }

    public void reload() {
        appView.reload();
    }

}
