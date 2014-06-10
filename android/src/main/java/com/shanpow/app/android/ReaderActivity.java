package com.shanpow.app.android;

import android.app.ActionBar;
import android.app.Activity;
import android.graphics.Bitmap;
import android.graphics.Point;
import android.graphics.Typeface;
import android.os.Build;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.Display;
import android.view.MotionEvent;
import android.view.View;
import android.view.WindowManager;
import android.widget.ImageView;

import com.shanpow.app.util.Paginator;

import org.androidannotations.annotations.Click;
import org.androidannotations.annotations.EActivity;
import org.androidannotations.annotations.Touch;
import org.androidannotations.annotations.ViewById;

import java.io.IOException;


/**
 * An example full-screen activity that shows and hides the system UI (i.e.
 * status bar and navigation/system bar) with user interaction.
 */
@EActivity
public class ReaderActivity extends Activity {

    private Paginator mPaginator;

    private boolean mIsSystemUiVisible = false;

    @ViewById
    ImageView img_content;

    @ViewById
    View detail_controls;

    @ViewById
    View fullscreen_content_controls;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_reader);

        // Load text file
        String filePath = "";
        if (!TextUtils.isEmpty(filePath)) {
            int width;
            int height;
            Display display = getWindowManager().getDefaultDisplay();
            if (Build.VERSION.SDK_INT >= 13) {
                Point size = new Point();
                display.getSize(size);
                width = size.x;
                height = size.y;
            } else {
                width = display.getWidth();
                height = display.getHeight();
            }

            mPaginator = new Paginator(Typeface.DEFAULT, 42, 16, width, height);
            try {
                mPaginator.openFile(filePath, "utf8");
                mPaginator.calcPageNum();
                Bitmap bmp = mPaginator.nextPage();
                if (bmp != null) {
                    img_content.setImageBitmap(bmp);
                }
            } catch (IOException e) {
                //TODO: 处理异常，提示用户打开文件出错，返回上一个activity
                e.printStackTrace();
            }
        }
    }

    private void setSystemUiVisible(boolean visible) {
        detail_controls.setVisibility(View.GONE);

        fullscreen_content_controls.setVisibility(visible ? View.VISIBLE : View.GONE);

        getWindow().setFlags(
                visible ? 0 : WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);

        ActionBar bar = getActionBar();
        if (bar != null) {
            if (visible) {
                bar.show();
            } else {
                bar.hide();
            }
        }

        mIsSystemUiVisible = visible;
    }

    @Click
    void btn_settingClicked() {
        if (detail_controls.getVisibility() == View.GONE) {
            detail_controls.setVisibility(View.VISIBLE);
            FontFragment_ fragment = new FontFragment_();
            getFragmentManager().beginTransaction().replace(R.id.detail_controls, fragment).commit();
        } else {
            detail_controls.setVisibility(View.GONE);
        }
    }

    @Touch(R.id.img_content)
    void img_contentTouched(View v, MotionEvent event) {
        if (event.getAction() == MotionEvent.ACTION_DOWN) {
            if (mIsSystemUiVisible) {
                setSystemUiVisible(false);
            } else {
                float x = event.getX();
                //将img_content水平分成三份，左侧代表上一页，中间代表出现菜单，右边代表下一页
                int width = img_content.getMeasuredWidth();
                if (x < width / 3) {
                    Bitmap bmp = mPaginator.previousPage();
                    if (bmp != null) {
                        img_content.setImageBitmap(bmp);
                    }
                } else if (x > (width / 3 * 2)) {
                    Bitmap bmp = mPaginator.nextPage();
                    if (bmp != null) {
                        img_content.setImageBitmap(bmp);
                    }
                } else {
                    setSystemUiVisible(!mIsSystemUiVisible);
                }
            }
        }
    }

    @Override
    protected void onPostCreate(Bundle savedInstanceState) {
        super.onPostCreate(savedInstanceState);
        setSystemUiVisible(false);
    }
}
