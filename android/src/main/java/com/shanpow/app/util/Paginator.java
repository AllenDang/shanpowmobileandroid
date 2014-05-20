package com.shanpow.app.util;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Typeface;
import android.text.Layout;
import android.text.StaticLayout;
import android.text.TextPaint;

import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.io.UnsupportedEncodingException;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;
import java.util.Vector;

/**
 * Created by allendang on 14-5-7.
 */
public class Paginator {
    private MappedByteBuffer mBuf = null;
    private long mContentLength = 0;
    private int mBufEnd = 0;
    private String mCharset;
    private int mLineSpace;
    private int mWidth;
    private int mHeight;
    private int mVisibleWidth;
    private int mVisibleHeight;
    private int mCurrentPageNum = 0;
    private int mTotalPageNum;
    private int mFontSize;
    private TextPaint mPaint;
    private Vector<PageInfo> mPages;
    private static final int mMargin = 16;

    public Paginator(Typeface font, int fontSize, int lineSpace, int w, int h) {
        mWidth = w;
        mHeight = h;
        mVisibleWidth = w - mMargin * 2;
        mVisibleHeight = h - mMargin * 4;

        mPaint = new TextPaint(Paint.ANTI_ALIAS_FLAG);
        mPaint.setTextAlign(Paint.Align.LEFT);
        mPaint.setTypeface(font);
        mPaint.setTextSize(fontSize);
        mPaint.setColor(Color.BLACK);

        mLineSpace = lineSpace;
        mFontSize = fontSize;

        mPages = new Vector<PageInfo>();
    }

    private byte[] readLineForward(int nFromPos) {
        int i = nFromPos;
        byte b0, b1;
        // 根据编码格式判断换行
        if (mCharset.equals("UTF-16LE")) {
            while (i < mContentLength - 1) {
                b0 = mBuf.get(i++);
                b1 = mBuf.get(i++);
                if (b0 == 0x0a && b1 == 0x00) {
                    break;
                }
            }
        } else if (mCharset.equals("UTF-16BE")) {
            while (i < mContentLength - 1) {
                b0 = mBuf.get(i++);
                b1 = mBuf.get(i++);
                if (b0 == 0x00 && b1 == 0x0a) {
                    break;
                }
            }
        } else {
            while (i < mContentLength) {
                b0 = mBuf.get(i++);
                if (b0 == 0x0a) {
                    break;
                }
            }
        }
        int nParaSize = i - nFromPos;
        byte[] buf = new byte[nParaSize];
        for (i = 0; i < nParaSize; i++) {
            buf[i] = mBuf.get(nFromPos + i);
        }
        return buf;
    }

