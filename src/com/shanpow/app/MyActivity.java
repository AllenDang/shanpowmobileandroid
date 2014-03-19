package com.shanpow.app;

import android.app.Activity;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import com.shanpow.entity.MobileSearchResult;
import org.androidannotations.annotations.*;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.client.RestTemplate;

@EActivity(R.layout.main)
public class MyActivity extends Activity {

    @ViewById
    EditText editText;

    @ViewById
    EditText editTextSearch;

    @ViewById
    Button okButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Click
    void okButtonClicked() {
        okButton.setText("正在搜索");
        okButton.setEnabled(false);
        onSearch(editTextSearch.getText().toString());
    }

    @Background
    void onSearch(String query) {
        String url = "http://www.shanpow.com/mobilesearch?q={query}";

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());

        try {
            MobileSearchResult ret = restTemplate.getForObject(url, MobileSearchResult.class, query);
            showToast(ret.Data.toString());
        } catch (Exception ex) {
            showToast(ex.getMessage());
        }
    }

    @UiThread
    void updateUi(String result) {
        editText.setText(result);

        okButton.setEnabled(true);
        okButton.setText("搜索");
    }

    @UiThread
    void showToast(String msg) {
        Toast.makeText(this, msg, Toast.LENGTH_SHORT).show();
    }
}
