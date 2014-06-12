package com.shanpow.app.android;

import android.app.Activity;
import android.content.Context;
import android.support.v4.app.Fragment;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AbsListView;
import android.widget.ListView;
import android.widget.Toast;

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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import uk.co.senab.actionbarpulltorefresh.extras.actionbarcompat.PullToRefreshLayout;
import uk.co.senab.actionbarpulltorefresh.library.ActionBarPullToRefresh;
import uk.co.senab.actionbarpulltorefresh.library.listeners.OnRefreshListener;


/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link ArticleListFragment.OnArticleSelectedListener} interface
 * to handle interaction events.
 */
@EFragment(R.layout.fragment_article_list)
public class ArticleListFragment extends Fragment
        implements AbsListView.OnScrollListener, OnRefreshListener {

    private OnArticleSelectedListener mListener;

    private String mTag;

    private int currentPageNum = 1;

    private int totalPageNum;

    private ArticleListAdapter mAdapter;

    private View mFooter;

    @RestService
    ShanpowRestClient shanpowClient;

    @ViewById
    ListView lv_articles;

    PullToRefreshLayout mPullToRefreshLayout;

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
        ViewGroup viewGroup = (ViewGroup) getView();
        mPullToRefreshLayout = new PullToRefreshLayout(viewGroup.getContext());

        ActionBarPullToRefresh.from(getActivity())
                .insertLayoutInto(viewGroup)
                .theseChildrenArePullable(lv_articles, lv_articles.getEmptyView())
                .listener(this)
                .setup(mPullToRefreshLayout);

        mFooter = ((LayoutInflater) this.getActivity()
                .getSystemService(Context.LAYOUT_INFLATER_SERVICE))
                .inflate(R.layout.view_loading, lv_articles, false);

        lv_articles.setOnScrollListener(this);

        loadData();
    }

    @Background
    void loadData() {
        currentPageNum = 1;
        try {
            GetArticleListResult result = shanpowClient.GetArticlesByTag(mTag, currentPageNum, 10);
            if (result != null && result.Result && result.Data.Articles.length > 0) {
                totalPageNum = result.Data.PageSum;
                fillData(result.Data.Articles);
            } else {
                showNetworkErrorToast();
            }
        } catch (Exception e) {
            showNetworkErrorToast();
            e.printStackTrace();
        }
    }

    @Background
    void loadMoreData() {
        currentPageNum += 1;
        try {
            GetArticleListResult result = shanpowClient.GetArticlesByTag(mTag, currentPageNum, 10);
            if (result != null && result.Result && result.Data.Articles.length > 0) {
                fillMoreData(result.Data.Articles);
            } else {
                showNetworkErrorToast();
            }
        } catch (Exception e) {
            //读取失败把currentPageNum复原
            currentPageNum -= 1;
            showNetworkErrorToast();
            e.printStackTrace();
        }
    }

    @UiThread
    void showNetworkErrorToast() {
        Toast toast = Toast.makeText(this.getActivity(), R.string.err_network_failed, Toast.LENGTH_SHORT);
        toast.setGravity(Gravity.CENTER, 0, 0);
        toast.show();
    }

    @UiThread
    void fillData(SimpleArticleInfo[] articles) {
        //判断是否需要添加loading footer
        if (currentPageNum < totalPageNum) {
            lv_articles.addFooterView(mFooter);
        }

        if (lv_articles.getAdapter() == null) {
            //加载adapter
            List<SimpleArticleInfo> list = new ArrayList<SimpleArticleInfo>(Arrays.asList(articles));
            mAdapter = new ArticleListAdapter(
                    this.getActivity().getApplicationContext(), list);
            lv_articles.setAdapter(mAdapter);
        } else {
            mAdapter.clear();
            for (SimpleArticleInfo info : articles) {
                mAdapter.add(info);
            }
            mAdapter.notifyDataSetChanged();
        }
    }

    @UiThread
    void fillMoreData(SimpleArticleInfo[] moreArticles) {
        for (SimpleArticleInfo info : moreArticles) {
            mAdapter.add(info);
        }
        mAdapter.notifyDataSetChanged();
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

    @Override
    public void onScrollStateChanged(AbsListView view, int scrollState) {

    }

    @Override
    public void onScroll(AbsListView view, int firstVisibleItem, int visibleItemCount, int totalItemCount) {
        if (view.getAdapter() != null && firstVisibleItem + visibleItemCount >= totalItemCount) {
            if (currentPageNum < totalPageNum) {
                loadMoreData();
            } else {
                //移除loading footer
                lv_articles.removeFooterView(mFooter);
            }
        }
    }

    @Override
    public void onRefreshStarted(View view) {
        loadData();
    }

    public interface OnArticleSelectedListener {
        // TODO: Update argument type and name
        public void onArticleSelected(String articleId);
    }

}
