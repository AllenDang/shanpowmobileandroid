package com.shanpow.app.util;

import android.app.ProgressDialog;
import android.content.Context;
import android.graphics.Bitmap;
import android.net.Uri;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.shanpow.app.android.LoginActivity_;
import com.shanpow.app.android.MainActivity_;

/**
 * Created by allendang on 14-4-3.
 */
public final class ShanpowWebClient extends WebViewClient {

    private Context mContext;

    private ProgressDialog mDialog;

    public ShanpowWebClient(Context context) {
        this.mContext = context;
        this.mDialog = new ProgressDialog(context);
        this.mDialog.setProgressStyle(ProgressDialog.STYLE_SPINNER);
    }

    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        String host = Uri.parse(url).getHost();
        if (host != null) {
            //如果是www.shanpow.com的url，就在webview中打开，否则，使用系统默认浏览器打开
            if (host.equals(Constant.URL_DOMAIN)) {
                if (mContext instanceof MainActivity_) {
                    MainActivity_ m = (MainActivity_) mContext;
                    m.adapteActionBarByUrl(url);
                }
                return false;
            }
        }

        //判断是否是特定的动作
        if (url.equals(Constant.URL_ACTION_SHOWLOGIN)) {
            LoginActivity_.intent(mContext).start();
        }

        return true;
    }

    @Override
    public void onPageStarted(WebView view, String url, Bitmap favicon) {
        super.onPageStarted(view, url, favicon);
        mDialog.show();
    }

    @Override
    public void onPageFinished(WebView view, String url) {
        super.onPageFinished(view, url);
        mDialog.hide();
    }

}
