package com.shanpow.app.android;

import android.app.Activity;
import android.support.v4.app.Fragment;
import android.widget.ListView;

import com.shanpow.app.entity.GetArticleListResult;
import com.shanpow.app.entity.SimpleArticleInfo;
import com.shanpow.app.service.ShanpowRestClient;
import com.shanpow.app.util.ArticleListAdapter;

import org.androidannotations.annotations.AfterViews;
import org.androidannotations.annotations.Background;
import org.androidannotations.annotations.EFragment;
import org.androidannotations.annotations.UiThread;
import org.androidannotations.annotations.ViewById;
import org.androidannotations.annotations.rest.RestService;


/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link ArticleListFragment.OnArticleSelectedListener} interface
 * to handle interaction events.
 */
@EFragment(R.layout.fragment_article_list)
public class ArticleListFragment extends Fragment {

    private OnArticleSelectedListener mListener;

    private String mTag;

    @RestService
    ShanpowRestClient shanpowClient;

    @ViewById
    ListView lv_articles;

    public static ArticleListFragment newInstance(String tag) {
        ArticleListFragment_ fragment = new ArticleListFragment_();
        fragment.setTag(tag);
        return fragment;
    }

    protected void setTag(String tag) {
        mTag = tag;
    }

    @AfterViews
    void init() {
        getArticleList(mTag);
    }

    @Background
    void getArticleList(String tag) {
        try {
            GetArticleListResult result = shanpowClient.GetArticlesByTag(tag, 1, 10);
            if (result != null && result.Result && result.Data.Articles.length > 0) {
                fillData(result.Data.Articles);
            } else {
                //TODO: show error here.
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @UiThread
    void fillData(SimpleArticleInfo[] articles) {
        ArticleListAdapter adapter = new ArticleListAdapter(
                this.getActivity().getApplicationContext(), articles);
        lv_articles.setAdapter(adapter);
    }

    @Override
    public void onAttach(Activity activity) {
        super.onAttach(activity);
        try {
            mListener = (OnArticleSelectedListener) activity;
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

    public interface OnArticleSelectedListener {
        // TODO: Update argument type and name
        public void onArticleSelected(String articleId);
    }

}
