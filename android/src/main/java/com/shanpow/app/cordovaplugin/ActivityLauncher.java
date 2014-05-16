package com.shanpow.app.cordovaplugin;

import android.content.Context;
import android.content.Intent;

import com.shanpow.app.android.LoginActivity_;

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
            cordova.getActivity().runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    login();
                    callbackContext.success();
                }
            });
            return true;
        } else {
            return false;
        }
    }

    public void login() {
        Context context = cordova.getActivity().getApplicationContext();
        Intent intent = new Intent(context, LoginActivity_.class);
        context.startActivity(intent);
    }
}
