package com.shanpow.app.android;

import android.os.Bundle;
import android.support.v7.app.ActionBar;
import android.view.KeyEvent;
import android.webkit.WebView;
import android.widget.Toast;

import com.handmark.pulltorefresh.library.PullToRefreshWebView;
import com.shanpow.app.util.Constant;
import com.shanpow.app.util.ShanpowWebClient;

import org.androidannotations.annotations.EActivity;
import org.androidannotations.annotations.OptionsItem;
import org.androidannotations.annotations.OptionsMenu;
import org.androidannotations.annotations.ViewById;

@EActivity
@OptionsMenu(R.menu.main)
public class MainActivity extends SlidingMenuBaseActivity {

    @ViewById
    PullToRefreshWebView pull_refresh_webview;

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
        webView.loadUrl(Constant.URL_MAIN);
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
