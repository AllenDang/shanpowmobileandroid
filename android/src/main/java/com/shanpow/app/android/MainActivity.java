package com.shanpow.app.android;

import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.actionbarsherlock.app.SherlockActivity;
import com.shanpow.app.entity.GetCsrfTokenResult;
import com.shanpow.app.service.ShanpowRestClient;

import org.androidannotations.annotations.Background;
import org.androidannotations.annotations.Click;
import org.androidannotations.annotations.EActivity;
import org.androidannotations.annotations.OptionsItem;
import org.androidannotations.annotations.OptionsMenu;
import org.androidannotations.annotations.rest.RestService;

@EActivity
@OptionsMenu(R.menu.main)
public class MainActivity extends SherlockActivity {

    @RestService
    ShanpowRestClient restClient;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    @OptionsItem(R.id.action_settings)
    void settingsClicked() {
        Toast.makeText(this, "Settings", Toast.LENGTH_SHORT).show();
    }

    @Click
    void btn_main_newClicked() {
        doNetworkJob();
    }

    @Background
    void doNetworkJob() {
        try {
            GetCsrfTokenResult result = restClient.GetCsrfToken();
            Log.d("DEBUG", result.Data);
        } catch (Exception e) {
            Log.d("DEBUG", e.getMessage());
        }
    }
}
