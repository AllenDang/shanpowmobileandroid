package com.shanpow.app.util;

import org.androidannotations.annotations.sharedpreferences.DefaultString;
import org.androidannotations.annotations.sharedpreferences.SharedPref;

/**
 * Created by allendang on 14-3-25.
 */
@SharedPref(value = SharedPref.Scope.UNIQUE)
public interface AppPref {
    @DefaultString("")
    String csrfToken();

    @DefaultString("")
    String currentUserInJsonFormat();
}