    private String readOnePage(PageInfo pi) {
        byte[] buf = new byte[pi.getLength()];
        mBuf.position(pi.getStartPos());
        mBuf.get(buf);
        String content = "";
        try {
            content = new String(buf, mCharset);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return content;
    }

    private Bitmap render(PageInfo pi) {
        Bitmap bmp = Bitmap.createBitmap(mWidth, mHeight, Bitmap.Config.ARGB_4444);
        Canvas c = new Canvas(bmp);
        String content = readOnePage(pi);
        StaticLayout sl = new StaticLayout(
                content, mPaint, mVisibleWidth, Layout.Alignment.ALIGN_NORMAL,
                1, mLineSpace, false);
        c.translate(mMargin, mMargin);
        sl.draw(c);
        return bmp;
    }

    //获取下一页的内容，如果已经到文件尾，返回null
    private String getNextPage() {
        StringBuffer content = new StringBuffer();

        if (mBufEnd >= mContentLength) {
            return content.toString();
        }

        //预读5行
        for (int i = 0; i < 5 && mBufEnd < mContentLength; i++) {
            byte[] buf = readLineForward(mBufEnd);
            mBufEnd += buf.length;
            try {
                String s = new String(buf, mCharset);
                content.append(s);
            } catch (UnsupportedEncodingException e) {
                //TODO: handle error here
                e.printStackTrace();
            }
        }

        StaticLayout sl = new StaticLayout(
                content, mPaint, mVisibleWidth, Layout.Alignment.ALIGN_NORMAL,
                1.0f, mLineSpace, false);

        //如果最后一行还没超过可见高度的边缘，再读5行数据
        while (sl.getHeight() < mVisibleHeight && mBufEnd < mContentLength) {
            for (int i = 0; i < 5 && mBufEnd < mContentLength; i++) {
                byte[] buf = readLineForward(mBufEnd);
                mBufEnd += buf.length;
                try {
                    String s = new String(buf, mCharset);
                    content.append(s);
                } catch (UnsupportedEncodingException e) {
                    //TODO: handle error here
                    e.printStackTrace();
                }
            }
            //重新测量
            sl = new StaticLayout(
                    content, mPaint, mVisibleWidth, Layout.Alignment.ALIGN_NORMAL,
                    1.0f, mLineSpace, false);
        }

        //如果最后一行已经超过屏幕边缘
        if (sl.getHeight() > mVisibleHeight) {
            int lineBreakPos = sl.getLineEnd(sl.getLineForVertical(mVisibleHeight));
            //把mBufEnd设置到分页的位置
            try {
                mBufEnd -= content.toString().substring(lineBreakPos).getBytes(mCharset).length;
            } catch (UnsupportedEncodingException e) {
                //TODO: handle error here
                e.printStackTrace();
            }
            content = content.delete(lineBreakPos, content.length());
        }

        return content.toString();
    }

    private PageInfo findPageByStartPos(int startPos) {
        //找到符合之前分页位置的新页面信息
        for (PageInfo pi : mPages) {
            if (pi.getStartPos() <= startPos && (pi.getStartPos() + pi.getLength()) > startPos) {
                return pi;
            }
        }

        return null;
    }

    private Bitmap renderCurrentPageAfterFontSizeChange() {
        mPaint.setTextSize(mFontSize);

        //保存当前页面信息
        PageInfo currentPageInfo = mPages.get(mCurrentPageNum - 1);

        Bitmap bmp = null;

        //重新计算分页信息
        calcPageNum();

        //寻找之前分页的位置
        PageInfo pi = findPageByStartPos(currentPageInfo.getStartPos());
        if (pi != null) {
            mCurrentPageNum = pi.getPageNum();
            bmp = render(pi);
        }

        return bmp;
    }

    public Bitmap increaseFontSize() {
        mFontSize += 4;
        return renderCurrentPageAfterFontSizeChange();
    }

    public Bitmap decreaseFontSize() {
        mFontSize -= 4;
        return renderCurrentPageAfterFontSizeChange();
    }

    public Bitmap increaseLineSpace() {
        mLineSpace += 4;
        return renderCurrentPageAfterFontSizeChange();
    }

    public Bitmap decreaseLineSpace() {
        mLineSpace -= 4;
        return renderCurrentPageAfterFontSizeChange();
    }

    public int getCurrentPageNum() {
        return mCurrentPageNum;
    }

    public int getTotalPageNum() {
        return mTotalPageNum;
    }

    public void openFile(String strFilePath, String charset) throws IOException {
        File book_file = new File(strFilePath);
        mCharset = charset;
        mContentLength = book_file.length();
        mBuf = new RandomAccessFile(book_file, "r").getChannel().map(
                FileChannel.MapMode.READ_ONLY, 0, mContentLength);
        mPages.clear();
        mTotalPageNum = 0;
        mCurrentPageNum = 0;
        mBufEnd = 0;
    }

    public int calcPageNum() {
        mBufEnd = 0;
        int i = 1;
        mPages.clear();
        while (mBufEnd < mContentLength) {
            int currentPos = mBufEnd;
            getNextPage();
            PageInfo pi = new PageInfo(currentPos, mBufEnd - currentPos, i++);
            mPages.add(pi);
        }
        mTotalPageNum = mPages.size();
        return mTotalPageNum;
    }

    public Bitmap nextPage() {
        Bitmap bmp = null;

        if (mCurrentPageNum < mTotalPageNum) {
            mCurrentPageNum += 1;
            bmp = jumpToPage(mCurrentPageNum);
        }
        return bmp;
    }

    public Bitmap previousPage() {
        Bitmap bmp = null;
        if (mCurrentPageNum > 1) {
            mCurrentPageNum -= 1;
            bmp = jumpToPage(mCurrentPageNum);
        }
        return bmp;
    }

    //pageNum的第一页是1
    public Bitmap jumpToPage(int pageNum) {
        Bitmap bmp = null;
        if (pageNum > 0 && pageNum <= mPages.size()) {
            PageInfo pi = mPages.get(pageNum - 1);
            bmp = render(pi);
        }

        return bmp;
    }
}
