package com.shanpow.app.util;

/**
 * Created by allendang on 14-5-13.
 */
public class PageInfo {
    private int mStartPos;
    private int mLength;
    private int mPageNum;

    public PageInfo(int startPos, int length, int pageNum) {
        this.mLength = length;
        this.mStartPos = startPos;
        this.mPageNum = pageNum;

    }

    public int getStartPos() {
        return mStartPos;
    }

    public int getLength() {
        return mLength;
    }

    public int getPageNum() {
        return mPageNum;
    }

    public void setLength(int mLength) {
        this.mLength = mLength;
    }

    public void setStartPos(int mStartPos) {
        this.mStartPos = mStartPos;
    }
}
