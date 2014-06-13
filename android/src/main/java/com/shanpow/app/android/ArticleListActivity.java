package com.shanpow.app.android;

import android.content.Intent;
import android.os.Bundle;
import android.support.v4.view.ViewPager;
import android.support.v7.app.ActionBar;
import android.support.v7.app.ActionBarActivity;

import com.astuetz.PagerSlidingTabStrip;
import com.shanpow.app.util.ArticleListPagerAdapter;
import com.shanpow.app.util.Constant;

import org.androidannotations.annotations.EActivity;

@EActivity
public class ArticleListActivity extends ActionBarActivity implements ArticleListFragment.OnArticleSelectedListener {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_article_list);

        ArticleListPagerAdapter adapter = new ArticleListPagerAdapter(getSupportFragmentManager());

        ViewPager pager = (ViewPager) findViewById(R.id.pager);
        pager.setAdapter(adapter);

        PagerSlidingTabStrip indicator = (PagerSlidingTabStrip) findViewById(R.id.indicator);
        indicator.setViewPager(pager);

        ActionBar actionBar = getSupportActionBar();
        actionBar.setDisplayHomeAsUpEnabled(true);
        actionBar.setDisplayShowHomeEnabled(false);

    }

    @Override
    public void onArticleSelected(String articleId) {
        Intent intent = new Intent(this, CordovaViewActivity.class);
        intent.putExtra(Constant.EXTRA_URL, String.format("file:///android_asset/www/Article/Detail.html?id=%s", articleId));
        startActivity(intent);
    }
}
