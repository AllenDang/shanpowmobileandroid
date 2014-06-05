package com.shanpow.app.service;

import com.shanpow.app.entity.GetBookSourcesResult;

import org.androidannotations.annotations.rest.Get;
import org.androidannotations.annotations.rest.Rest;
import org.androidannotations.api.rest.RestClientErrorHandling;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

/**
 * Created by allendang on 14-6-4.
 */
@Rest(rootUrl = "http://www.shanpow.com:8080",
        converters = {MappingJackson2HttpMessageConverter.class})
public interface ShanpowReaderClient extends RestClientErrorHandling {
    @Get("/sources?title={bookTitle}&author={bookAuthor}")
    GetBookSourcesResult GetBookSources(String bookTitle, String bookAuthor);
}
