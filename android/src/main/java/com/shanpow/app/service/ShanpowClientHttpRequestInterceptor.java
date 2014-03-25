package com.shanpow.app.service;

import com.shanpow.app.util.StaticCacheHelper;

import org.springframework.http.HttpRequest;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;

import java.io.IOException;
import java.util.List;

/**
 * Created by allendang on 14-3-25.
 */
public class ShanpowClientHttpRequestInterceptor implements ClientHttpRequestInterceptor {

    private static final String SET_COOKIE = "Set-Cookie";
    private static final String COOKIE = "Cookie";
    private static final String COOKIE_STORE = "cookieStore";

    @Override
    public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution) throws IOException {
        List<String> cookies = request.getHeaders().get(COOKIE);
        //如果header中没有cookie，则把上次存下来的都加上
        if (cookies == null) {
            List<String> cookieStore = (List<String>) StaticCacheHelper.retrieveObjectFromCache(COOKIE_STORE);
            //如果有上次保存的数据，都添加到header的Cookie段中
            if (cookieStore != null) {
                for (String cookie : cookieStore) {
                    request.getHeaders().add(COOKIE, cookie);
                }
            }
        }

        //发送请求
        ClientHttpResponse response = execution.execute(request, body);

        //从回复中取出Cookie全部保存到内存以待下次使用
        cookies = response.getHeaders().get(SET_COOKIE);
        if (cookies != null) {
            StaticCacheHelper.storeObjectInCache(COOKIE_STORE, cookies);
        }
        return response;
    }
}
