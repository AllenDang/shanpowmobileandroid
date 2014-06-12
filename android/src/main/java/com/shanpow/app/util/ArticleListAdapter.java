package com.shanpow.app.util;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.shanpow.app.android.R;
import com.shanpow.app.entity.SimpleArticleInfo;
import com.squareup.picasso.Picasso;

import java.util.List;

/**
 * Created by allendang on 14-6-11.
 */
public class ArticleListAdapter extends ArrayAdapter<SimpleArticleInfo> {
    public ArticleListAdapter(Context context, List<SimpleArticleInfo> objects) {
        super(context, R.layout.list_articles, objects);
    }


    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        if (convertView == null) {
            convertView = LayoutInflater.from(getContext()).inflate(
                    R.layout.list_articles, parent, false);
        }

        TextView txtv_title = (TextView) convertView.findViewById(R.id.txtv_title);
        TextView txtv_author = (TextView) convertView.findViewById(R.id.txtv_author);
        TextView txtv_onlinetime = (TextView) convertView.findViewById(R.id.txtv_onlinetime);
        ImageView img_banner = (ImageView) convertView.findViewById(R.id.img_banner);

        SimpleArticleInfo info = getItem(position);

        txtv_title.setText(info.Title);
        txtv_author.setText(info.Author);
        txtv_onlinetime.setText(String.format("%s前", info.OnlineTime));

        Picasso.with(getContext())
                .load(info.ImageUrl + "?imageView/2/h/68")
                .into(img_banner);

        return convertView;
    }
}
