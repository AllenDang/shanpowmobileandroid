package com.shanpow.app.actionbarmodifier;

import android.support.v7.app.ActionBar;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;

import com.shanpow.app.android.MainActivity;
import com.shanpow.app.android.R;
import com.shanpow.app.util.AppPref_;

/**
 * Created by allendang on 14-4-30.
 */
public class WriteReviewActionBarHandler extends ActionBarHandlerBase implements IActionBarHandler {

    private ImageView img_back;

    private Button btn_comment, btn_review;

    public WriteReviewActionBarHandler(MainActivity mActivity, AppPref_ pref) {
        super(mActivity, pref);
    }

    @Override
    public void setup(Menu menu) {
        MenuInflater menuInflater = mActivity.getMenuInflater();
        menuInflater.inflate(R.menu.menu_empty, menu);

        ActionBar actionBar = mActivity.getSupportActionBar();
        actionBar.setCustomView(R.layout.actionbar_write_review);

        img_back = (ImageView) actionBar.getCustomView().findViewById(R.id.img_back);
        if (img_back != null) {
            img_back.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    mActivity.goBack();
                }
            });
        }

        btn_comment = (Button) actionBar.getCustomView().findViewById(R.id.btn_comment);
        if (btn_comment != null) {
            btn_comment.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    String currentUrl = mActivity.getCurrentUrl();
                    currentUrl = currentUrl.replace("writereview", "writecomment");
                    mActivity.gotoUrl(currentUrl);
                }
            });
        }

        btn_review = (Button) actionBar.getCustomView().findViewById(R.id.btn_review);
        if (btn_review != null) {
            btn_review.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    String currentUrl = mActivity.getCurrentUrl();
                    currentUrl = currentUrl.replace("writecomment", "writereview");
                    mActivity.gotoUrl(currentUrl);
                }
            });
        }
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        return false;
    }
}
