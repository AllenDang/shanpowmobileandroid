package com.shanpow.app.service;

import android.content.Context;
import android.content.SharedPreferences;

import com.shanpow.app.android.MainApp;
import com.shanpow.app.util.Constant;

import org.springframework.http.HttpRequest;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by allendang on 14-3-25.
 */
public class ShanpowClientHttpRequestInterceptor implements ClientHttpRequestInterceptor {

    private static final String SET_COOKIE = "Set-Cookie";
    private static final String COOKIE = "Cookie";
    private static final String COOKIE_STORE = "cookieStore";

    @Override
    public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution) throws IOException {
        SharedPreferences pref = MainApp.getAppContext().getSharedPreferences(Constant.APP_PREF, Context.MODE_PRIVATE);

        List<String> cookies = request.getHeaders().get(COOKIE);
        //如果header中没有cookie，则把上次存下来的都加上
        if (cookies == null) {
            Set<String> cookieStore = pref.getStringSet(Constant.PREF_COOKIES, null);
            //如果有上次保存的数据，都添加到header的Cookie段中
            if (cookieStore != null) {
                for (String cookie : cookieStore) {
                    request.getHeaders().add(COOKIE, cookie);
                }
            }
        }

        //发送请求
        ClientHttpResponse response = execution.execute(request, body);

        //从回复中取出Cookie全部保存到SharedPreference以待下次使用
        cookies = response.getHeaders().get(SET_COOKIE);
        Set<String> cookieSet = new HashSet<String>();
        cookieSet.addAll(cookies);
        if (cookies != null) {
            SharedPreferences.Editor cookieEditor = pref.edit();
            cookieEditor.putStringSet(Constant.PREF_COOKIES, cookieSet);
            cookieEditor.commit();
        }
        return response;
    }
}
