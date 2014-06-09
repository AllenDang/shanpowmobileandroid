package com.shanpow.app.android;

import android.os.Bundle;
import android.webkit.CookieSyncManager;

import com.shanpow.app.entity.IntResult;
import com.shanpow.app.util.Constant;
import com.shanpow.app.util.MemoryCache;
import com.shanpow.app.util.Util;
import com.umeng.analytics.MobclickAgent;
import com.umeng.update.UmengUpdateAgent;

import org.androidannotations.annotations.AfterViews;
import org.androidannotations.annotations.EActivity;
import org.apache.cordova.Config;
import org.json.JSONObject;

import java.util.Timer;
import java.util.TimerTask;

@EActivity
public class MainActivity extends SlidingMenuBaseActivity {

    private Timer mTimer;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.init();
        super.loadUrl(Config.getStartUrl());

        MobclickAgent.updateOnlineConfig(this);
        UmengUpdateAgent.update(this);
    }

    @AfterViews
    void afterViews() {
        //设置UnReadNotificationCount为0
        try {
            JSONObject obj = new JSONObject();
            obj.put(Constant.MK_UNREADCOUNT, 0);
            MemoryCache.getInstance().set(Constant.MK_UNREADCOUNT, obj);
        } catch (Exception e) {
            //Nothing to do.
        }

        //每30秒获取一次是否有新的通知消息
        TimerTask task = new TimerTask() {
            @Override
            public void run() {
                if (pref.currentUserInJsonFormat().exists() && Util.isNetworkAvailable()) {
                    try {
                        IntResult result = restClient.GetUnreadNotificationCount();
                        if (result != null && result.Result) {
                            JSONObject obj = new JSONObject();
                            obj.put(Constant.MK_UNREADCOUNT, result.Data);
                            MemoryCache.getInstance().set(Constant.MK_UNREADCOUNT, obj);
                        }
                    } catch (Exception e) {
                        //Nothing to do.
                    }
                }
            }
        };

        mTimer = new Timer();
        mTimer.schedule(task, 30000);
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
    public void onDestroy() {
        super.onDestroy();
        mTimer.cancel();
    }

    public void gotoUrl(String url) {
        super.loadUrl(url);
    }

    public void reload() {
        appView.reload();
    }

}
