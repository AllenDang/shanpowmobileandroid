package com.shanpow.app.android;

import android.app.Fragment;
import android.content.Intent;
import android.os.Bundle;
import android.widget.ListView;

import com.jeremyfeinstein.slidingmenu.lib.SlidingMenu;
import com.jeremyfeinstein.slidingmenu.lib.app.SlidingActivity;
import com.shanpow.app.entity.IconWithText;
import com.shanpow.app.service.ShanpowErrorHandler;
import com.shanpow.app.service.ShanpowRestClient;
import com.shanpow.app.util.AppPref_;
import com.shanpow.app.util.Constant;
import com.shanpow.app.util.SlidingMenuListAdapter;
import com.tencent.tauth.Tencent;

import org.androidannotations.annotations.AfterInject;
import org.androidannotations.annotations.Background;
import org.androidannotations.annotations.Bean;
import org.androidannotations.annotations.EActivity;
import org.androidannotations.annotations.ItemClick;
import org.androidannotations.annotations.OptionsItem;
import org.androidannotations.annotations.UiThread;
import org.androidannotations.annotations.rest.RestService;
import org.androidannotations.annotations.sharedpreferences.Pref;

@EActivity
public class SlidingMenuBaseActivity extends SlidingActivity
        implements LoginFragment.OnLoginListener, LogoutFragment.OnLogoutActionListener {

    private final static int REQUEST_CODE_LOGIN = 1;

    private Tencent mTencent;

    @Pref
    AppPref_ pref;

    @RestService
    ShanpowRestClient restClient;

    @Bean
    ShanpowErrorHandler errorHandler;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setBehindContentView(R.layout.activity_sliding_menu_base);

        SlidingMenu menu = getSlidingMenu();
        menu.setMode(SlidingMenu.LEFT);
        menu.setTouchModeAbove(SlidingMenu.TOUCHMODE_MARGIN);
        menu.setBehindOffsetRes(R.dimen.slidingmenu_offset);

        IconWithText[] menus = {
                new IconWithText(R.drawable.ic_action_home, getString(R.string.title_home)),
                new IconWithText(R.drawable.ic_article_list, getString(R.string.title_activity_article_list))
        };

        SlidingMenuListAdapter adapter = new SlidingMenuListAdapter(this, menus);

        ListView list = (ListView) findViewById(R.id.lv_menu);
        list.setAdapter(adapter);

        mTencent = Tencent.createInstance(Constant.TENCENT_APPID, getApplicationContext());

        Fragment fragment;
        //判断是否已登录
        if (pref.currentUserInJsonFormat().exists()) {
            fragment = new LogoutFragment_();
        } else {
            fragment = new LoginFragment_();
        }
        getFragmentManager().beginTransaction().replace(R.id.loginContainer, fragment).commit();
    }

    @AfterInject
    void afterInject() {
        restClient.setRestErrorHandler(errorHandler);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
        super.onActivityResult(requestCode, resultCode, intent);

        //Login完成
        if (requestCode == REQUEST_CODE_LOGIN) {
            //如果是MainActivity，则刷新webview
            if (this instanceof MainActivity_) {
                MainActivity_ activity = (MainActivity_) this;
                activity.reload();
            }
            //载入LogoutFragment
            LogoutFragment_ fragment = new LogoutFragment_();
            getFragmentManager().beginTransaction().replace(R.id.loginContainer, fragment).commit();
        }
    }

    //用于给CordovaPlugin调用
    public void logout() {
        doLogout();
    }

    @Background
    void doLogout() {
        restClient.Logout();
        pref.csrfToken().remove();
        if (mTencent.isSessionValid()) {
            mTencent.logout(getApplicationContext());
        }

        afterLogout();
    }

    @UiThread
    void afterLogout() {
        //删除保存的信息
        pref.currentUserInJsonFormat().remove();

        //返回首页
        if (this instanceof MainActivity_) {
            MainActivity_ activity = (MainActivity_) this;
            activity.gotoUrl(Constant.URL_MAIN);
        }

        //载入LoginFragment
        LoginFragment_ fragment = new LoginFragment_();
        getFragmentManager().beginTransaction().replace(R.id.loginContainer, fragment).commit();
    }

    @ItemClick
    void lv_menuItemClicked(IconWithText item) {
        //如果是MainActivity，则刷新webview
        if (this instanceof MainActivity_) {
            MainActivity_ activity = (MainActivity_) this;
            if (item.text.equals(getString(R.string.title_home))) {
                activity.gotoUrl(Constant.URL_MAIN);
            }
            if (item.text.equals(getString(R.string.title_activity_article_list))) {
                //activity.gotoUrl(Constant.URL_ARTICLE_LIST);
                ArticleListActivity_.intent(this).start();
            }
        }

        toggle();
    }

    @OptionsItem(android.R.id.home)
    void homeAsUpClicked() {
        getSlidingMenu().toggle();
    }

    @Override
    public void onLogin() {
        LoginActivity_.intent(this).startForResult(REQUEST_CODE_LOGIN);
    }

    @Override
    public void onClickAvatar(String currentUserNickname) {
        if (this instanceof MainActivity_) {
            MainActivity_ activity = (MainActivity_) this;
            activity.gotoUrl(Constant.URL_PEOPLE + currentUserNickname);
            toggle();
        }
    }

    @Override
    public void onClickBell() {
        if (this instanceof MainActivity_) {
            MainActivity_ activity = (MainActivity_) this;
            activity.gotoUrl(Constant.URL_NOTIFICATION_CENTER);
            toggle();
        }
    }
}
