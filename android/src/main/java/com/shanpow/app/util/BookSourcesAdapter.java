package com.shanpow.app.util;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import com.shanpow.app.android.R;
import com.shanpow.app.entity.BookSource;

/**
 * Created by allendang on 14-6-4.
 */
public class BookSourcesAdapter extends ArrayAdapter<BookSource> {
    public BookSourcesAdapter(Context context, BookSource[] sources) {
        super(context, R.layout.list_book_source, sources);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        if (convertView == null) {
            convertView = LayoutInflater.from(getContext()).inflate(
                    R.layout.list_book_source, parent, false);
        }

        TextView txtv_chapter = (TextView) convertView.findViewById(R.id.txtv_chaptername);
        TextView txtv_host = (TextView) convertView.findViewById(R.id.txtv_host);
        TextView txtv_updatetime = (TextView) convertView.findViewById(R.id.txtv_updatetime);

        BookSource source = getItem(position);

        txtv_chapter.setText(source.Chapter);
        txtv_host.setText(source.Host);
        txtv_updatetime.setText(source.UpdateTime);

        return convertView;
    }
}
