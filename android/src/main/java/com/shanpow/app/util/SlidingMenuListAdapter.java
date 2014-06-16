package com.shanpow.app.util;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.shanpow.app.android.R;
import com.shanpow.app.entity.IconWithText;

/**
 * Created by allendang on 14-6-16.
 */
public class SlidingMenuListAdapter extends ArrayAdapter<IconWithText> {
    public SlidingMenuListAdapter(Context context, IconWithText[] objects) {
        super(context, R.layout.list_sliding_menu, objects);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        if (convertView == null) {
            convertView = LayoutInflater.from(getContext()).inflate(
                    R.layout.list_sliding_menu, parent, false);
        }

        ImageView imageView = (ImageView) convertView.findViewById(R.id.imageView);
        TextView textView = (TextView) convertView.findViewById(R.id.textView);

        IconWithText obj = getItem(position);
        imageView.setImageResource(obj.iconResId);

        textView.setText(obj.text);

        return convertView;
    }
}
