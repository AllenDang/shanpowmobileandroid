package com.shanpow.app.widget;

import android.content.Context;
import android.content.ContextWrapper;
import android.content.SharedPreferences;
import android.support.v4.view.ActionProvider;
import android.view.Menu;
import android.view.MenuItem;
import android.view.SubMenu;
import android.view.View;

import com.shanpow.app.android.MainActivity_;
import com.shanpow.app.android.R;
import com.shanpow.app.util.Constant;

/**
 * Created by allendang on 14-4-3.
 */
public class ChannelActionProvider extends ActionProvider implements
        MenuItem.OnMenuItemClickListener {

    private ContextWrapper mContext;
    private MenuItem mMenu;

    public ChannelActionProvider(Context context) {
        super(context);
        mContext = (ContextWrapper) context;
    }

    @Override
    public View onCreateActionView() {
        return null;
    }

    @Override
    public View onCreateActionView(MenuItem forItem) {
        mMenu = forItem;
        return super.onCreateActionView(forItem);
    }

    @Override
    public boolean onPerformDefaultAction() {
        return super.onPerformDefaultAction();
    }

    @Override
    public boolean hasSubMenu() {
        return true;
    }

    @Override
    public void onPrepareSubMenu(SubMenu subMenu) {
        subMenu.clear();
        MenuItem sm_male = subMenu.add(Menu.NONE, 1, 1, mContext.getResources().getString(R.string.channel_male));
        sm_male.setIcon(R.drawable.ic_action_crown_male);
        sm_male.setOnMenuItemClickListener(this);

        MenuItem sm_female = subMenu.add(Menu.NONE, 2, 2, mContext.getResources().getString(R.string.channel_female));
        sm_female.setIcon(R.drawable.ic_action_crown_female);
        sm_female.setOnMenuItemClickListener(this);
    }

    @Override
    public boolean onMenuItemClick(MenuItem item) {
        if (mContext.getBaseContext() instanceof MainActivity_) {
            MainActivity_ activity = (MainActivity_) mContext.getBaseContext();
            SharedPreferences pref = mContext.getSharedPreferences(Constant.APP_PREF, Context.MODE_PRIVATE);
            switch (item.getItemId()) {
                case 1:
                    activity.ReloadWebviewWithArgs(Constant.URL_PARAM_CHANNEL_MALE);
                    mMenu.setIcon(R.drawable.ic_action_dropdown_crown_male);
                    pref.edit().putInt(Constant.PREF_CHANNEL, Constant.CHANNEL_MALE).commit();
                    break;
                case 2:
                    activity.ReloadWebviewWithArgs(Constant.URL_PARAM_CHANNEL_FEMALE);
                    mMenu.setIcon(R.drawable.ic_action_dropdown_crown_female);
                    pref.edit().putInt(Constant.PREF_CHANNEL, Constant.CHANNEL_FEMALE).commit();
                    break;
            }
        }
        return true;
    }
}
