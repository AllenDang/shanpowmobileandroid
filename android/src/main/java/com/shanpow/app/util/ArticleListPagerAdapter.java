package com.shanpow.app.util;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;

import com.shanpow.app.android.ArticleListFragment;

/**
 * Created by allendang on 14-6-11.
 */
public class ArticleListPagerAdapter extends FragmentPagerAdapter {

    protected static final String[] TAGS = new String[]{
            "每日一书", "名家专栏", "作者访谈", "读者访谈",
            "山坡专题", "网文动态", "闲情八卦", "写作探讨"};

    private int mCount = TAGS.length;

    public ArticleListPagerAdapter(FragmentManager fm) {
        super(fm);
    }

    @Override
    public Fragment getItem(int position) {
        return ArticleListFragment.newInstance(TAGS[position]);
    }

    @Override
    public int getCount() {
        return mCount;
    }

    @Override
    public CharSequence getPageTitle(int position) {
        return TAGS[position];
    }
}
