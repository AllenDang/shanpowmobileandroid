package com.shanpow.app.android;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.webkit.WebView;
import android.widget.Toast;

import com.handmark.pulltorefresh.library.PullToRefreshWebView;
import com.shanpow.app.entity.GetCsrfTokenResult;
import com.shanpow.app.util.Constant;
import com.shanpow.app.util.ShanpowWebClient;
import com.shanpow.app.util.Util;

import org.androidannotations.annotations.AfterViews;
import org.androidannotations.annotations.Background;
import org.androidannotations.annotations.EActivity;
import org.androidannotations.annotations.OptionsItem;
import org.androidannotations.annotations.OptionsMenu;
import org.androidannotations.annotations.ViewById;

import java.util.Set;

@EActivity
@OptionsMenu(R.menu.main)
public class MainActivity extends SlidingMenuBaseActivity {

    @ViewById
    PullToRefreshWebView pull_refresh_webview;

    @AfterViews
    void init() {
        checkCookieAndCsrfToken();
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //读取网页内容
        WebView webView = pull_refresh_webview.getRefreshableView();
        webView.setWebViewClient(new ShanpowWebClient(this));
        webView.getSettings().setJavaScriptEnabled(true);
        webView.loadUrl(Constant.URL_MAIN);
    }

    @OptionsItem(R.id.action_settings)
    void settingsClicked() {
        Toast.makeText(this, "Settings", Toast.LENGTH_SHORT).show();
    }

    @Background
    void checkCookieAndCsrfToken() {
        //检查Cookie和CsrfToken是否存在，如果没有则通过发起获取Token的请求
        SharedPreferences sharedPref = pref.getSharedPreferences();
        Set<String> cookies = sharedPref.getStringSet(Constant.PREF_COOKIES, null);
        if (cookies == null && !pref.csrfToken().exists()) {
            //TODO:需要处理异常
            GetCsrfTokenResult result = restClient.GetCsrfToken();
            if (result.Result) {
                pref.csrfToken().put(result.Data);
            }
        }

        restClient.setCookie(Constant.CSRF_TOKEN, pref.csrfToken().get());
        Util.SyncCookie(this);
    }

}
