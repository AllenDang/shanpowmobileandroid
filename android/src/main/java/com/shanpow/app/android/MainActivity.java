package com.shanpow.app.android;

import android.os.Bundle;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.MenuItem;
import android.webkit.CookieSyncManager;
import android.webkit.WebBackForwardList;
import android.webkit.WebView;

import com.handmark.pulltorefresh.library.PullToRefreshWebView;
import com.shanpow.app.actionbarmodifier.BillboardListActionBarHandler;
import com.shanpow.app.actionbarmodifier.IActionBarHandler;
import com.shanpow.app.actionbarmodifier.MainActionBarHandler;
import com.shanpow.app.util.Constant;
import com.shanpow.app.util.ShanpowWebClient;

import org.androidannotations.annotations.EActivity;
import org.androidannotations.annotations.ViewById;

@EActivity
public class MainActivity extends SlidingMenuBaseActivity {

    @ViewById
    PullToRefreshWebView pull_refresh_webview;

    private IActionBarHandler actionBarHandler;

    private String baseUrl = Constant.URL_MAIN;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        actionBarHandler = new MainActionBarHandler(this, pref);

        //读取网页内容
        WebView webView = pull_refresh_webview.getRefreshableView();
        webView.setWebViewClient(new ShanpowWebClient(this));
        webView.getSettings().setJavaScriptEnabled(true);

        //根据用户上次选择的频道获取首页内容
        switch (pref.channel().get()) {
            case 1: //男频
                reloadWebviewWithArgs(Constant.URL_PARAM_CHANNEL_MALE);
                break;
            case 0: //女频
                reloadWebviewWithArgs(Constant.URL_PARAM_CHANNEL_FEMALE);
                break;
        }
    }

    //这个方法主要给ChannelActionProvider调用
    public void reloadWebviewWithArgs(String args) {
        WebView webView = pull_refresh_webview.getRefreshableView();
        webView.loadUrl(baseUrl + "?" + args);
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
        if (actionBarHandler != null) {
            actionBarHandler.setup(menu);
        }
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        boolean handled = super.onOptionsItemSelected(item);
        if (handled) {
            return true;
        }

        if (actionBarHandler != null) {
            return actionBarHandler.onOptionsItemSelected(item);
        }

        return false;
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
        WebView webView = pull_refresh_webview.getRefreshableView();
        if (webView.canGoBack()) {
            webView.goBack();

            WebBackForwardList list = webView.copyBackForwardList();
            if (list.getCurrentIndex() > 0) {
                String previousUrl = list.getItemAtIndex(list.getCurrentIndex() - 1).getUrl();
                adapteActionBarByUrl(previousUrl);
            }
        }
    }

    public void adapteActionBarByUrl(String url) {
        WebView webView = pull_refresh_webview.getRefreshableView();

        if (url.startsWith(Constant.URL_BILLBOARD_LIST)) {
            baseUrl = Constant.URL_BILLBOARD_LIST;
            actionBarHandler = new BillboardListActionBarHandler(this, pref);
            invalidateOptionsMenu();
            return;
        }

        if (url.startsWith(Constant.URL_MAIN)) {
            baseUrl = Constant.URL_MAIN;
            actionBarHandler = new MainActionBarHandler(this, pref);
            invalidateOptionsMenu();
        }
    }
}
