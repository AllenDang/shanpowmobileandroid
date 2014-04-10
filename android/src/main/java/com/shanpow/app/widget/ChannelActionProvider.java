package com.shanpow.app.widget;

import android.content.Context;
import android.support.v4.view.ActionProvider;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.SubMenu;
import android.view.View;
import android.widget.Toast;

/**
 * Created by allendang on 14-4-3.
 */
public class ChannelActionProvider extends ActionProvider implements
        MenuItem.OnMenuItemClickListener {

    Context mContext;

    public ChannelActionProvider(Context context) {
        super(context);
        mContext = context;
    }

    @Override
    public View onCreateActionView() {
        return null;
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
        Log.d("DEBUG", "onPrepareSubMenu");
        subMenu.clear();
        subMenu.add(Menu.NONE, 1, 1, "男频").setOnMenuItemClickListener(this);
        subMenu.add(Menu.NONE, 2, 2, "女频").setOnMenuItemClickListener(this);
    }

    @Override
    public boolean onMenuItemClick(MenuItem item) {
        Toast.makeText(mContext, item.getTitle(), Toast.LENGTH_SHORT).show();
        return true;
    }
}
