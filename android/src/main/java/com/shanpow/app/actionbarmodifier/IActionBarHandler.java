package com.shanpow.app.actionbarmodifier;

import android.view.Menu;
import android.view.MenuItem;

/**
 * Created by allendang on 14-4-29.
 */
public interface IActionBarHandler {

    public void setup(Menu menu);

    public boolean onOptionsItemSelected(MenuItem item);

}
