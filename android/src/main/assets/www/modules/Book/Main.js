/*TMODJS:{"debug":true,"version":11,"md5":"728265842b4f3532c33d37573519b61f"}*/
template("Book/Main", function($data, $id) {
    var $helpers = this, $line = 0, $escape = $helpers.$escape, book = $data.book, usersumOfReading = $data.usersumOfReading, isLogin = $data.isLogin, userBookStatus = $data.userBookStatus, userReview = $data.userReview, userComment = $data.userComment, $string = $helpers.$string, $substring = $helpers.$substring, $each = $helpers.$each, $value = $data.$value, $index = $data.$index, toobjectidstring = $data.toobjectidstring, relatedBooklists = $data.relatedBooklists, $c = $data.$c, $i = $data.$i, $d = $data.$d, $j = $data.$j, booksWithSameAuthor = $data.booksWithSameAuthor, $out = "";
    try {
        $out += '<div class="container" id="';
        $line = 1;
        $out += $escape(book.Id);
        $out += '"> <div class="section row-fluid mainInfo"> <div class="row-fluid"> <div class="span4 bookCover"><div class="wrapper"><img src="';
        $line = 4;
        $out += $escape(book.ImageUrl);
        $out += '" alt=""></div></div> <div class="span8 basicInfo"> <div class="row-fluid"><div class="span5 text-right">作者：</div><div class="badge pull-left">';
        $line = 6;
        $out += $escape(book.Author);
        $out += '</div></div> <div class="row-fluid"><div class="span5 text-right">状态：</div><div class="span7">';
        $line = 7;
        $out += $escape(book.Status);
        $out += '</div></div> <div class="row-fluid"><div class="span5 text-right">字数：</div><div class="span7">';
        $line = 8;
        $out += $escape(book.WordCount);
        $out += '</div></div> <div class="row-fluid"><div class="span5 text-right">类型：</div><div class="badge pull-left">';
        $line = 9;
        $out += $escape(book.Category);
        $out += '</div></div> <div class="row-fluid"><div class="span5 text-right">最近更新：</div><div class="span7 dotdotdotForLongText">';
        $line = 10;
        $out += $escape(book.LastUpdateDate);
        $out += '</div></div> </div> </div> <div class="row-fluid subSection2"> <div class="span6 text-center"> <div class="score">';
        $line = 15;
        if (book.Score) {
            $line = 15;
            $out += $escape(book.Score);
            $line = 15;
        } else {
            $out += "0";
            $line = 15;
        }
        $out += '</div> <div class="ratingStar" data-score="';
        $line = 16;
        $out += $escape(book.Score);
        $out += '"></div> <div class="ratingSum">评分来自';
        $line = 17;
        $out += $escape(book.ScoreSum);
        $out += '书友</div> </div> <div class="span6 text-center"><span>';
        $line = 19;
        $out += $escape(usersumOfReading);
        $out += '</span><span>正在看</span></div> </div> <div class="row-fluid"></div> </div> ';
        $line = 23;
        if (isLogin === true) {
            $out += ' <div class="section row-fluid readStatus"> <div class="row-fluid status"> <div class="span4 text-center statusAction" data-statuscode="wanttoread"> <a href="Book/WriteComment.html?bookid=';
            $line = 27;
            $out += $escape(book.Id);
            $out += "&status=wanttoread&category=";
            $line = 27;
            $out += $escape(book.Category);
            $out += "&bookcover=";
            $line = 27;
            $out += $escape(book.ImageUrl);
            $out += "&isforman=";
            $line = 27;
            $out += $escape(book.ForMan);
            $out += "&booktitle=";
            $line = 27;
            $out += $escape(book.Title);
            $out += '"> <div class="wanttoread"> <img src="public/img/WantToRead';
            $line = 29;
            if (userBookStatus) {
                $line = 29;
                if (userBookStatus.Status === 1) {
                    $out += "_Active";
                    $line = 29;
                }
                $line = 29;
            }
            $out += '.png" alt="" class="pull-left"> <div class="pull-left" id="wanttoread">我想读</div> </div> </a> </div> <div class="span4 text-center statusAction" data-statuscode="read"> <a href="Book/WriteComment.html?bookid=';
            $line = 35;
            $out += $escape(book.Id);
            $out += "&status=read&category=";
            $line = 35;
            $out += $escape(book.Category);
            $out += "&bookcover=";
            $line = 35;
            $out += $escape(book.ImageUrl);
            $out += "&isforman=";
            $line = 35;
            $out += $escape(book.ForMan);
            $out += "&booktitle=";
            $line = 35;
            $out += $escape(book.Title);
            $out += '"> <div class="read"> <img src="public/img/Read';
            $line = 37;
            if (userBookStatus) {
                $line = 37;
                if (userBookStatus.Status === 4) {
                    $out += "_Active";
                    $line = 37;
                }
                $line = 37;
            }
            $out += '.png" alt="" class="pull-left"> <div class="pull-left" id="read">我读过</div> </div> </a> </div> <div class="span4 text-center statusAction" data-statuscode="giveup"> <a href="Book/WriteComment.html?bookid=';
            $line = 43;
            $out += $escape(book.Id);
            $out += "&status=giveup&category=";
            $line = 43;
            $out += $escape(book.Category);
            $out += "&bookcover=";
            $line = 43;
            $out += $escape(book.ImageUrl);
            $out += "&isforman=";
            $line = 43;
            $out += $escape(book.ForMan);
            $out += "&booktitle=";
            $line = 43;
            $out += $escape(book.Title);
            $out += '"> <div class="giveup"> <img src="public/img/GiveUp';
            $line = 45;
            if (userBookStatus) {
                $line = 45;
                if (userBookStatus.Status === 3) {
                    $out += "_Active";
                    $line = 45;
                }
                $line = 45;
            }
            $out += '.png" alt="" class="pull-left"> <div class="pull-left" id="giveup">弃读</div> </div> </a> </div> </div> <div class="row-fluid selfComment ';
            $line = 51;
            if (userBookStatus) {
                $line = 51;
                if (userBookStatus.Status === 2) {
                    $out += "hide";
                    $line = 51;
                }
                $out += " ";
                $line = 51;
                if (userBookStatus.Status === 0) {
                    $out += "hide";
                    $line = 51;
                }
                $line = 51;
            }
            $out += '"> <div class="row-fluid ';
            $line = 52;
            if (userReview) {
                $line = 52;
            } else {
                $line = 52;
                if (userComment) {
                    $line = 52;
                } else {
                    $out += "hide";
                    $line = 52;
                }
                $line = 52;
            }
            $out += '"> <div class="offset';
            $line = 53;
            if (userBookStatus) {
                $line = 53;
                if (userBookStatus.Status === 1) {
                    $out += "1";
                    $line = 53;
                } else {
                    $line = 53;
                    if (userBookStatus.Status === 4) {
                        $out += "5";
                        $line = 53;
                    } else {
                        $line = 53;
                        if (userBookStatus.Status === 3) {
                            $out += "9";
                            $line = 53;
                        }
                        $line = 53;
                    }
                    $line = 53;
                }
                $line = 53;
            }
            $out += ' text-center arrow"></div> </div> <div class="row-fluid"> ';
            $line = 56;
            if (userReview) {
                $out += ' <div class="review row-fluid"> <div class="firstRow row-fluid"> <div class="nickname pull-left">我读过这本书</div> <div class="reviewScore pull-left" data-score="';
                $line = 60;
                $out += $escape(userReview.Score);
                $out += '"></div> <div class="mega pull-right"> <table> <tr> <td> <div class="glyphicons comments">';
                $line = 65;
                $out += $escape(userReview.ResponseSum);
                $out += '</div> </td> <td> <div class="glyphicons thumbs_up">';
                $line = 68;
                $out += $escape(userReview.LikeSum);
                $out += '</div> </td> </tr> </table> </div> </div> <div class="secondRow row-fluid"> <div class="reviewTitle pull-left dotdotdotForLongText">';
                $line = 75;
                $out += $escape(userReview.Title);
                $out += '</div> <div class="pull-right timeStamp">';
                $line = 76;
                $out += $escape(userReview.CreationTime);
                $out += '</div> </div> <div class="content row-fluid">';
                $line = 78;
                $out += $string($substring(userReview.Content, 0, 80));
                $out += "</div> </div> ";
                $line = 80;
            } else {
                $out += " ";
                $line = 81;
                if (userComment) {
                    $out += ' <div class="review row-fluid"> <div class="firstRow row-fluid"> <div class="nickname pull-left">我读过这本书</div> <div class="reviewScore pull-left" data-score="';
                    $line = 85;
                    $out += $escape(userComment.Score);
                    $out += '"></div> <div class="mega pull-right"> <table> <tr> <td> <div class="glyphicons comments">';
                    $line = 90;
                    $out += $escape(userComment.ResponseSum);
                    $out += '</div> </td> <td> <div class="glyphicons thumbs_up">';
                    $line = 93;
                    $out += $escape(userComment.LikeSum);
                    $out += '</div> </td> </tr> </table> </div> </div> <div class="secondRow row-fluid"> <div class="pull-right timeStamp">';
                    $line = 100;
                    $out += $escape(userComment.CreationTime);
                    $out += '</div> </div> <div class="content row-fluid">';
                    $line = 102;
                    $out += $string($substring(userComment.Content, 0, 80));
                    $out += "</div> </div> ";
                    $line = 104;
                }
                $out += " ";
                $line = 105;
            }
            $out += ' </div> </div> <div class="row-fluid action"> <div class="span6 text-center"> <div class="addToBooklist"> <img src="public/img/AddToBooklist.png" alt="" class="pull-left"> <div class="pull-left text-left">加入我的书单</div> </div> </div> <div class="span6 text-center write"> <a href="Book/WriteComment.html?status=read&bookid=';
            $line = 116;
            $out += $escape(book.Id);
            $out += "&category=";
            $line = 116;
            $out += $escape(book.Category);
            $out += "&bookcover=";
            $line = 116;
            $out += $escape(book.ImageUrl);
            $out += "&isforman=";
            $line = 116;
            $out += $escape(book.ForMan);
            $out += "&booktitle=";
            $line = 116;
            $out += $escape(book.Title);
            $out += '"></a> <div class="writeComment"> <img src="public/img/mobile/Pencil.png" alt="" class="pull-left"> <div class="pull-left">写评论</div> </div> </div> <div class="span2"></div> </div> </div> ';
            $line = 125;
        }
        $out += ' <div class="section row-fluid summary"> <div class="row-fluid title">内容简介</div> <div class="row-fluid summaryContent">';
        $line = 128;
        $out += $escape(book.Summary);
        $out += '</div> <div class="expand pull-right"></div> </div> ';
        $line = 131;
        if (book.Comments) {
            $out += ' <div class="section row-fluid comments"> <div class="row-fluid title"> <span>短评（';
            $line = 134;
            $out += $escape(book.CommentSum);
            $out += '）</span> <span class="more pull-right"><a href="Book/MoreComments.html?bookid=';
            $line = 135;
            $out += $escape(book.Id);
            $out += '">更多&nbsp;&nbsp;&nbsp;&nbsp;></a></span> </div> <div class="row-fluid"> ';
            $line = 138;
            $each(book.Comments, function($value, $index) {
                $out += ' <div class="row-fluid comment" id="';
                $line = 139;
                $out += $escape($value.Id);
                $out += '"> <a href="Comment/Detail.html?id=';
                $line = 140;
                $out += $escape($value.Id);
                $out += '"></a> <div class="row-fluid"><div class="author pull-left"><a href="People/Detail.html?nickname=';
                $line = 141;
                $out += $escape($value.Author.Nickname);
                $out += '">';
                $line = 141;
                $out += $escape($value.Author.Nickname);
                $out += '</a></div><div class="cmtScore pull-left" data-score="';
                $line = 141;
                $out += $escape($value.Score);
                $out += '"></div></div> <div class="row-fluid"><div class="content">';
                $line = 142;
                $out += $escape($value.Content);
                $out += '</div></div> <div class="row-fluid mega"> <table class="pull-right"> <tr> <td> <div class="glyphicons comments">';
                $line = 147;
                $out += $escape($value.ResponseSum);
                $out += '</div> </td> <td> <div class="glyphicons thumbs_up">';
                $line = 150;
                $out += $escape($value.LikeSum);
                $out += "</div> </td> </tr> </table> </div> </div> ";
                $line = 156;
            });
            $out += " </div> </div> ";
            $line = 159;
        }
        $out += " ";
        $line = 160;
        if (book.Reviews) {
            $out += ' <div class="section row-fluid reviews"> <div class="row-fluid title"> <span>书评（';
            $line = 163;
            $out += $escape(book.ReviewSum);
            $out += '）</span> <span class="more pull-right"><a href="Book/MoreReviews.html?bookid=';
            $line = 164;
            $out += $escape(book.Id | toobjectidstring);
            $out += '">更多&nbsp;&nbsp;&nbsp;&nbsp;></a></span> </div> <div class="row-fluid"> ';
            $line = 167;
            $each(book.Reviews, function($value, $index) {
                $out += ' <div class="review row-fluid" id="';
                $line = 168;
                $out += $escape($value.Id);
                $out += '"> <a href="Review/Detail.html?id=';
                $line = 169;
                $out += $escape($value.Id);
                $out += '"></a> <div class="megaInfo row-fluid"> <div class="userAvatar pull-left"><a href="People/Detail.html?nickname=';
                $line = 171;
                $out += $escape($value.Author.Nickname);
                $out += '"><img src="';
                $line = 171;
                $out += $escape($value.Author.AvatarUrl);
                $out += '" alt=""></a></div> <div class="otherInfo pull-left"> <div class="firstRow row-fluid"> <div class="nickname pull-left"><a href="People/Detail.html?nickname=';
                $line = 174;
                $out += $escape($value.Author.Nickname);
                $out += '">';
                $line = 174;
                $out += $escape($value.Author.Nickname);
                $out += '</a></div> <div class="reviewScore pull-left" data-score="';
                $line = 175;
                $out += $escape($value.Score);
                $out += '"></div> <div class="mega pull-right"> <table> <tr> <td> <div class="glyphicons comments">';
                $line = 180;
                $out += $escape($value.ResponseSum);
                $out += '</div> </td> <td> <div class="glyphicons thumbs_up">';
                $line = 183;
                $out += $escape($value.LikeSum);
                $out += '</div> </td> </tr> </table> </div> </div> <div class="secondRow row-fluid"> <div class="reviewTitle pull-left dotdotdotForLongText">';
                $line = 190;
                $out += $escape($value.Title);
                $out += '</div> </div> </div> </div> <div class="content row-fluid">';
                $line = 194;
                $out += $string($substring($value.Content, 0, 80));
                $out += "</div> </div> ";
                $line = 196;
            });
            $out += " </div> </div> ";
            $line = 199;
        }
        $out += " ";
        $line = 200;
        if (relatedBooklists) {
            $out += ' <div class="section row-fluid booklists"> <div class="row-fluid title"> <span>收藏这本书的书单</span> </div> <div class="row-fluid"> ';
            $line = 206;
            $each(relatedBooklists, function($c, $i) {
                $out += ' <div class="booklist pull-left span6"> <a href="Booklist/Detail.html?id=';
                $line = 208;
                $out += $escape($c.Id);
                $out += '"></a> <div class="row-fluid booklistTitle"><div class="titleText pull-left">';
                $line = 209;
                $out += $escape($c.Title);
                $out += '</div><div class="pull-right">(';
                $line = 209;
                $out += $escape($c.BookSum);
                $out += ')</div></div> <div class="row-fluid nickname">';
                $line = 210;
                $out += $escape($c.Author.Nickname);
                $out += '</div> <div class="row-fluid"> ';
                $line = 212;
                $each($c.BookCoverUrls, function($d, $j) {
                    $out += " ";
                    $line = 213;
                    if ($j <= 3) {
                        $out += ' <div class="bookCover span3"><div class="wrapper"><img src="';
                        $line = 214;
                        $out += $escape($d);
                        $out += '" alt=""></div></div> ';
                        $line = 215;
                    }
                    $out += " ";
                    $line = 216;
                });
                $out += ' </div> <div class="row-fluid mega"> <div class="span6"><div class="glyphicons comments">';
                $line = 219;
                $out += $escape($c.ResponseSum);
                $out += '</div></div> <div class="span6"><div class="glyphicons heart">';
                $line = 220;
                $out += $escape($c.SubscribeSum);
                $out += "</div></div> </div> </div> ";
                $line = 223;
            });
            $out += " </div> </div> ";
            $line = 226;
        }
        $out += " ";
        $line = 227;
        if (booksWithSameAuthor) {
            $out += ' <div class="section row-fluid booksBySameAuthor"> <div class="row-fluid title"> <span>作者的其他书</span> </div> <div class="row-fluid"> ';
            $line = 233;
            $each(booksWithSameAuthor, function($value, $index) {
                $out += ' <div class="sameBook span3"> <a href="Book/Detail.html?id=';
                $line = 235;
                $out += $escape($value.Id);
                $out += '"> <div class="bookCover"> <div class="wrapper"><img src="';
                $line = 237;
                $out += $escape($value.ImageUrl);
                $out += '" alt=""></div> </div> <div class="bookTitle text-center">';
                $line = 239;
                $out += $escape($value.Title);
                $out += "</div> </a> </div> ";
                $line = 242;
            });
            $out += " </div> </div> ";
            $line = 245;
        }
        $out += " ";
        $line = 246;
        if (book.SimilarBooks) {
            $out += ' <div class="section row-fluid similarBooks"> <div class="row-fluid title"> <span>喜欢这本书的人也喜欢</span> </div> <div class="row-fluid"> ';
            $line = 252;
            $each(book.SimilarBooks, function($c, $i) {
                $out += " ";
                $line = 253;
                if ($i <= 3) {
                    $out += ' <div class="sameBook span3"> <a href="Book/Detail.html?id=';
                    $line = 255;
                    $out += $escape($c.Id);
                    $out += '"> <div class="bookCover"> <div class="wrapper"><img src="';
                    $line = 257;
                    $out += $escape($c.ImageUrl);
                    $out += '" alt=""></div> </div> <div class="bookTitle text-center">';
                    $line = 259;
                    $out += $escape($c.Title);
                    $out += "</div> </a> </div> ";
                    $line = 262;
                }
                $out += " ";
                $line = 263;
            });
            $out += " </div> </div> ";
            $line = 266;
        }
        $out += " </div>";
    } catch (e) {
        throw {
            id: $id,
            name: "Render Error",
            message: e.message,
            line: $line,
            source: '<div class="container" id="{{book.Id}}">\n  <div class="section row-fluid mainInfo">\n    <div class="row-fluid">\n      <div class="span4 bookCover"><div class="wrapper"><img src="{{book.ImageUrl}}" alt=""></div></div>\n      <div class="span8 basicInfo">\n        <div class="row-fluid"><div class="span5 text-right">作者：</div><div class="badge pull-left">{{book.Author}}</div></div>\n        <div class="row-fluid"><div class="span5 text-right">状态：</div><div class="span7">{{book.Status}}</div></div>\n        <div class="row-fluid"><div class="span5 text-right">字数：</div><div class="span7">{{book.WordCount}}</div></div>\n        <div class="row-fluid"><div class="span5 text-right">类型：</div><div class="badge pull-left">{{book.Category}}</div></div>\n        <div class="row-fluid"><div class="span5 text-right">最近更新：</div><div class="span7 dotdotdotForLongText">{{book.LastUpdateDate}}</div></div>\n      </div>\n    </div>\n    <div class="row-fluid subSection2">\n      <div class="span6 text-center">\n        <div class="score">{{if book.Score}}{{book.Score}}{{else}}0{{/if}}</div>\n        <div class="ratingStar" data-score="{{book.Score}}"></div>\n        <div class="ratingSum">评分来自{{book.ScoreSum}}书友</div>\n      </div>\n      <div class="span6 text-center"><span>{{usersumOfReading}}</span><span>正在看</span></div>\n    </div>\n    <div class="row-fluid"></div>\n  </div>\n  {{if isLogin === true}}\n  <div class="section row-fluid readStatus">\n    <div class="row-fluid status">\n      <div class="span4 text-center statusAction" data-statuscode="wanttoread">\n        <a href="Book/WriteComment.html?bookid={{book.Id}}&status=wanttoread&category={{book.Category}}&bookcover={{book.ImageUrl}}&isforman={{book.ForMan}}&booktitle={{book.Title}}">\n          <div class="wanttoread">\n            <img src="public/img/WantToRead{{if userBookStatus}}{{if userBookStatus.Status === 1}}_Active{{/if}}{{/if}}.png" alt="" class="pull-left">\n            <div class="pull-left" id="wanttoread">我想读</div>\n          </div>\n        </a>\n      </div>\n      <div class="span4 text-center statusAction" data-statuscode="read">\n        <a href="Book/WriteComment.html?bookid={{book.Id}}&status=read&category={{book.Category}}&bookcover={{book.ImageUrl}}&isforman={{book.ForMan}}&booktitle={{book.Title}}">\n          <div class="read">\n            <img src="public/img/Read{{if userBookStatus}}{{if userBookStatus.Status === 4}}_Active{{/if}}{{/if}}.png" alt="" class="pull-left">\n            <div class="pull-left" id="read">我读过</div>\n          </div>\n        </a>\n      </div>\n      <div class="span4 text-center statusAction" data-statuscode="giveup">\n        <a href="Book/WriteComment.html?bookid={{book.Id}}&status=giveup&category={{book.Category}}&bookcover={{book.ImageUrl}}&isforman={{book.ForMan}}&booktitle={{book.Title}}">\n          <div class="giveup">\n            <img src="public/img/GiveUp{{if userBookStatus}}{{if userBookStatus.Status === 3}}_Active{{/if}}{{/if}}.png" alt="" class="pull-left">\n            <div class="pull-left" id="giveup">弃读</div>\n          </div>\n        </a>\n      </div>\n    </div>\n    <div class="row-fluid selfComment {{if userBookStatus}}{{if userBookStatus.Status === 2}}hide{{/if}} {{if userBookStatus.Status === 0}}hide{{/if}}{{/if}}">\n      <div class="row-fluid {{if userReview}}{{else}}{{if userComment}}{{else}}hide{{/if}}{{/if}}">\n        <div class="offset{{if userBookStatus}}{{if userBookStatus.Status === 1}}1{{else}}{{if userBookStatus.Status === 4}}5{{else}}{{if userBookStatus.Status === 3}}9{{/if}}{{/if}}{{/if}}{{/if}} text-center arrow"></div>\n      </div>\n      <div class="row-fluid">\n        {{if userReview}}\n        <div class="review row-fluid">\n          <div class="firstRow row-fluid">\n            <div class="nickname pull-left">我读过这本书</div>\n            <div class="reviewScore pull-left" data-score="{{userReview.Score}}"></div>\n            <div class="mega pull-right">\n              <table>\n                <tr>\n                  <td>\n                    <div class="glyphicons comments">{{userReview.ResponseSum}}</div>\n                  </td>\n                  <td>\n                    <div class="glyphicons thumbs_up">{{userReview.LikeSum}}</div>\n                  </td>\n                </tr>\n              </table>\n            </div>\n          </div>\n          <div class="secondRow row-fluid">\n            <div class="reviewTitle pull-left dotdotdotForLongText">{{userReview.Title}}</div>\n            <div class="pull-right timeStamp">{{userReview.CreationTime}}</div>\n          </div>\n          <div class="content row-fluid">{{$substring userReview.Content 0 80}}</div>\n        </div>\n        {{else}}\n        {{if userComment}}\n        <div class="review row-fluid">\n          <div class="firstRow row-fluid">\n            <div class="nickname pull-left">我读过这本书</div>\n            <div class="reviewScore pull-left" data-score="{{userComment.Score}}"></div>\n            <div class="mega pull-right">\n              <table>\n                <tr>\n                  <td>\n                    <div class="glyphicons comments">{{userComment.ResponseSum}}</div>\n                  </td>\n                  <td>\n                    <div class="glyphicons thumbs_up">{{userComment.LikeSum}}</div>\n                  </td>\n                </tr>\n              </table>\n            </div>\n          </div>\n          <div class="secondRow row-fluid">\n            <div class="pull-right timeStamp">{{userComment.CreationTime}}</div>\n          </div>\n          <div class="content row-fluid">{{$substring userComment.Content 0 80}}</div>\n        </div>\n        {{/if}}\n        {{/if}}\n      </div>\n    </div>\n    <div class="row-fluid action">\n      <div class="span6 text-center">\n        <div class="addToBooklist">\n          <img src="public/img/AddToBooklist.png" alt="" class="pull-left">\n          <div class="pull-left text-left">加入我的书单</div>\n        </div>\n      </div>\n      <div class="span6 text-center write">\n        <a href="Book/WriteComment.html?status=read&bookid={{book.Id}}&category={{book.Category}}&bookcover={{book.ImageUrl}}&isforman={{book.ForMan}}&booktitle={{book.Title}}"></a>\n        <div class="writeComment">\n          <img src="public/img/mobile/Pencil.png" alt="" class="pull-left">\n          <div class="pull-left">写评论</div>\n        </div>\n      </div>\n      <div class="span2"></div>\n    </div>\n  </div>\n  {{/if}}\n  <div class="section row-fluid summary">\n    <div class="row-fluid title">内容简介</div>\n    <div class="row-fluid summaryContent">{{book.Summary}}</div>\n    <div class="expand pull-right"></div>\n  </div>\n  {{if book.Comments}}\n  <div class="section row-fluid comments">\n    <div class="row-fluid title">\n      <span>短评（{{book.CommentSum}}）</span>\n      <span class="more pull-right"><a href="Book/MoreComments.html?bookid={{book.Id}}">更多&nbsp;&nbsp;&nbsp;&nbsp;></a></span>\n    </div>\n    <div class="row-fluid">\n      {{each book.Comments}}\n      <div class="row-fluid comment" id="{{$value.Id}}">\n        <a href="Comment/Detail.html?id={{$value.Id}}"></a>\n        <div class="row-fluid"><div class="author pull-left"><a href="People/Detail.html?nickname={{$value.Author.Nickname}}">{{$value.Author.Nickname}}</a></div><div class="cmtScore pull-left" data-score="{{$value.Score}}"></div></div>\n        <div class="row-fluid"><div class="content">{{$value.Content}}</div></div>\n        <div class="row-fluid mega">\n          <table class="pull-right">\n            <tr>\n              <td>\n                <div class="glyphicons comments">{{$value.ResponseSum}}</div>\n              </td>\n              <td>\n                <div class="glyphicons thumbs_up">{{$value.LikeSum}}</div>\n              </td>\n            </tr>\n          </table>\n        </div>\n      </div>\n      {{/each}}\n    </div>\n  </div>\n  {{/if}}\n  {{if book.Reviews}}\n  <div class="section row-fluid reviews">\n    <div class="row-fluid title">\n      <span>书评（{{book.ReviewSum}}）</span>\n      <span class="more pull-right"><a href="Book/MoreReviews.html?bookid={{book.Id | toobjectidstring}}">更多&nbsp;&nbsp;&nbsp;&nbsp;></a></span>\n    </div>\n    <div class="row-fluid">\n      {{each book.Reviews}}\n      <div class="review row-fluid" id="{{$value.Id}}">\n        <a href="Review/Detail.html?id={{$value.Id}}"></a>\n        <div class="megaInfo row-fluid">\n          <div class="userAvatar pull-left"><a href="People/Detail.html?nickname={{$value.Author.Nickname}}"><img src="{{$value.Author.AvatarUrl}}" alt=""></a></div>\n          <div class="otherInfo pull-left">\n            <div class="firstRow row-fluid">\n              <div class="nickname pull-left"><a href="People/Detail.html?nickname={{$value.Author.Nickname}}">{{$value.Author.Nickname}}</a></div>\n              <div class="reviewScore pull-left" data-score="{{$value.Score}}"></div>\n              <div class="mega pull-right">\n                <table>\n                  <tr>\n                    <td>\n                      <div class="glyphicons comments">{{$value.ResponseSum}}</div>\n                    </td>\n                    <td>\n                      <div class="glyphicons thumbs_up">{{$value.LikeSum}}</div>\n                    </td>\n                  </tr>\n                </table>\n              </div>\n            </div>\n            <div class="secondRow row-fluid">\n              <div class="reviewTitle pull-left dotdotdotForLongText">{{$value.Title}}</div>\n            </div>\n          </div>\n        </div>\n        <div class="content row-fluid">{{$substring $value.Content 0 80}}</div>\n      </div>\n      {{/each}}\n    </div>\n  </div>\n  {{/if}}\n  {{if relatedBooklists}}\n  <div class="section row-fluid booklists">\n    <div class="row-fluid title">\n      <span>收藏这本书的书单</span>\n    </div>\n    <div class="row-fluid">\n      {{each relatedBooklists as $c $i}}\n      <div class="booklist pull-left span6">\n        <a href="Booklist/Detail.html?id={{$c.Id}}"></a>\n        <div class="row-fluid booklistTitle"><div class="titleText pull-left">{{$c.Title}}</div><div class="pull-right">({{$c.BookSum}})</div></div>\n        <div class="row-fluid nickname">{{$c.Author.Nickname}}</div>\n        <div class="row-fluid">\n          {{each $c.BookCoverUrls as $d $j}}\n          {{if $j <= 3}}\n          <div class="bookCover span3"><div class="wrapper"><img src="{{$d}}" alt=""></div></div>\n          {{/if}}\n          {{/each}}\n        </div>\n        <div class="row-fluid mega">\n          <div class="span6"><div class="glyphicons comments">{{$c.ResponseSum}}</div></div>\n          <div class="span6"><div class="glyphicons heart">{{$c.SubscribeSum}}</div></div>\n        </div>\n      </div>\n      {{/each}}\n    </div>\n  </div>\n  {{/if}}\n  {{if booksWithSameAuthor}}\n  <div class="section row-fluid booksBySameAuthor">\n    <div class="row-fluid title">\n      <span>作者的其他书</span>\n    </div>\n    <div class="row-fluid">\n      {{each booksWithSameAuthor}}\n      <div class="sameBook span3">\n        <a href="Book/Detail.html?id={{$value.Id}}">\n          <div class="bookCover">\n            <div class="wrapper"><img src="{{$value.ImageUrl}}" alt=""></div>\n          </div>\n          <div class="bookTitle text-center">{{$value.Title}}</div>\n        </a>\n      </div>\n      {{/each}}\n    </div>\n  </div>\n  {{/if}}\n  {{if book.SimilarBooks}}\n  <div class="section row-fluid similarBooks">\n    <div class="row-fluid title">\n      <span>喜欢这本书的人也喜欢</span>\n    </div>\n    <div class="row-fluid">\n      {{each book.SimilarBooks as $c $i}}\n      {{if $i <= 3}}\n      <div class="sameBook span3">\n        <a href="Book/Detail.html?id={{$c.Id}}">\n          <div class="bookCover">\n            <div class="wrapper"><img src="{{$c.ImageUrl}}" alt=""></div>\n          </div>\n          <div class="bookTitle text-center">{{$c.Title}}</div>\n        </a>\n      </div>\n      {{/if}}\n      {{/each}}\n    </div>\n  </div>\n  {{/if}}\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
        };
    }
    return new String($out);
});