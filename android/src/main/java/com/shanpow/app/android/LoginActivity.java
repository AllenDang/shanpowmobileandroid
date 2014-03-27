package com.shanpow.app.android;

import android.app.Activity;
import android.os.Bundle;

import org.androidannotations.annotations.Click;
import org.androidannotations.annotations.EActivity;

/**
 * Created by allendang on 14-3-26.
 */
@EActivity
public class LoginActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
    }

    @Click
    void btn_loginClicked() {

    }
}
