package com.shanpow.app.util;

import android.content.Context;
import android.net.Uri;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.shanpow.app.android.LoginActivity_;

/**
 * Created by allendang on 14-4-3.
 */
public final class ShanpowWebClient extends WebViewClient {

    private Context mContext;

    public ShanpowWebClient(Context context) {
        this.mContext = context;
    }

    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        //如果是www.shanpow.com的url，就在webview中打开，否则，使用系统默认浏览器打开
        if (Uri.parse(url).getHost().equals(Constant.URL_ROOT)) {
            return false;
        }

        //判断是否是特定的动作
        if (url.equals(Constant.URL_ACTION_SHOWLOGIN)) {
            LoginActivity_.intent(mContext).start();
        }

        return true;
    }
}
