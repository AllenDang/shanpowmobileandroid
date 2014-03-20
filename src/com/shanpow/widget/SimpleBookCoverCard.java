package com.shanpow.widget;

import android.content.Context;
import android.util.AttributeSet;
import android.widget.FrameLayout;
import android.widget.TextView;
import com.shanpow.app.R;
import org.androidannotations.annotations.EViewGroup;
import org.androidannotations.annotations.ViewById;

/**
 * Created by allendang on 14-3-20.
 */
@EViewGroup(R.layout.widget_simplebookcovercard)
public class SimpleBookCoverCard extends FrameLayout {

    @ViewById
    TextView sbcc_title;
    private String bookId;

    public SimpleBookCoverCard(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public String getBookId() {
        return bookId;
    }

    public void setBookInfo(String id, String title) {
        bookId = id;
        sbcc_title.setText(title);
    }
}
