package com.shanpow.app.android;

import android.content.Intent;
import android.support.v7.app.ActionBarActivity;
import android.widget.ListView;
import android.widget.TextView;

import com.shanpow.app.entity.BookSource;
import com.shanpow.app.entity.GetBookSourcesResult;
import com.shanpow.app.service.ShanpowReaderClient;
import com.shanpow.app.util.BookSourcesAdapter;
import com.shanpow.app.util.Constant;

import org.androidannotations.annotations.AfterViews;
import org.androidannotations.annotations.Background;
import org.androidannotations.annotations.EActivity;
import org.androidannotations.annotations.UiThread;
import org.androidannotations.annotations.ViewById;
import org.androidannotations.annotations.rest.RestService;

@EActivity(R.layout.activity_book_sources)
public class BookSourcesActivity extends ActionBarActivity {

    @ViewById
    TextView txtv_info;

    @ViewById
    ListView lv_sources;

    @RestService
    ShanpowReaderClient readerClient;

    @AfterViews
    void init() {
        Intent intent = getIntent();
        String bookTitle = intent.getStringExtra(Constant.EXTRA_BOOKTITLE);
        String bookAuthor = intent.getStringExtra(Constant.EXTRA_BOOKAUTHOR);

        getBookSources(bookTitle, bookAuthor);
    }

    @Background
    void getBookSources(String bookTitle, String bookAuthor) {
        try {
            GetBookSourcesResult result = readerClient.GetBookSources(bookTitle, bookAuthor);
            if (result != null && result.Result && result.Data.length > 0) {
                fillData(result.Data);
            } else {
                //TODO: show error here
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @UiThread
    void fillData(BookSource[] sources) {
        txtv_info.setText(String.format("共找到%d个源", sources.length));
        BookSourcesAdapter adapter = new BookSourcesAdapter(this, sources);
        lv_sources.setAdapter(adapter);
    }
}
