package com.shanpow.app.android;

import android.content.Intent;
import android.support.v7.app.ActionBarActivity;
import android.widget.TextView;

import com.shanpow.app.util.Constant;

import org.androidannotations.annotations.AfterViews;
import org.androidannotations.annotations.EActivity;
import org.androidannotations.annotations.ViewById;

@EActivity(R.layout.activity_book_sources)
public class BookSourcesActivity extends ActionBarActivity {

    @ViewById
    TextView txtv_info;

    @AfterViews
    void init() {
        Intent intent = getIntent();
        String bookTitle = intent.getStringExtra(Constant.EXTRA_BOOKTITLE);
        String bookAuthor = intent.getStringExtra(Constant.EXTRA_BOOKAUTHOR);

        txtv_info.setText(String.format("%s-%s", bookTitle, bookAuthor));
    }
}
