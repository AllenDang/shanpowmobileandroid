package com.shanpow.app.actionbarmodifier;

import android.support.v7.app.ActionBar;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.PopupMenu;

import com.shanpow.app.android.MainActivity;
import com.shanpow.app.android.R;
import com.shanpow.app.util.AppPref_;
import com.shanpow.app.util.Constant;

/**
 * Created by allendang on 14-4-29.
 */
public class MainActionBarHandler extends ActionBarHandlerBase implements IActionBarHandler {

    private PopupMenu channelMenu;

    private ImageView img_channel;

    private ImageView img_slidingmenu;

    public MainActionBarHandler(MainActivity mActivity, AppPref_ pref) {
        super(mActivity, pref);
    }

    @Override
    public void setup(Menu menu) {
        MenuInflater menuInflater = mActivity.getMenuInflater();
        menuInflater.inflate(R.menu.main, menu);

        ActionBar actionBar = mActivity.getSupportActionBar();
        actionBar.setDisplayUseLogoEnabled(false);
        actionBar.setDisplayHomeAsUpEnabled(false);
        actionBar.setDisplayShowHomeEnabled(false);
        actionBar.setDisplayShowCustomEnabled(true);
        actionBar.setCustomView(R.layout.actionbar_main);

        img_channel = (ImageView) actionBar.getCustomView().findViewById(R.id.img_channel);
        //根据用户之前的选择显示男女频道的图标
        switch (mPref.channel().get()) {
            case 1: //男频
                img_channel.setImageResource(R.drawable.ic_action_dropdown_crown_male);
                break;
            case 0: //女频
                img_channel.setImageResource(R.drawable.ic_action_dropdown_crown_female);
                break;
        }

        channelMenu = new PopupMenu(mActivity, img_channel);
        channelMenu.getMenuInflater().inflate(R.menu.channel_popup_menu, channelMenu.getMenu());
        channelMenu.setOnMenuItemClickListener(new PopupMenu.OnMenuItemClickListener() {
            @Override
            public boolean onMenuItemClick(MenuItem item) {
                switch (item.getItemId()) {
                    case R.id.popup_menu_male:
                        img_channel.setImageResource(R.drawable.ic_action_dropdown_crown_male);
                        mPref.channel().put(Constant.CHANNEL_MALE);
                        mActivity.reloadWebviewWithArgs(Constant.URL_PARAM_CHANNEL_MALE);
                        break;
                    case R.id.popup_menu_female:
                        img_channel.setImageResource(R.drawable.ic_action_dropdown_crown_female);
                        mPref.channel().put(Constant.CHANNEL_FEMALE);
                        mActivity.reloadWebviewWithArgs(Constant.URL_PARAM_CHANNEL_FEMALE);
                        break;
                }
                return true;
            }
        });

        if (img_channel != null) {
            img_channel.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    channelMenu.show();
                }
            });
        }

        img_slidingmenu = (ImageView) actionBar.getCustomView().findViewById(R.id.img_slidingmenu);
        if (img_slidingmenu != null) {
            img_slidingmenu.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    mActivity.toggle();
                }
            });
        }
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int itemId_ = item.getItemId();

        if (itemId_ == R.id.action_search) {

            return true;
        }

        return false;
    }
}
