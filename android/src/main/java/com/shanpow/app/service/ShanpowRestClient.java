package com.shanpow.app.service;

import com.shanpow.app.entity.GetCsrfTokenResult;

import org.androidannotations.annotations.rest.Get;
import org.androidannotations.annotations.rest.Rest;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

/**
 * Created by allendang on 14-3-24.
 */
@Rest(rootUrl = "http://www.shanpow.com", converters = {MappingJackson2HttpMessageConverter.class})
public interface ShanpowRestClient {
    @Get("/token")
    GetCsrfTokenResult GetCsrfToken();
}
