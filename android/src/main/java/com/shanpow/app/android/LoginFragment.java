package com.shanpow.app.android;

import android.app.Activity;
import android.app.Fragment;

import org.androidannotations.annotations.Click;
import org.androidannotations.annotations.EFragment;


/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link LoginFragment.OnLoginListener} interface
 * to handle interaction events.
 */
@EFragment(R.layout.fragment_login)
public class LoginFragment extends Fragment {

    private OnLoginListener mListener;

    @Override
    public void onAttach(Activity activity) {
        super.onAttach(activity);
        try {
            mListener = (OnLoginListener) activity;
        } catch (ClassCastException e) {
            throw new ClassCastException(activity.toString()
                    + " must implement OnFragmentInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    @Click
    void btn_loginClicked() {
        mListener.onLogin();
    }

    /**
     * This interface must be implemented by activities that contain this
     * fragment to allow an interaction in this fragment to be communicated
     * to the activity and potentially other fragments contained in that
     * activity.
     * <p/>
     * See the Android Training lesson <a href=
     * "http://developer.android.com/training/basics/fragments/communicating.html"
     * >Communicating with Other Fragments</a> for more information.
     */
    public interface OnLoginListener {
        public void onLogin();
    }

}
