package com.shanpow.app.android;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;

import com.jeremyfeinstein.slidingmenu.lib.SlidingMenu;
import com.jeremyfeinstein.slidingmenu.lib.app.SlidingActivity;

import org.androidannotations.annotations.Click;
import org.androidannotations.annotations.EActivity;
import org.androidannotations.annotations.ItemClick;

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

        String[] menuItems = {"首页", "榜单", "热辣书评", "设置"};
        ListView list = (ListView) findViewById(R.id.lv_menu);
        list.setAdapter(new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, menuItems));
    }

    @Click
    void btn_loginClicked() {
        Intent loginIntent = new Intent(this, LoginActivity_.class);
        startActivity(loginIntent);
    }

    @ItemClick
    void lv_menuItemClicked(String item) {
        Toast.makeText(this, item, Toast.LENGTH_SHORT).show();
    }
}
