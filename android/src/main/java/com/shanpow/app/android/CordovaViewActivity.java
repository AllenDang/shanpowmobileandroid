package com.shanpow.app.android;

import android.content.Intent;
import android.os.Bundle;

import com.shanpow.app.util.Constant;

import org.apache.cordova.CordovaActivity;


public class CordovaViewActivity extends CordovaActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.init();

        Intent intent = getIntent();
        String url = intent.getStringExtra(Constant.EXTRA_URL);

        super.loadUrl(url);
    }
}
