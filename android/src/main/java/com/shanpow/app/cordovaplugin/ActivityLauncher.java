package com.shanpow.app.cordovaplugin;

import android.content.Context;
import android.content.Intent;

import com.shanpow.app.android.BookSourcesActivity_;
import com.shanpow.app.android.LoginActivity_;
import com.shanpow.app.android.MainActivity_;
import com.shanpow.app.util.Constant;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

/**
 * Created by allendang on 14-5-16.
 */
public class ActivityLauncher extends CordovaPlugin {
    @Override
    public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
        if (action.equals("login")) {
            login();
        } else if (action.equals("toggleSlidingMenu")) {
            toggleSlidingMenu();
        } else if (action.equals("bookSources")) {
            bookSources(args.getString(0), args.getString(1));
        } else if (action.equals("logout")) {
            logout();
        } else {
            return false;
        }
        callbackContext.success();
        return true;
    }

    public void login() {
        Context context = cordova.getActivity().getApplicationContext();
        Intent intent = new Intent(context, LoginActivity_.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
    }

    public void logout() {
        if (webView.getContext() instanceof MainActivity_) {
            MainActivity_ activity = (MainActivity_) webView.getContext();
            activity.logout();
        }
    }

    public void bookSources(String bookTitle, String bookAuthor) {
        Context context = cordova.getActivity().getApplicationContext();
        Intent intent = new Intent(context, BookSourcesActivity_.class);
        intent.putExtra(Constant.EXTRA_BOOKTITLE, bookTitle);
        intent.putExtra(Constant.EXTRA_BOOKAUTHOR, bookAuthor);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
    }

    public void toggleSlidingMenu() {
        cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (cordova.getActivity() instanceof MainActivity_) {
                    MainActivity_ ma = (MainActivity_) cordova.getActivity();
                    ma.toggle();
                }
            }
        });
    }
}
