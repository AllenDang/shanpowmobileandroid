package com.shanpow.app.service;

import com.shanpow.app.entity.GetCsrfTokenResult;
import com.shanpow.app.util.PrefHelper_;

import org.androidannotations.annotations.EBean;
import org.androidannotations.annotations.rest.RestService;
import org.androidannotations.annotations.sharedpreferences.Pref;
import org.androidannotations.api.rest.RestErrorHandler;
import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClientException;

/**
 * Created by allendang on 14-3-24.
 */
@EBean
public class ShanpowErrorHandler implements RestErrorHandler {

    @RestService
    ShanpowRestClient restClient;

    @Pref
    PrefHelper_ pref;

    @Override
    public void onRestClientExceptionThrown(RestClientException e) {
        if (e instanceof HttpClientErrorException) {
            //如果是403错误，表示csrf_token已经过期，重新获取并保存
            if (((HttpClientErrorException) e).getStatusCode() == HttpStatus.FORBIDDEN) {
                GetCsrfTokenResult result = restClient.GetCsrfToken();
                if (result.Result) {
                    pref.csrfToken().put(result.Data);
                }
            }
        }
    }
}
