package com.shanpow.app.cordovaplugin;

import android.view.Gravity;
import android.widget.Toast;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

/**
 * Created by allendang on 14-6-12.
 */
public class ToastHelper extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("show") && args.length() == 1) {
            String message = args.getString(0);
            show(message);
        }

        callbackContext.success();
        return true;
    }

    public synchronized void show(final String message) {
        Runnable runnable = new Runnable() {
            @Override
            public void run() {
                Toast toast = Toast.makeText(cordova.getActivity(), message, Toast.LENGTH_SHORT);
                toast.setGravity(Gravity.CENTER, 0, 0);
                toast.show();
            }
        };

        this.cordova.getActivity().runOnUiThread(runnable);
    }
}
