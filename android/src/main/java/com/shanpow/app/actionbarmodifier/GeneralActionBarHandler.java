package com.shanpow.app.actionbarmodifier;

import android.support.v7.app.ActionBar;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.shanpow.app.android.MainActivity;
import com.shanpow.app.android.R;
import com.shanpow.app.util.AppPref_;

/**
 * Created by allendang on 14-4-29.
 */
public class GeneralActionBarHandler extends ActionBarHandlerBase implements IActionBarHandler {

    private ImageView img_back;
    private int mTitleResId;

    public GeneralActionBarHandler(MainActivity mActivity, AppPref_ pref, int titleResId) {
        super(mActivity, pref);
        this.mTitleResId = titleResId;
    }

    @Override
    public void setup(Menu menu) {
        MenuInflater menuInflater = mActivity.getMenuInflater();
        menuInflater.inflate(R.menu.menu_empty, menu);

        ActionBar actionBar = mActivity.getSupportActionBar();
        actionBar.setCustomView(R.layout.actionbar_general);
        TextView tv_title = (TextView) actionBar.getCustomView().findViewById(R.id.tv_title);
        tv_title.setText(mTitleResId);

        img_back = (ImageView) actionBar.getCustomView().findViewById(R.id.img_back);
        if (img_back != null) {
            img_back.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    mActivity.goBack();
                }
            });
        }
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        return false;
    }
}
