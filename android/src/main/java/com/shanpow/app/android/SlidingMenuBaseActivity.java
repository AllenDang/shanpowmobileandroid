package com.shanpow.app.android;

import android.content.Intent;
import android.os.Bundle;

import com.jeremyfeinstein.slidingmenu.lib.SlidingMenu;
import com.jeremyfeinstein.slidingmenu.lib.app.SlidingActivity;

import org.androidannotations.annotations.Click;
import org.androidannotations.annotations.EActivity;

@EActivity
public class SlidingMenuBaseActivity extends SlidingActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setBehindContentView(R.layout.activity_sliding_menu_base);

        SlidingMenu menu = getSlidingMenu();
        menu.setMode(SlidingMenu.LEFT);
        menu.setTouchModeAbove(SlidingMenu.TOUCHMODE_MARGIN);
        menu.setBehindOffsetRes(R.dimen.slidingmenu_offset);
    }

    @Click
    void btn_sm_loginClicked() {
        Intent loginIntent = new Intent(this, LoginActivity_.class);
        startActivity(loginIntent);
    }
}
