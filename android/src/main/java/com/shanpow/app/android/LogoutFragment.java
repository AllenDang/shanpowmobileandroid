package com.shanpow.app.android;

import android.app.Activity;
import android.app.Fragment;
import android.content.Context;
import android.content.SharedPreferences;
import android.text.TextUtils;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shanpow.app.entity.SimpleUser;
import com.shanpow.app.util.Constant;
import com.squareup.picasso.Picasso;

import org.androidannotations.annotations.AfterViews;
import org.androidannotations.annotations.Click;
import org.androidannotations.annotations.EFragment;
import org.androidannotations.annotations.UiThread;
import org.androidannotations.annotations.ViewById;


/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link LogoutFragment.OnLogoutActionListener} interface
 * to handle interaction events.
 */
@EFragment(R.layout.fragment_logout)
public class LogoutFragment extends Fragment {

    private OnLogoutActionListener mListener;

    private SimpleUser mCurrentUser;

    @ViewById
    TextView tv_nickname;

    @ViewById
    ImageView img_profile;

    @ViewById
    TextView tv_unreadcount;

    @Override
    public void onAttach(Activity activity) {
        super.onAttach(activity);
        try {
            mListener = (OnLogoutActionListener) activity;
        } catch (ClassCastException e) {
            throw new ClassCastException(activity.toString()
                    + " must implement OnFragmentInteractionListener");
        }
    }

    @AfterViews
    void afterViewInjection() {
        //获取SharedPreference
        SharedPreferences pref = MainApp.getAppContext().getSharedPreferences(Constant.APP_PREF, Context.MODE_PRIVATE);

        //判断是否已登录，并且读取登陆用户信息
        String currentUserInJsonFormat = pref.getString("currentUserInJsonFormat", "");
        if (!TextUtils.isEmpty(currentUserInJsonFormat)) {
            ObjectMapper mapper = new ObjectMapper();
            try {
                SimpleUser user = mapper.readValue(currentUserInJsonFormat, SimpleUser.class);
                tv_nickname.setText(user.Nickname);

                //读取用户头像
                if (!user.AvatarUrl.isEmpty()) {
                    Picasso.with(this.getActivity())
                            .load(user.AvatarUrl)
                            .placeholder(R.drawable.ic_user_normal)
                            .into(img_profile);
                }

                mCurrentUser = user;
            } catch (Exception e) {
                //TODO: 处理序列化错误
            }
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    @UiThread
    void updateUnReadCount(int count) {
        if (count > 0) {
            tv_unreadcount.setVisibility(View.VISIBLE);
            String strCount;
            if (count > 99) {
                strCount = "99+";
            } else {
                strCount = String.valueOf(count);
            }
            tv_unreadcount.setText(strCount);
        } else {
            tv_unreadcount.setVisibility(View.INVISIBLE);
        }
    }

    @Click
    void img_profileClicked() {
        if (mCurrentUser != null) {
            mListener.onClickAvatar(mCurrentUser.Nickname);
        }
    }

    @Click
    void img_bellClicked() {
        mListener.onClickBell();
    }

    public interface OnLogoutActionListener {
        //点击了头像
        public void onClickAvatar(String currentUserNickname);

        //点击了铃铛图标
        public void onClickBell();
    }

}
