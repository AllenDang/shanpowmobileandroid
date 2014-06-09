package com.shanpow.app.cordovaplugin;

import com.shanpow.app.util.MemoryCache;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by allendang on 14-6-9.
 */
public class CachedIOHelper extends CordovaPlugin {
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("get") && args.length() == 1) {
            String key = args.getString(0);
            JSONObject obj = get(key);
            if (obj == null) {
                callbackContext.error(0);
            } else {
                callbackContext.success(obj);
            }
        } else if (action.equals("set") && args.length() == 2) {
            String key = args.getString(0);
            JSONObject obj = args.getJSONObject(1);
            set(key, obj);
            callbackContext.success();
        } else if (action.equals("remove") && args.length() == 1) {
            String key = args.getString(0);
            remove(key);
            callbackContext.success();
        } else {
            return false;
        }

        return true;
    }

    public JSONObject get(String key) {
        return MemoryCache.getInstance().get(key);
    }

    public void set(String key, JSONObject obj) {
        MemoryCache.getInstance().set(key, obj);
    }

    public void remove(String key) {
        MemoryCache.getInstance().remove(key);
    }
}
