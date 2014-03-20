package com.shanpow.widget;

import android.content.Context;
import android.util.AttributeSet;
import android.widget.FrameLayout;
import android.widget.RatingBar;
import android.widget.TextView;
import com.shanpow.app.R;
import org.androidannotations.annotations.EViewGroup;
import org.androidannotations.annotations.ViewById;

/**
 * Created by allendang on 14-3-20.
 */

@EViewGroup(R.layout.widget_bookcovercard)
public class BookCoverCard extends FrameLayout {

    @ViewById
    TextView bcc_score, bcc_title, bcc_description;
    @ViewById
    RatingBar bcc_rating;
    private String bookId;

    public BookCoverCard(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public String getBookId() {
        return bookId;
    }

    public void setBookInfo(String id, double score, String title, String description) {
        bookId = id;
        bcc_rating.setRating((float) (score / 2));
        bcc_score.setText(String.valueOf(score));
        bcc_title.setText(title);
        bcc_description.setText(description);
    }

}
