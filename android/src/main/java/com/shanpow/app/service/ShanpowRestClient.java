package com.shanpow.app.service;

import com.shanpow.app.entity.GetCsrfTokenResult;
import com.shanpow.app.entity.LoginResult;

import org.androidannotations.annotations.rest.Get;
import org.androidannotations.annotations.rest.Post;
import org.androidannotations.annotations.rest.RequiresCookieInUrl;
import org.androidannotations.annotations.rest.Rest;
import org.androidannotations.api.rest.RestClientErrorHandling;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

/**
 * Created by allendang on 14-3-24.
 */
@Rest(rootUrl = "http://www.shanpow.com",
        converters = {MappingJackson2HttpMessageConverter.class},
        interceptors = {ShanpowClientHttpRequestInterceptor.class})
public interface ShanpowRestClient extends RestClientErrorHandling {
    @Get("/token")
    GetCsrfTokenResult GetCsrfToken();

    @Post("/account/mobilelogin?email={email}&password={password}&csrf_token={csrf_token}")
    @RequiresCookieInUrl("csrf_token")
    LoginResult Login(String email, String password);

    void setCookie(String name, String value);

    String getCookie(String name);
}
