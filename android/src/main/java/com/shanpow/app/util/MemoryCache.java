package com.shanpow.app.util;

import org.json.JSONObject;

import java.util.HashMap;

/**
 * Created by allendang on 14-6-9.
 */
public class MemoryCache {

    private static MemoryCache mInstance = null;

    private static HashMap<String, JSONObject> mObjMap;

    private static HashMap<String, Integer> mIntMap;

    private MemoryCache() {
        mObjMap = new HashMap<String, JSONObject>();
        mIntMap = new HashMap<String, Integer>();
    }

    public static MemoryCache getInstance() {
        if (mInstance == null) {
            mInstance = new MemoryCache();
        }
        return mInstance;
    }

    public JSONObject get(String key) {
        if (mObjMap.containsKey(key)) {
            return mObjMap.get(key);
        }
        return null;
    }

    public int getInt(String key) {
        if (mIntMap.containsKey(key)) {
            return mIntMap.get(key);
        }
        return 0;
    }

    public void set(String key, JSONObject obj) {
        mObjMap.put(key, obj);
    }

    public void setInt(String key, int value) {
        mIntMap.put(key, value);
    }

    public void remove(String key) {
        mObjMap.remove(key);
    }

    public void clear() {
        mObjMap.clear();
        mIntMap.clear();
    }
}
