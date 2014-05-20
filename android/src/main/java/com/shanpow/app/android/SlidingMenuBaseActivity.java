package com.shanpow.app.android;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jeremyfeinstein.slidingmenu.lib.SlidingMenu;
import com.jeremyfeinstein.slidingmenu.lib.app.SlidingActivity;
import com.shanpow.app.entity.SimpleUser;
import com.shanpow.app.service.ShanpowErrorHandler;
import com.shanpow.app.service.ShanpowRestClient;
import com.shanpow.app.util.AppPref_;
import com.shanpow.app.util.Constant;
import com.squareup.picasso.Picasso;

import org.androidannotations.annotations.AfterInject;
import org.androidannotations.annotations.Background;
import org.androidannotations.annotations.Bean;
import org.androidannotations.annotations.Click;
import org.androidannotations.annotations.EActivity;
import org.androidannotations.annotations.ItemClick;
import org.androidannotations.annotations.OptionsItem;
import org.androidannotations.annotations.UiThread;
import org.androidannotations.annotations.ViewById;
import org.androidannotations.annotations.rest.RestService;
import org.androidannotations.annotations.sharedpreferences.Pref;

import de.hdodenhof.circleimageview.CircleImageView;

@EActivity
public class SlidingMenuBaseActivity extends SlidingActivity {

    private SimpleUser currentUser;

    @ViewById
    Button btn_login;

    @ViewById
    TextView tv_nickname;

    @ViewById
    CircleImageView img_profile;

    @Pref
    AppPref_ pref;

    @RestService
    ShanpowRestClient restClient;

    @Bean
    ShanpowErrorHandler errorHandler;

    @AfterInject
    void afterInject() {
        restClient.setRestErrorHandler(errorHandler);
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setBehindContentView(R.layout.activity_sliding_menu_base);

        SlidingMenu menu = getSlidingMenu();
        menu.setMode(SlidingMenu.LEFT);
        menu.setTouchModeAbove(SlidingMenu.TOUCHMODE_MARGIN);
        menu.setBehindOffsetRes(R.dimen.slidingmenu_offset);

        String[] menuItems = {"首页", "专栏文章"};
        ListView list = (ListView) findViewById(R.id.lv_menu);
        list.setAdapter(new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, menuItems));
    }

    @Override
    protected void onResume() {
        super.onResume();

        //判断是否已登录
        if (currentUser == null && pref.currentUserInJsonFormat().exists()) {
            ObjectMapper mapper = new ObjectMapper();
            try {
                SimpleUser user = mapper.readValue(pref.currentUserInJsonFormat().get(), SimpleUser.class);
                tv_nickname.setText(user.Nickname);
                btn_login.setText(R.string.action_sign_out);

                //读取用户头像
                //TODO:将下载过来的头像保存起来
                if (!user.AvatarUrl.isEmpty()) {
                    Picasso.with(this)
                            .load(user.AvatarUrl)
                            .placeholder(R.drawable.ic_user_normal)
                            .into(img_profile);
                }

                currentUser = user;
            } catch (Exception e) {
                //TODO: 处理序列化错误
            }
        }
    }

    @Click
    void btn_loginClicked() {
        String login = getResources().getString(R.string.action_sign_in);

        if (btn_login.getText().toString().equals(login)) {
            //登陆
            LoginActivity_.intent(this).start();
        } else {
            //退出
            btn_login.setText(R.string.action_signing_out);
            btn_login.setEnabled(false);
            //清除Cookie
            doLogout();
        }
    }

    @Click
    void img_profileClicked() {
        if (this instanceof MainActivity_ && currentUser != null) {
            MainActivity_ activity = (MainActivity_) this;
            activity.gotoUrl(Constant.URL_PEOPLE + currentUser.Nickname);
            toggle();
        }
    }

    @Background
    void doLogout() {
        restClient.Logout();
        pref.csrfToken().remove();
        afterLogout();
    }

    @UiThread
    void afterLogout() {
        //删除保存的信息
        pref.currentUserInJsonFormat().remove();
        currentUser = null;

        //更新UI
        btn_login.setText(R.string.action_sign_in);
        btn_login.setEnabled(true);
        tv_nickname.setText(getResources().getString(R.string.text_user_doesnt_signedin));
        img_profile.setImageResource(R.drawable.ic_user_normal);

        //如果是MainActivity，则刷新webview
        if (this instanceof MainActivity_) {
            MainActivity_ activity = (MainActivity_) this;
            activity.reload();
        }
    }

    @ItemClick
    void lv_menuItemClicked(String item) {
        //如果是MainActivity，则刷新webview
        if (this instanceof MainActivity_) {
            MainActivity_ activity = (MainActivity_) this;
            if (item.equals("首页")) {
                activity.gotoUrl(Constant.URL_MAIN);
            }
            if (item.equals("专栏文章")) {
                activity.gotoUrl(Constant.URL_ARTICLE_LIST);
            }
            if (item.equals("Reader")) {
                Intent intent = new Intent(this, ReaderActivity.class);
                startActivity(intent);
            }
        }

        toggle();
    }

    @OptionsItem(android.R.id.home)
    void homeAsUpClicked() {
        getSlidingMenu().toggle();
    }
}
