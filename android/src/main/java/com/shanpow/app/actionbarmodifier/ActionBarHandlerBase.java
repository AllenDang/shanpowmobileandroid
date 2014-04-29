package com.shanpow.app.actionbarmodifier;

import com.shanpow.app.android.MainActivity;
import com.shanpow.app.util.AppPref_;

/**
 * Created by allendang on 14-4-29.
 */
public class ActionBarHandlerBase {
    protected MainActivity mActivity;
    protected AppPref_ mPref;

    public ActionBarHandlerBase(MainActivity mActivity, AppPref_ pref) {
        this.mActivity = mActivity;
        this.mPref = pref;
    }
}
