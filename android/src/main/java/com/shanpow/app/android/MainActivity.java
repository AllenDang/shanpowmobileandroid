package com.shanpow.app.android;

import android.content.Context;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.webkit.CookieSyncManager;
import android.webkit.WebBackForwardList;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Toast;

import com.handmark.pulltorefresh.library.PullToRefreshWebView;
import com.shanpow.app.actionbarmodifier.BillboardListActionBarHandler;
import com.shanpow.app.actionbarmodifier.GeneralActionBarHandler;
import com.shanpow.app.actionbarmodifier.IActionBarHandler;
import com.shanpow.app.actionbarmodifier.MainActionBarHandler;
import com.shanpow.app.actionbarmodifier.WriteReviewActionBarHandler;
import com.shanpow.app.util.Constant;
import com.shanpow.app.util.ShanpowWebClient;
import com.umeng.analytics.MobclickAgent;

import org.androidannotations.annotations.EActivity;
import org.androidannotations.annotations.ViewById;

import java.util.Timer;
import java.util.TimerTask;

@EActivity
public class MainActivity extends SlidingMenuBaseActivity {

    @ViewById
    PullToRefreshWebView pull_refresh_webview;

    private IActionBarHandler actionBarHandler;

    private String baseUrl = Constant.URL_MAIN;

    private boolean isReadyToExit = false;

    private Timer exitTimer = new Timer("exit_timer");

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        actionBarHandler = new MainActionBarHandler(this, pref);

        //读取网页内容
        WebView webView = pull_refresh_webview.getRefreshableView();
        webView.setWebViewClient(new ShanpowWebClient(this));
        webView.getSettings().setJavaScriptEnabled(true);
        webView.requestFocus(View.FOCUS_DOWN);

        //启动webView缓存
        WebSettings websetting = webView.getSettings();
        websetting.setDomStorageEnabled(true);
        String appCacheDir = getApplicationContext().getDir("cache", Context.MODE_PRIVATE).getPath();
        websetting.setAppCachePath(appCacheDir);
        websetting.setAllowFileAccess(true);
        websetting.setAppCacheEnabled(true);
        websetting.setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);

        //根据用户上次选择的频道获取首页内容
        switch (pref.channel().get()) {
            case 1: //男频
                reloadWebviewWithArgs(Constant.URL_PARAM_CHANNEL_MALE);
                break;
            case 0: //女频
                reloadWebviewWithArgs(Constant.URL_PARAM_CHANNEL_FEMALE);
                break;
        }

        MobclickAgent.updateOnlineConfig(this);
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
        MobclickAgent.onPause(this);
    }

    @Override
    protected void onResume() {
        super.onResume();
        CookieSyncManager.getInstance().stopSync();
        MobclickAgent.onResume(this);
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
            WebBackForwardList list = webView.copyBackForwardList();
            if (list.getCurrentIndex() > 0) {
                String previousUrl = list.getItemAtIndex(list.getCurrentIndex() - 1).getUrl();
                adapteActionBarByUrl(previousUrl);
            }

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
        WebView webView = pull_refresh_webview.getRefreshableView();
        webView.loadUrl(url);
        adapteActionBarByUrl(url);
    }

    public String getCurrentUrl() {
        WebView webView = pull_refresh_webview.getRefreshableView();
        return webView.getUrl();
    }

    private void adapteGeneralActionBar(int titleResId) {
        actionBarHandler = new GeneralActionBarHandler(this, pref, titleResId);
        invalidateOptionsMenu();
    }

    public void adapteActionBarByUrl(String url) {
        if (url.equals(Constant.URL_SEARCH)) {
            adapteGeneralActionBar(R.string.title_activity_search);
            return;
        }

        if (url.equals(Constant.URL_ONE_KEY_HEAL)) {
            adapteGeneralActionBar(R.string.title_activity_onekeyheal);
            return;
        }

        if (url.equals(Constant.URL_ARTICLE_LIST)) {
            adapteGeneralActionBar(R.string.title_activity_article_list);
            return;
        }

        if (url.startsWith(Constant.URL_ARTICLE_LIST)) {
            adapteGeneralActionBar(R.string.title_activity_article);
            return;
        }

        if (url.startsWith(Constant.URL_PEOPLE)) {
            adapteGeneralActionBar(R.string.title_activity_people);
            return;
        }

        if (url.startsWith(Constant.URL_BILLBOARD_DETAIL)) {
            adapteGeneralActionBar(R.string.title_activity_billboard_detail);
            return;
        }

        if (url.startsWith(Constant.URL_BOOK_DETAIL)) {
            adapteGeneralActionBar(R.string.title_activity_bookdetail);
            return;
        }

        if (url.startsWith(Constant.URL_COMMENT) || url.startsWith(Constant.URL_REVIEW)) {
            adapteGeneralActionBar(R.string.title_activity_comment);
            return;
        }

        if (url.startsWith(Constant.URL_BOOKLIST)) {
            adapteGeneralActionBar(R.string.title_activity_booklist);
            return;
        }

        if (url.startsWith(Constant.URL_WRITE_COMMENT) || url.startsWith(Constant.URL_WRITE_REVIEW)) {
            actionBarHandler = new WriteReviewActionBarHandler(this, pref);
            invalidateOptionsMenu();
            return;
        }

        if (url.equals(Constant.URL_BILLBOARD_LIST)) {
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
