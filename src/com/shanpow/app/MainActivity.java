package com.shanpow.app;

import android.view.View;
import android.widget.Toast;
import com.actionbarsherlock.app.SherlockActivity;
import com.shanpow.widget.BookCoverCard;
import com.shanpow.widget.SimpleBookCoverCard;
import org.androidannotations.annotations.*;

@EActivity(R.layout.main)
@OptionsMenu(R.menu.main)
public class MainActivity extends SherlockActivity {

    @ViewById
    BookCoverCard firstCard;

    @ViewById
    SimpleBookCoverCard secondCard;

    @OptionsItem(R.id.main_menu_add)
    void menuAddSelected() {
        Toast.makeText(this, "Add", Toast.LENGTH_SHORT).show();
    }

    @OptionsItem(R.id.main_menu_delete)
    void menuDeleteSelected() {
        Toast.makeText(this, "Delete", Toast.LENGTH_SHORT).show();
    }

    @Click(R.id.firstCard)
    void firstCardClicked(View v) {
        if (v instanceof BookCoverCard) {
            Toast.makeText(this, ((BookCoverCard)v).getBookId(), Toast.LENGTH_SHORT).show();
        }
    }

    @AfterViews
    void init() {
        firstCard.setBookInfo("123123123123", 8.1, "凡人修仙传", "一本传奇书籍，吐血推荐");
        secondCard.setBookInfo("sssssss", "我擦你妹");
    }
}
