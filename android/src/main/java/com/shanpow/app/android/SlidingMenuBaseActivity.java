package com.shanpow.app.android;

import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jeremyfeinstein.slidingmenu.lib.SlidingMenu;
import com.jeremyfeinstein.slidingmenu.lib.app.SlidingActivity;
import com.shanpow.app.entity.SimpleUser;
import com.shanpow.app.service.ShanpowErrorHandler;
import com.shanpow.app.service.ShanpowRestClient;
import com.shanpow.app.util.AppPref_;

import org.androidannotations.annotations.AfterInject;
import org.androidannotations.annotations.Background;
import org.androidannotations.annotations.Bean;
import org.androidannotations.annotations.Click;
import org.androidannotations.annotations.EActivity;
import org.androidannotations.annotations.ItemClick;
import org.androidannotations.annotations.UiThread;
import org.androidannotations.annotations.ViewById;
import org.androidannotations.annotations.rest.RestService;
import org.androidannotations.annotations.sharedpreferences.Pref;

@EActivity
public class SlidingMenuBaseActivity extends SlidingActivity {

    private SimpleUser currentUser;

    @ViewById
    Button btn_login;

    @ViewById
    TextView tv_nickname;

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

        String[] menuItems = {"首页", "榜单", "热辣书评", "设置"};
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

    @Background
    void doLogout() {
        restClient.Logout();
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
        tv_nickname.setText("");
    }

    @ItemClick
    void lv_menuItemClicked(String item) {
        Toast.makeText(this, item, Toast.LENGTH_SHORT).show();
    }
}
