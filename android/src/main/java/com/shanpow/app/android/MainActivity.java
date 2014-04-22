package com.shanpow.app.android;

import android.os.Bundle;
import android.support.v7.app.ActionBar;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.MenuItem;
import android.webkit.CookieSyncManager;
import android.webkit.WebView;
import android.widget.Toast;

import com.handmark.pulltorefresh.library.PullToRefreshWebView;
import com.shanpow.app.util.Constant;
import com.shanpow.app.util.ShanpowWebClient;

import org.androidannotations.annotations.EActivity;
import org.androidannotations.annotations.OptionsItem;
import org.androidannotations.annotations.OptionsMenu;
import org.androidannotations.annotations.OptionsMenuItem;
import org.androidannotations.annotations.ViewById;

@EActivity
@OptionsMenu(R.menu.main)
public class MainActivity extends SlidingMenuBaseActivity {

    @ViewById
    PullToRefreshWebView pull_refresh_webview;

    @OptionsMenuItem
    MenuItem action_channel;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ActionBar actionBar = getSupportActionBar();
        actionBar.setDisplayHomeAsUpEnabled(true);
        actionBar.setDisplayShowCustomEnabled(true);
        actionBar.setCustomView(R.layout.actionbar_main);

        //读取网页内容
        WebView webView = pull_refresh_webview.getRefreshableView();
        webView.setWebViewClient(new ShanpowWebClient(this));
        webView.getSettings().setJavaScriptEnabled(true);

        //根据用户上次选择的频道获取首页内容
        switch (pref.channel().get()) {
            case 1: //男频
                ReloadWebviewWithArgs(Constant.URL_PARAM_CHANNEL_MALE);
                break;
            case 0: //女频
                ReloadWebviewWithArgs(Constant.URL_PARAM_CHANNEL_FEMALE);
                break;
        }
    }

    //这个方法主要给ChannelActionProvider调用
    public void ReloadWebviewWithArgs(String args) {
        WebView webView = pull_refresh_webview.getRefreshableView();
        webView.loadUrl(Constant.URL_MAIN + "?" + args);
    }

    @Override
    protected void onPause() {
        super.onPause();
        CookieSyncManager.getInstance().sync();
    }

    @Override
    protected void onResume() {
        super.onResume();
        CookieSyncManager.getInstance().stopSync();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        //根据用户之前的选择显示男女频道的图标
        switch (pref.channel().get()) {
            case 1: //男频
                action_channel.setIcon(R.drawable.ic_action_dropdown_crown_male);
                break;
            case 0: //女频
                action_channel.setIcon(R.drawable.ic_action_dropdown_crown_female);
                break;
        }
        return super.onCreateOptionsMenu(menu);
    }

    @OptionsItem(R.id.action_search)
    void settingsClicked() {
        Toast.makeText(this, "Search", Toast.LENGTH_SHORT).show();
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        WebView webView = pull_refresh_webview.getRefreshableView();
        if ((keyCode == KeyEvent.KEYCODE_BACK) && webView.canGoBack()) {
            webView.goBack();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }
}
