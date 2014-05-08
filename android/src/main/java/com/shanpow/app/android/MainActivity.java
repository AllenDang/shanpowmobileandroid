package com.shanpow.app.android;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.KeyEvent;
import android.webkit.CookieSyncManager;
import android.widget.Toast;

import com.umeng.analytics.MobclickAgent;

import org.androidannotations.annotations.EActivity;
import org.androidannotations.annotations.ViewById;
import org.apache.cordova.Config;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;

import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@EActivity
public class MainActivity extends SlidingMenuBaseActivity implements CordovaInterface {

    @ViewById
    CordovaWebView webView;

    private boolean isReadyToExit = false;

    private Timer exitTimer = new Timer("exit_timer");

    private final ExecutorService threadPool = Executors.newCachedThreadPool();

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Config.init(this);
        webView.loadUrl(Config.getStartUrl());

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

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            goBack();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }

    public void goBack() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            //提示再按一次后退就退出
            if (isReadyToExit) {
                webView.stopLoading();
                finish();
            } else {
                Toast.makeText(this, R.string.toast_prompt_quit, Toast.LENGTH_SHORT).show();
                //先把isReadyExit设为true, 两秒之后如果没有再次按下后退，则设为false
                isReadyToExit = true;
                exitTimer.schedule(new TimerTask() {
                    @Override
                    public void run() {
                        isReadyToExit = false;
                    }
                }, 2000);
            }
        }
    }

    public void gotoUrl(String url) {
        webView.loadUrl(url);
    }

    @Override
    public void startActivityForResult(CordovaPlugin cordovaPlugin, Intent intent, int i) {

    }

    @Override
    public void setActivityResultCallback(CordovaPlugin cordovaPlugin) {

    }

    @Override
    public Activity getActivity() {
        return this;
    }

    @Override
    public Object onMessage(String s, Object o) {
        return this;
    }

    @Override
    public ExecutorService getThreadPool() {
        return threadPool;
    }
}
