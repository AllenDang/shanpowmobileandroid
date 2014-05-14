/*TMODJS:{"debug":true,"build":1400041119435}*/
!function(global) {
    "use strict";
    var template = function(uri, content) {
        return template[/string|function/.test(typeof content) ? "compile" : "render"].apply(template, arguments);
    };
    var cache = template.cache = {};
    var toString = function(value, type) {
        if (typeof value !== "string") {
            type = typeof value;
            if (type === "number") {
                value += "";
            } else if (type === "function") {
                value = toString(value.call(value));
            } else {
                value = "";
            }
        }
        return value;
    };
    var escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    };
    var escapeHTML = function(content) {
        return toString(content).replace(/&(?![\w#]+;)|[<>"']/g, function(s) {
            return escapeMap[s];
        });
    };
    var isArray = Array.isArray || function(obj) {
        return {}.toString.call(obj) === "[object Array]";
    };
    var each = function(data, callback) {
        if (isArray(data)) {
            for (var i = 0, len = data.length; i < len; i++) {
                callback.call(data, data[i], i, data);
            }
        } else {
            for (i in data) {
                callback.call(data, data[i], i);
            }
        }
    };
    var resolve = function(from, to) {
        var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/;
        var dirname = from.replace(/^([^.])/, "./$1").replace(/[^/]+$/, "");
        var id = dirname + to;
        id = id.replace(/\/\.\//g, "/");
        while (id.match(DOUBLE_DOT_RE)) {
            id = id.replace(DOUBLE_DOT_RE, "/");
        }
        return id;
    };
    var helpers = template.helpers = {
        $include: function(uri, data, from) {
            var id = resolve(from, uri);
            return template.render(id, data);
        },
        $string: toString,
        $escape: escapeHTML,
        $each: each
    };
    var debug = function(e) {
        var message = "";
        for (var name in e) {
            message += "<" + name + ">\n" + e[name] + "\n\n";
        }
        if (message && global.console) {
            console.error("Template Error\n\n" + message);
        }
        return function() {
            return "{Template Error}";
        };
    };
    template.render = function(uri, data) {
        var fn = template.get(uri) || debug({
            id: uri,
            name: "Render Error",
            message: "No Template"
        });
        return data ? fn(data) : fn;
    };
    template.compile = function(uri, fn) {
        var isFunction = typeof fn === "function";
        var render = cache[uri] = function(data) {
            try {
                return isFunction ? new fn(data, uri) + "" : fn;
            } catch (e) {
                return debug(e)();
            }
        };
        render.prototype = helpers;
        if (isFunction) {
            fn.prototype = helpers;
        }
        render.toString = function() {
            return fn + "";
        };
        return render;
    };
    template.get = function(id) {
        return cache[id.replace(/^\.\//, "")];
    };
    template.helper = function(name, helper) {
        helpers[name] = helper;
    };
    template.helper("Math", Math);
    template.helper("$substring", function(string, index, length) {
        if ((string ? string.length : 0) > length + index) {
            return string.substring(index, length) + "...";
        }
        return string;
    });
    template.helper("$add", function() {
        var result = 0;
        for (var i = arguments.length - 1; i >= 0; i--) {
            result += arguments[i] || 0;
        }
        return result;
    });
    template.helper("$len", function(collection) {
        return collection.length;
    });
    template.helper("$array", function(size) {
        return new Array(size);
    });
    template.helper("$sub", function(x, y) {
        return x - y;
    });
    template("Article/Detail", function($data, $id) {
        var $helpers = this, $line = 0, $escape = $helpers.$escape, article = $data.article, $string = $helpers.$string, relatedBooks = $data.relatedBooks, $each = $helpers.$each, $value = $data.$value, $index = $data.$index, $out = "";
        try {
            $out += '<div class="container" data-reviewid="';
            $line = 1;
            $out += $escape(article.Id);
            $out += '"> <div class="row-fluid title">';
            $line = 2;
            $out += $escape(article.Title);
            $out += '</div> <div class="info row-fluid"> <div class="user pull-left" id="';
            $line = 4;
            $out += $escape(article.Author.Id);
            $out += '"> <a href="../People/Detail.html?nickname=';
            $line = 5;
            $out += $escape(article.Author.Nickname);
            $out += '"> <div class="avatar pull-left"><img src="';
            $line = 6;
            $out += $escape(article.Author.AvatarUrl);
            $out += '" alt="" class="img-circle"></div> <div class="nickname pull-left">';
            $line = 7;
            $out += $escape(article.Author.Nickname);
            $out += '</div> </a> </div> </div> <div class="content">';
            $line = 11;
            $out += $string(article.Content);
            $out += "</div> ";
            $line = 12;
            if (relatedBooks) {
                $out += ' <div class="section row-fluid similarBooks"> <div class="row-fluid title"> <span>相关书籍</span> </div> <div class="row-fluid"> ';
                $line = 18;
                $each(relatedBooks, function($value, $index) {
                    $out += ' <div class="book span3"> <a href="../Book/Detail.html?id=';
                    $line = 20;
                    $out += $escape($value.Id);
                    $out += '"> <div class="bookCover"> <div class="wrapper"><img src="';
                    $line = 22;
                    $out += $escape($value.ImageUrl);
                    $out += '" alt=""></div> </div> <div class="bookTitle text-center">';
                    $line = 24;
                    $out += $escape($value.Title);
                    $out += "</div> </a> </div> ";
                    $line = 27;
                });
                $out += " </div> </div> ";
                $line = 30;
            }
            $out += ' </div> <div class="row-fluid mega"> <table class="pull-right"> <tr> <td class="response"> <a href="Response.html?id=';
            $line = 36;
            $out += $escape(article.Id);
            $out += '"> <span class="glyphicons comments">';
            $line = 37;
            $out += $escape(article.ResponseSum);
            $out += '</span> </a> </td> <td class="viewcount"> <div><span class="glyphicons eye_open">';
            $line = 41;
            $out += $escape(article.ViewCount);
            $out += "</span></div> </td> </tr> </table> </div>";
        } catch (e) {
            throw {
                id: $id,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="container" data-reviewid="{{article.Id}}">\n  <div class="row-fluid title">{{article.Title}}</div>\n  <div class="info row-fluid">\n    <div class="user pull-left" id="{{article.Author.Id}}">\n      <a href="../People/Detail.html?nickname={{article.Author.Nickname}}">\n        <div class="avatar pull-left"><img src="{{article.Author.AvatarUrl}}" alt="" class="img-circle"></div>\n        <div class="nickname pull-left">{{article.Author.Nickname}}</div>\n      </a>\n    </div>\n  </div>\n  <div class="content">{{#article.Content}}</div>\n  {{if relatedBooks}}\n  <div class="section row-fluid similarBooks">\n    <div class="row-fluid title">\n      <span>相关书籍</span>\n    </div>\n    <div class="row-fluid">\n      {{each relatedBooks}}\n      <div class="book span3">\n        <a href="../Book/Detail.html?id={{$value.Id}}">\n          <div class="bookCover">\n            <div class="wrapper"><img src="{{$value.ImageUrl}}" alt=""></div>\n          </div>\n          <div class="bookTitle text-center">{{$value.Title}}</div>\n        </a>\n      </div>\n      {{/each}}\n    </div>\n  </div>\n  {{/if}}\n</div>\n<div class="row-fluid mega">\n  <table class="pull-right">\n    <tr>\n      <td class="response">\n        <a href="Response.html?id={{article.Id}}">\n          <span class="glyphicons comments">{{article.ResponseSum}}</span>\n        </a>\n      </td>\n      <td class="viewcount">\n        <div><span class="glyphicons eye_open">{{article.ViewCount}}</span></div>\n      </td>\n    </tr>\n  </table>\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
        return new String($out);
    });
    template("Billboard/Detail", function($data, $id) {
        var $helpers = this, $line = 0, $escape = $helpers.$escape, CreationTime = $data.CreationTime, NextVersionPlan = $data.NextVersionPlan, $each = $helpers.$each, Books = $data.Books, $value = $data.$value, $index = $data.$index, include = function(id, data) {
            data = data || $data;
            var $text = $helpers.$include(id, data, $id);
            $out += $text;
            return $text;
        }, ViewCount = $data.ViewCount, LikeSum = $data.LikeSum, $out = "";
        try {
            $out += '<div class="container"> <div class="row-fluid text-center">本期发布于';
            $line = 2;
            $out += $escape(CreationTime);
            $out += "</div> ";
            $line = 3;
            if (NextVersionPlan > 0) {
                $out += ' <div class="desc row-fluid text-center">距离下期发布还有';
                $line = 4;
                $out += $escape(NextVersionPlan);
                $out += "天</div> ";
                $line = 5;
            }
            $out += ' <hr> <div class="listDetail tab-pane active" id="allbooks"> <ul class="unstyled"> ';
            $line = 9;
            $each(Books, function($value, $index) {
                $out += " ";
                $line = 10;
                include("../public/BookWithComment", $value);
                $out += " ";
                $line = 11;
            });
            $out += ' </ul> </div> </div> <div class="mega"> <table> <tr> <td class="span6"> <div class="glyphicons eye_open">';
            $line = 19;
            $out += $escape(ViewCount);
            $out += '</div> </td> <td class="span6"> <div class="glyphicons heart">';
            $line = 22;
            $out += $escape(LikeSum);
            $out += "</div> </td> </tr> </table> </div>";
        } catch (e) {
            throw {
                id: $id,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="container">\n  <div class="row-fluid text-center">本期发布于{{CreationTime}}</div>\n  {{if NextVersionPlan > 0}}\n  <div class="desc row-fluid text-center">距离下期发布还有{{NextVersionPlan}}天</div>\n  {{/if}}\n  <hr>\n  <div class="listDetail tab-pane active" id="allbooks">\n    <ul class="unstyled">\n      {{each Books}}\n      {{include "../public/BookWithComment" $value}}\n      {{/each}}\n    </ul>\n  </div>\n</div>\n<div class="mega">\n  <table>\n    <tr>\n      <td class="span6">\n        <div class="glyphicons eye_open">{{ViewCount}}</div>\n      </td>\n      <td class="span6">\n        <div class="glyphicons heart">{{LikeSum}}</div>\n      </td>\n    </tr>\n  </table>\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
        return new String($out);
    });
    template("Billboard/Index", function($data, $id) {
        var $helpers = this, $line = 0, $each = $helpers.$each, Data = $data.Data, $c = $data.$c, $i = $data.$i, $escape = $helpers.$escape, $d = $data.$d, $j = $data.$j, $string = $helpers.$string, $sub = $helpers.$sub, $out = "";
        try {
            $out += '<div class="container"> ';
            $line = 2;
            $each(Data, function($c, $i) {
                $out += ' <div class="row-fluid billboard"> <a href="Detail.html?title=';
                $line = 4;
                $out += $escape($c.Title);
                $out += "&version=";
                $line = 4;
                $out += $escape($c.Version);
                $out += '"> <div class="row-fluid info"> <div class="span4"><img src="';
                $line = 6;
                $out += $escape($c.ImageUrl);
                $out += '" alt=""></div> <div class="span8"> <div class="row-fluid"><h4>';
                $line = 8;
                $out += $escape($c.Title);
                $out += '</h4></div> <div class="row-fluid">更新于';
                $line = 9;
                $out += $escape($c.CreationTime);
                $out += '</div> <div class="row-fluid description">';
                $line = 10;
                $out += $escape($c.Description);
                $out += '</div> </div> </div> </a> <div class="row-fluid versions"> ';
                $line = 15;
                $each($c.array, function($d, $j) {
                    $out += ' <div class="ver pull-left text-center"><a href="Detail.html?title=';
                    $line = 16;
                    $out += $escape($c.Title);
                    $out += "&version=";
                    $line = 16;
                    $out += $string($sub($c.Version, $j));
                    $out += '">';
                    $line = 16;
                    $out += $string($sub($c.Version, $j));
                    $out += "</a></div> ";
                    $line = 17;
                });
                $out += ' <div class="ver pull-left text-center more ';
                $line = 18;
                if ($c.Version <= 5) {
                    $out += "hide";
                    $line = 18;
                }
                $out += '">更多<span class="halflings chevron-down"></span></div> </div> <hr> </div> ';
                $line = 22;
            });
            $out += " </div>";
        } catch (e) {
            throw {
                id: $id,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="container">\n  {{each Data as $c $i}}\n  <div class="row-fluid billboard">\n    <a href="Detail.html?title={{$c.Title}}&version={{$c.Version}}">\n      <div class="row-fluid info">\n        <div class="span4"><img src="{{$c.ImageUrl}}" alt=""></div>\n        <div class="span8">\n          <div class="row-fluid"><h4>{{$c.Title}}</h4></div>\n          <div class="row-fluid">更新于{{$c.CreationTime}}</div>\n          <div class="row-fluid description">{{$c.Description}}</div>\n        </div>\n      </div>\n    </a>\n    <div class="row-fluid versions">\n      {{each $c.array as $d $j}}\n      <div class="ver pull-left text-center"><a href="Detail.html?title={{$c.Title}}&version={{$sub $c.Version $j}}">{{$sub $c.Version $j}}</a></div>\n      {{/each}}\n      <div class="ver pull-left text-center more {{if $c.Version <= 5}}hide{{/if}}">更多<span class="halflings chevron-down"></span></div>\n    </div>\n    <hr>\n  </div>\n  {{/each}}\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
        return new String($out);
    });
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
                $out += ' <div class="section row-fluid readStatus"> <div class="row-fluid status"> <div class="span4 text-center statusAction" data-statuscode="wanttoread"> <a href="WriteComment.html?bookid=';
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
                $out += '"> <div class="wanttoread"> <img src="../public/img/WantToRead';
                $line = 29;
                if (userBookStatus) {
                    $line = 29;
                    if (userBookStatus.Status === 1) {
                        $out += "_Active";
                        $line = 29;
                    }
                    $line = 29;
                }
                $out += '.png" alt="" class="pull-left"> <div class="pull-left" id="wanttoread">我想读</div> </div> </a> </div> <div class="span4 text-center statusAction" data-statuscode="read"> <a href="WriteComment.html?bookid=';
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
                $out += '"> <div class="read"> <img src="../public/img/Read';
                $line = 37;
                if (userBookStatus) {
                    $line = 37;
                    if (userBookStatus.Status === 4) {
                        $out += "_Active";
                        $line = 37;
                    }
                    $line = 37;
                }
                $out += '.png" alt="" class="pull-left"> <div class="pull-left" id="read">我读过</div> </div> </a> </div> <div class="span4 text-center statusAction" data-statuscode="giveup"> <a href="WriteComment.html?bookid=';
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
                $out += '"> <div class="giveup"> <img src="../public/img/GiveUp';
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
                $out += ' </div> </div> <div class="row-fluid action"> <div class="span6 text-center"> <div class="addToBooklist"> <img src="public/img/AddToBooklist.png" alt="" class="pull-left"> <div class="pull-left text-left">加入我的书单</div> </div> </div> <div class="span6 text-center write"> <a href="WriteComment.html?status=read&bookid=';
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
                $out += '）</span> <span class="more pull-right"><a href="MoreComments.html?bookid=';
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
                    $out += '"></a> <div class="row-fluid"><div class="author pull-left"><a href="../People/Detail.html?nickname=';
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
                $out += '）</span> <span class="more pull-right"><a href="MoreReviews.html?bookid=';
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
                    $out += '"></a> <div class="megaInfo row-fluid"> <div class="userAvatar pull-left"><a href="../People/Detail.html?nickname=';
                    $line = 171;
                    $out += $escape($value.Author.Nickname);
                    $out += '"><img src="';
                    $line = 171;
                    $out += $escape($value.Author.AvatarUrl);
                    $out += '" alt=""></a></div> <div class="otherInfo pull-left"> <div class="firstRow row-fluid"> <div class="nickname pull-left"><a href="../People/Detail.html?nickname=';
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
                    $out += ' <div class="booklist pull-left span6"> <a href="../Booklist/Detail.html?id=';
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
                    $out += ' <div class="sameBook span3"> <a href="Detail.html?id=';
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
                        $out += ' <div class="sameBook span3"> <a href="Detail.html?id=';
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
                source: '<div class="container" id="{{book.Id}}">\n  <div class="section row-fluid mainInfo">\n    <div class="row-fluid">\n      <div class="span4 bookCover"><div class="wrapper"><img src="{{book.ImageUrl}}" alt=""></div></div>\n      <div class="span8 basicInfo">\n        <div class="row-fluid"><div class="span5 text-right">作者：</div><div class="badge pull-left">{{book.Author}}</div></div>\n        <div class="row-fluid"><div class="span5 text-right">状态：</div><div class="span7">{{book.Status}}</div></div>\n        <div class="row-fluid"><div class="span5 text-right">字数：</div><div class="span7">{{book.WordCount}}</div></div>\n        <div class="row-fluid"><div class="span5 text-right">类型：</div><div class="badge pull-left">{{book.Category}}</div></div>\n        <div class="row-fluid"><div class="span5 text-right">最近更新：</div><div class="span7 dotdotdotForLongText">{{book.LastUpdateDate}}</div></div>\n      </div>\n    </div>\n    <div class="row-fluid subSection2">\n      <div class="span6 text-center">\n        <div class="score">{{if book.Score}}{{book.Score}}{{else}}0{{/if}}</div>\n        <div class="ratingStar" data-score="{{book.Score}}"></div>\n        <div class="ratingSum">评分来自{{book.ScoreSum}}书友</div>\n      </div>\n      <div class="span6 text-center"><span>{{usersumOfReading}}</span><span>正在看</span></div>\n    </div>\n    <div class="row-fluid"></div>\n  </div>\n  {{if isLogin === true}}\n  <div class="section row-fluid readStatus">\n    <div class="row-fluid status">\n      <div class="span4 text-center statusAction" data-statuscode="wanttoread">\n        <a href="WriteComment.html?bookid={{book.Id}}&status=wanttoread&category={{book.Category}}&bookcover={{book.ImageUrl}}&isforman={{book.ForMan}}&booktitle={{book.Title}}">\n          <div class="wanttoread">\n            <img src="../public/img/WantToRead{{if userBookStatus}}{{if userBookStatus.Status === 1}}_Active{{/if}}{{/if}}.png" alt="" class="pull-left">\n            <div class="pull-left" id="wanttoread">我想读</div>\n          </div>\n        </a>\n      </div>\n      <div class="span4 text-center statusAction" data-statuscode="read">\n        <a href="WriteComment.html?bookid={{book.Id}}&status=read&category={{book.Category}}&bookcover={{book.ImageUrl}}&isforman={{book.ForMan}}&booktitle={{book.Title}}">\n          <div class="read">\n            <img src="../public/img/Read{{if userBookStatus}}{{if userBookStatus.Status === 4}}_Active{{/if}}{{/if}}.png" alt="" class="pull-left">\n            <div class="pull-left" id="read">我读过</div>\n          </div>\n        </a>\n      </div>\n      <div class="span4 text-center statusAction" data-statuscode="giveup">\n        <a href="WriteComment.html?bookid={{book.Id}}&status=giveup&category={{book.Category}}&bookcover={{book.ImageUrl}}&isforman={{book.ForMan}}&booktitle={{book.Title}}">\n          <div class="giveup">\n            <img src="../public/img/GiveUp{{if userBookStatus}}{{if userBookStatus.Status === 3}}_Active{{/if}}{{/if}}.png" alt="" class="pull-left">\n            <div class="pull-left" id="giveup">弃读</div>\n          </div>\n        </a>\n      </div>\n    </div>\n    <div class="row-fluid selfComment {{if userBookStatus}}{{if userBookStatus.Status === 2}}hide{{/if}} {{if userBookStatus.Status === 0}}hide{{/if}}{{/if}}">\n      <div class="row-fluid {{if userReview}}{{else}}{{if userComment}}{{else}}hide{{/if}}{{/if}}">\n        <div class="offset{{if userBookStatus}}{{if userBookStatus.Status === 1}}1{{else}}{{if userBookStatus.Status === 4}}5{{else}}{{if userBookStatus.Status === 3}}9{{/if}}{{/if}}{{/if}}{{/if}} text-center arrow"></div>\n      </div>\n      <div class="row-fluid">\n        {{if userReview}}\n        <div class="review row-fluid">\n          <div class="firstRow row-fluid">\n            <div class="nickname pull-left">我读过这本书</div>\n            <div class="reviewScore pull-left" data-score="{{userReview.Score}}"></div>\n            <div class="mega pull-right">\n              <table>\n                <tr>\n                  <td>\n                    <div class="glyphicons comments">{{userReview.ResponseSum}}</div>\n                  </td>\n                  <td>\n                    <div class="glyphicons thumbs_up">{{userReview.LikeSum}}</div>\n                  </td>\n                </tr>\n              </table>\n            </div>\n          </div>\n          <div class="secondRow row-fluid">\n            <div class="reviewTitle pull-left dotdotdotForLongText">{{userReview.Title}}</div>\n            <div class="pull-right timeStamp">{{userReview.CreationTime}}</div>\n          </div>\n          <div class="content row-fluid">{{$substring userReview.Content 0 80}}</div>\n        </div>\n        {{else}}\n        {{if userComment}}\n        <div class="review row-fluid">\n          <div class="firstRow row-fluid">\n            <div class="nickname pull-left">我读过这本书</div>\n            <div class="reviewScore pull-left" data-score="{{userComment.Score}}"></div>\n            <div class="mega pull-right">\n              <table>\n                <tr>\n                  <td>\n                    <div class="glyphicons comments">{{userComment.ResponseSum}}</div>\n                  </td>\n                  <td>\n                    <div class="glyphicons thumbs_up">{{userComment.LikeSum}}</div>\n                  </td>\n                </tr>\n              </table>\n            </div>\n          </div>\n          <div class="secondRow row-fluid">\n            <div class="pull-right timeStamp">{{userComment.CreationTime}}</div>\n          </div>\n          <div class="content row-fluid">{{$substring userComment.Content 0 80}}</div>\n        </div>\n        {{/if}}\n        {{/if}}\n      </div>\n    </div>\n    <div class="row-fluid action">\n      <div class="span6 text-center">\n        <div class="addToBooklist">\n          <img src="public/img/AddToBooklist.png" alt="" class="pull-left">\n          <div class="pull-left text-left">加入我的书单</div>\n        </div>\n      </div>\n      <div class="span6 text-center write">\n        <a href="WriteComment.html?status=read&bookid={{book.Id}}&category={{book.Category}}&bookcover={{book.ImageUrl}}&isforman={{book.ForMan}}&booktitle={{book.Title}}"></a>\n        <div class="writeComment">\n          <img src="public/img/mobile/Pencil.png" alt="" class="pull-left">\n          <div class="pull-left">写评论</div>\n        </div>\n      </div>\n      <div class="span2"></div>\n    </div>\n  </div>\n  {{/if}}\n  <div class="section row-fluid summary">\n    <div class="row-fluid title">内容简介</div>\n    <div class="row-fluid summaryContent">{{book.Summary}}</div>\n    <div class="expand pull-right"></div>\n  </div>\n  {{if book.Comments}}\n  <div class="section row-fluid comments">\n    <div class="row-fluid title">\n      <span>短评（{{book.CommentSum}}）</span>\n      <span class="more pull-right"><a href="MoreComments.html?bookid={{book.Id}}">更多&nbsp;&nbsp;&nbsp;&nbsp;></a></span>\n    </div>\n    <div class="row-fluid">\n      {{each book.Comments}}\n      <div class="row-fluid comment" id="{{$value.Id}}">\n        <a href="Comment/Detail.html?id={{$value.Id}}"></a>\n        <div class="row-fluid"><div class="author pull-left"><a href="../People/Detail.html?nickname={{$value.Author.Nickname}}">{{$value.Author.Nickname}}</a></div><div class="cmtScore pull-left" data-score="{{$value.Score}}"></div></div>\n        <div class="row-fluid"><div class="content">{{$value.Content}}</div></div>\n        <div class="row-fluid mega">\n          <table class="pull-right">\n            <tr>\n              <td>\n                <div class="glyphicons comments">{{$value.ResponseSum}}</div>\n              </td>\n              <td>\n                <div class="glyphicons thumbs_up">{{$value.LikeSum}}</div>\n              </td>\n            </tr>\n          </table>\n        </div>\n      </div>\n      {{/each}}\n    </div>\n  </div>\n  {{/if}}\n  {{if book.Reviews}}\n  <div class="section row-fluid reviews">\n    <div class="row-fluid title">\n      <span>书评（{{book.ReviewSum}}）</span>\n      <span class="more pull-right"><a href="MoreReviews.html?bookid={{book.Id | toobjectidstring}}">更多&nbsp;&nbsp;&nbsp;&nbsp;></a></span>\n    </div>\n    <div class="row-fluid">\n      {{each book.Reviews}}\n      <div class="review row-fluid" id="{{$value.Id}}">\n        <a href="Review/Detail.html?id={{$value.Id}}"></a>\n        <div class="megaInfo row-fluid">\n          <div class="userAvatar pull-left"><a href="../People/Detail.html?nickname={{$value.Author.Nickname}}"><img src="{{$value.Author.AvatarUrl}}" alt=""></a></div>\n          <div class="otherInfo pull-left">\n            <div class="firstRow row-fluid">\n              <div class="nickname pull-left"><a href="../People/Detail.html?nickname={{$value.Author.Nickname}}">{{$value.Author.Nickname}}</a></div>\n              <div class="reviewScore pull-left" data-score="{{$value.Score}}"></div>\n              <div class="mega pull-right">\n                <table>\n                  <tr>\n                    <td>\n                      <div class="glyphicons comments">{{$value.ResponseSum}}</div>\n                    </td>\n                    <td>\n                      <div class="glyphicons thumbs_up">{{$value.LikeSum}}</div>\n                    </td>\n                  </tr>\n                </table>\n              </div>\n            </div>\n            <div class="secondRow row-fluid">\n              <div class="reviewTitle pull-left dotdotdotForLongText">{{$value.Title}}</div>\n            </div>\n          </div>\n        </div>\n        <div class="content row-fluid">{{$substring $value.Content 0 80}}</div>\n      </div>\n      {{/each}}\n    </div>\n  </div>\n  {{/if}}\n  {{if relatedBooklists}}\n  <div class="section row-fluid booklists">\n    <div class="row-fluid title">\n      <span>收藏这本书的书单</span>\n    </div>\n    <div class="row-fluid">\n      {{each relatedBooklists as $c $i}}\n      <div class="booklist pull-left span6">\n        <a href="../Booklist/Detail.html?id={{$c.Id}}"></a>\n        <div class="row-fluid booklistTitle"><div class="titleText pull-left">{{$c.Title}}</div><div class="pull-right">({{$c.BookSum}})</div></div>\n        <div class="row-fluid nickname">{{$c.Author.Nickname}}</div>\n        <div class="row-fluid">\n          {{each $c.BookCoverUrls as $d $j}}\n          {{if $j <= 3}}\n          <div class="bookCover span3"><div class="wrapper"><img src="{{$d}}" alt=""></div></div>\n          {{/if}}\n          {{/each}}\n        </div>\n        <div class="row-fluid mega">\n          <div class="span6"><div class="glyphicons comments">{{$c.ResponseSum}}</div></div>\n          <div class="span6"><div class="glyphicons heart">{{$c.SubscribeSum}}</div></div>\n        </div>\n      </div>\n      {{/each}}\n    </div>\n  </div>\n  {{/if}}\n  {{if booksWithSameAuthor}}\n  <div class="section row-fluid booksBySameAuthor">\n    <div class="row-fluid title">\n      <span>作者的其他书</span>\n    </div>\n    <div class="row-fluid">\n      {{each booksWithSameAuthor}}\n      <div class="sameBook span3">\n        <a href="Detail.html?id={{$value.Id}}">\n          <div class="bookCover">\n            <div class="wrapper"><img src="{{$value.ImageUrl}}" alt=""></div>\n          </div>\n          <div class="bookTitle text-center">{{$value.Title}}</div>\n        </a>\n      </div>\n      {{/each}}\n    </div>\n  </div>\n  {{/if}}\n  {{if book.SimilarBooks}}\n  <div class="section row-fluid similarBooks">\n    <div class="row-fluid title">\n      <span>喜欢这本书的人也喜欢</span>\n    </div>\n    <div class="row-fluid">\n      {{each book.SimilarBooks as $c $i}}\n      {{if $i <= 3}}\n      <div class="sameBook span3">\n        <a href="Detail.html?id={{$c.Id}}">\n          <div class="bookCover">\n            <div class="wrapper"><img src="{{$c.ImageUrl}}" alt=""></div>\n          </div>\n          <div class="bookTitle text-center">{{$c.Title}}</div>\n        </a>\n      </div>\n      {{/if}}\n      {{/each}}\n    </div>\n  </div>\n  {{/if}}\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
        return new String($out);
    });
    template("Booklist/Detail", function($data, $id) {
        var $helpers = this, $line = 0, $escape = $helpers.$escape, Author = $data.Author, CreationTime = $data.CreationTime, Description = $data.Description, Categories = $data.Categories, $string = $helpers.$string, $len = $helpers.$len, Books = $data.Books, $each = $helpers.$each, $value = $data.$value, $index = $data.$index, toobjectidstring = $data.toobjectidstring, Id = $data.Id, ResponseSum = $data.ResponseSum, SubscribeSum = $data.SubscribeSum, $out = "";
        try {
            $out += '<div class="container"> <h5 class="row-fluid text-center"> <a href="People/Detail.html?nickname=';
            $line = 3;
            $out += $escape(Author.Nickname);
            $out += '" class="authorNameLink">';
            $line = 3;
            $out += $escape(Author.Nickname);
            $out += "</a><span>发布于 ";
            $line = 3;
            $out += $escape(CreationTime);
            $out += '</span> </h5> <div class="desc row-fluid text-center">';
            $line = 5;
            $out += $escape(Description);
            $out += "</div> <hr> ";
            $line = 7;
            if (Categories) {
                $out += ' <ul class="cats unstyled inline row-fluid"> <li class="cat span3 text-center active" data-cat="all">全部(';
                $line = 9;
                $out += $string($len(Books));
                $out += ")</li> ";
                $line = 10;
                $each(Categories, function($value, $index) {
                    $out += ' <li class="cat span3 text-center" data-cat="';
                    $line = 11;
                    $out += $escape($value.Category);
                    $out += '">';
                    $line = 11;
                    $out += $escape($value.Category);
                    $out += "(";
                    $line = 11;
                    $out += $escape($value.Count);
                    $out += ")</li> ";
                    $line = 12;
                });
                $out += ' <li class="cat more span3 text-center">更多<span class="halflings chevron-down"></span></li> </ul> ';
                $line = 15;
            } else {
                $out += ' <em class="muted">暂时还没有书籍被加入到本书单</em> ';
                $line = 17;
            }
            $out += ' <hr> <div class="clearfix"></div> <div class="tab-content"> <div class="listDetail tab-pane active" id="allbooks"> <ul class="unstyled"> ';
            $line = 23;
            $each(Books, function($value, $index) {
                $out += ' <li class="book row-fluid" data-cat="';
                $line = 24;
                $out += $escape($value.GeneralCategory);
                $out += '" id="';
                $line = 24;
                $out += $escape($value.Id);
                $out += '"> <a href="/m/book/';
                $line = 25;
                $out += $escape($value.Id | toobjectidstring);
                $out += '"></a> <div class="megaInfo row-fluid"> <div class="bookCover span3"> <img src="';
                $line = 28;
                $out += $escape($value.ImageUrl);
                $out += '" alt="" data-srcimg="';
                $line = 28;
                $out += $escape($value.ImageUrl);
                $out += '"> </div> <div class="bookMega span9"> <h4><strong>';
                $line = 31;
                $out += $escape($value.Title);
                $out += '</strong></h4> <div class="pull-left">';
                $line = 32;
                $out += $escape($value.Author);
                $out += '</div> <div class="clearfix"></div> <div class="pull-left">';
                $line = 34;
                $out += $escape($value.Category);
                $out += "</div> </div> </div> ";
                $line = 37;
                if ($value.Comment) {
                    $out += ' <div class="comment row-fluid"> <div class="span3">创建者评价</div> <div class="span9"> <div class="ratingStar" data-score="';
                    $line = 41;
                    $out += $escape($value.Score);
                    $out += '"></div> <div class="content">';
                    $line = 42;
                    $out += $escape($value.Comment);
                    $out += "</div> </div> </div> ";
                    $line = 45;
                }
                $out += " </li> ";
                $line = 47;
            });
            $out += ' </ul> </div> </div> </div> <div class="mega"> <table> <tr> <td class="span6"> <a href="Response.html?booklistid=';
            $line = 56;
            $out += $escape(Id);
            $out += '"> <span class="glyphicons chat">';
            $line = 57;
            $out += $escape(ResponseSum);
            $out += '</span> </a> </td> <td class="span6"> <div><span class="glyphicons heart">';
            $line = 61;
            $out += $escape(SubscribeSum);
            $out += "</span></div> </td> </tr> </table> </div>";
        } catch (e) {
            throw {
                id: $id,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="container">\n  <h5 class="row-fluid text-center">\n    <a href="People/Detail.html?nickname={{Author.Nickname}}" class="authorNameLink">{{Author.Nickname}}</a><span>发布于 {{CreationTime}}</span>\n  </h5>\n  <div class="desc row-fluid text-center">{{Description}}</div>\n  <hr>\n  {{if Categories}}\n  <ul class="cats unstyled inline row-fluid">\n    <li class="cat span3 text-center active" data-cat="all">全部({{$len Books}})</li>\n    {{each Categories}}\n    <li class="cat span3 text-center" data-cat="{{$value.Category}}">{{$value.Category}}({{$value.Count}})</li>\n    {{/each}}\n    <li class="cat more span3 text-center">更多<span class="halflings chevron-down"></span></li>\n  </ul>\n  {{else}}\n  <em class="muted">暂时还没有书籍被加入到本书单</em>\n  {{/if}}\n  <hr>\n  <div class="clearfix"></div>\n  <div class="tab-content">\n    <div class="listDetail tab-pane active" id="allbooks">\n      <ul class="unstyled">\n        {{each Books}}\n        <li class="book row-fluid" data-cat="{{$value.GeneralCategory}}" id="{{$value.Id}}">\n          <a href="/m/book/{{$value.Id | toobjectidstring}}"></a>\n          <div class="megaInfo row-fluid">\n            <div class="bookCover span3">\n              <img src="{{$value.ImageUrl}}" alt="" data-srcimg="{{$value.ImageUrl}}">\n            </div>\n            <div class="bookMega span9">\n              <h4><strong>{{$value.Title}}</strong></h4>\n              <div class="pull-left">{{$value.Author}}</div>\n              <div class="clearfix"></div>\n              <div class="pull-left">{{$value.Category}}</div>\n            </div>\n          </div>\n          {{if $value.Comment}}\n          <div class="comment row-fluid">\n            <div class="span3">创建者评价</div>\n            <div class="span9">\n              <div class="ratingStar" data-score="{{$value.Score}}"></div>\n              <div class="content">{{$value.Comment}}</div>\n            </div>\n          </div>\n          {{/if}}\n        </li>\n        {{/each}}\n      </ul>\n    </div>\n  </div>\n</div>\n<div class="mega">\n  <table>\n    <tr>\n      <td class="span6">\n        <a href="Response.html?booklistid={{Id}}">\n          <span class="glyphicons chat">{{ResponseSum}}</span>\n        </a>\n      </td>\n      <td class="span6">\n        <div><span class="glyphicons heart">{{SubscribeSum}}</span></div>\n      </td>\n    </tr>\n  </table>\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
        return new String($out);
    });
    template("Index/Articles", function($data, $id) {
        var $helpers = this, $line = 0, $each = $helpers.$each, articles = $data.articles, $value = $data.$value, $index = $data.$index, $escape = $helpers.$escape, $string = $helpers.$string, $substring = $helpers.$substring, $out = "";
        try {
            $line = 1;
            $each(articles, function($value, $index) {
                $out += ' <div class="articleItem slide"> <a href="Article/Detail.html?id=';
                $line = 3;
                $out += $escape($value.Id);
                $out += '"></a> <img src="';
                $line = 4;
                if ($value.ImageUrl) {
                    $line = 4;
                    $out += $escape($value.ImageUrl);
                    $line = 4;
                } else {
                    $out += "http://shanpowbookcover.qiniudn.com/%E5%B0%8F%E7%BC%96%E5%81%B7%E6%87%92%E6%B2%A1%E9%85%8D%E5%9B%BE.png";
                    $line = 4;
                }
                $out += '" alt=""> <div class="titleWrapper"><div class="articleTitle">';
                $line = 5;
                $out += $string($substring($value.Title, 0, 50));
                $out += "</div></div> </div> ";
                $line = 7;
            });
        } catch (e) {
            throw {
                id: $id,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '{{each articles}}\n<div class="articleItem slide">\n  <a href="Article/Detail.html?id={{$value.Id}}"></a>\n  <img src="{{if $value.ImageUrl}}{{$value.ImageUrl}}{{else}}http://shanpowbookcover.qiniudn.com/%E5%B0%8F%E7%BC%96%E5%81%B7%E6%87%92%E6%B2%A1%E9%85%8D%E5%9B%BE.png{{/if}}" alt="">\n  <div class="titleWrapper"><div class="articleTitle">{{$substring $value.Title 0 50}}</div></div>\n</div>\n{{/each}}'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
        return new String($out);
    });
    template("Index/Billboards", function($data, $id) {
        var $helpers = this, $line = 0, $each = $helpers.$each, billboards = $data.billboards, $value = $data.$value, $index = $data.$index, $escape = $helpers.$escape, $out = "";
        try {
            $line = 1;
            $each(billboards, function($value, $index) {
                $out += ' <div class="ranking pull-left"> <a href="Billboard/Detail.html?title=';
                $line = 3;
                $out += $escape($value.Title);
                $out += "&version=";
                $line = 3;
                $out += $escape($value.Version);
                $out += '"></a> <div class="rankingImage"> <img src="';
                $line = 5;
                $out += $escape($value.ImageUrl);
                $out += '?imageView2/1/w/200/h/200" alt=""> <div class="updateInfo">更新至第<span>';
                $line = 6;
                $out += $escape($value.Version);
                $out += '</span>期</div> </div> <div class="rankingTitle"><table><tr><td>';
                $line = 8;
                $out += $escape($value.Title);
                $out += "</td></tr></table></div> </div> ";
                $line = 10;
            });
        } catch (e) {
            throw {
                id: $id,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '{{each billboards}}\n<div class="ranking pull-left">\n  <a href="Billboard/Detail.html?title={{$value.Title}}&version={{$value.Version}}"></a>\n  <div class="rankingImage">\n    <img src="{{$value.ImageUrl}}?imageView2/1/w/200/h/200" alt="">\n    <div class="updateInfo">更新至第<span>{{$value.Version}}</span>期</div>\n  </div>\n  <div class="rankingTitle"><table><tr><td>{{$value.Title}}</td></tr></table></div>\n</div>\n{{/each}}'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
        return new String($out);
    });
    template("Index/Main", function($data, $id) {
        var $helpers = this, $line = 0, include = function(id, data) {
            data = data || $data;
            var $text = $helpers.$include(id, data, $id);
            $out += $text;
            return $text;
        }, $out = "";
        try {
            $out += '<div class="container"> <div class="row-fluid slides section"> ';
            $line = 3;
            include("./Articles");
            $out += ' </div> <div class="row-fluid hot_ranking section"> <div class="title row-fluid"> <h4> <span>新鲜热榜</span> <span class="more pull-right"><a href="Billboard/Index.html">更多&nbsp;&nbsp;&nbsp;&nbsp;></a></span> </h4> </div> <div class="rankinglist row-fluid"> ';
            $line = 13;
            include("./Billboards");
            $out += ' </div> </div> <div class="row-fluid wizard section"> <div class="title row-fluid"> <h4> <span>为您推荐</span> <span class="more pull-right hide"><a href="Book/Recommendation.html">一键治书荒</a></span> </h4> </div> <div class="row-fluid bookRecommended"> ';
            $line = 24;
            include("./Wizard");
            $out += ' </div> </div> <div class="row-fluid reviews section"> <div class="title row-fluid"> <h4> <span>推荐书评</span> <span class="more pull-right"><a href="Review/All.html">更多&nbsp;&nbsp;&nbsp;&nbsp;></a></span> </h4> </div> <ul class="unstyled"> ';
            $line = 35;
            include("../public/Reviews");
            $out += " </ul> </div> </div>";
        } catch (e) {
            throw {
                id: $id,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="container">\n  <div class="row-fluid slides section">\n    {{include "./Articles"}}\n  </div>\n  <div class="row-fluid hot_ranking section">\n    <div class="title row-fluid">\n      <h4>\n        <span>新鲜热榜</span>\n        <span class="more pull-right"><a href="Billboard/Index.html">更多&nbsp;&nbsp;&nbsp;&nbsp;></a></span>\n      </h4>\n    </div>\n    <div class="rankinglist row-fluid">\n      {{include "./Billboards"}}\n    </div>\n  </div>\n  <div class="row-fluid wizard section">\n    <div class="title row-fluid">\n      <h4>\n        <span>为您推荐</span>\n        <span class="more pull-right hide"><a href="Book/Recommendation.html">一键治书荒</a></span>\n      </h4>\n    </div>\n    <div class="row-fluid bookRecommended">\n      {{include "./Wizard"}}\n    </div>\n  </div>\n  <div class="row-fluid reviews section">\n    <div class="title row-fluid">\n      <h4>\n        <span>推荐书评</span>\n        <span class="more pull-right"><a href="Review/All.html">更多&nbsp;&nbsp;&nbsp;&nbsp;></a></span>\n      </h4>\n    </div>\n    <ul class="unstyled">\n      {{include "../public/Reviews"}}\n    </ul>\n  </div>\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
        return new String($out);
    });
    template("Index/Wizard", function($data, $id) {
        var $helpers = this, $line = 0, isLogin = $data.isLogin, $each = $helpers.$each, guessBooks = $data.guessBooks, $value = $data.$value, $index = $data.$index, $escape = $helpers.$escape, $out = "";
        try {
            $line = 1;
            if (isLogin === true) {
                $out += " ";
                $line = 2;
                $each(guessBooks, function($value, $index) {
                    $out += ' <div class="wizardBook span3"> <a href="/m/book/';
                    $line = 4;
                    $out += $escape($value.Id);
                    $out += '"> <div class="bookCover"> <div class="wrapper"><img src="';
                    $line = 6;
                    $out += $escape($value.ImageUrl);
                    $out += '" alt=""></div> </div> <div class="bookTitle text-center">';
                    $line = 8;
                    $out += $escape($value.Title);
                    $out += "</div> </a> </div> ";
                    $line = 11;
                });
                $out += " ";
                $line = 12;
            } else {
                $out += ' <div class="span6 pull-left"> <div class="tip row-fluid">曲高不一定和寡，登录后发现您的专属推荐，还有志同道合的书友们</div> <div class="login pull-left row-fluid"><a href="http://action/showlogin">立即登录</a></div> </div> <div class="span6 pull-left"><img src="public/img/tagCloud.png" alt=""></div> ';
                $line = 18;
            }
        } catch (e) {
            throw {
                id: $id,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '{{if isLogin === true}}\n  {{each guessBooks}}\n  <div class="wizardBook span3">\n    <a href="/m/book/{{$value.Id}}">\n      <div class="bookCover">\n        <div class="wrapper"><img src="{{$value.ImageUrl}}" alt=""></div>\n      </div>\n      <div class="bookTitle text-center">{{$value.Title}}</div>\n    </a>\n  </div>\n  {{/each}}\n{{else}}\n  <div class="span6 pull-left">\n    <div class="tip row-fluid">曲高不一定和寡，登录后发现您的专属推荐，还有志同道合的书友们</div>\n    <div class="login pull-left row-fluid"><a href="http://action/showlogin">立即登录</a></div>\n  </div>\n  <div class="span6 pull-left"><img src="public/img/tagCloud.png" alt=""></div>\n{{/if}}'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
        return new String($out);
    });
    template("public/ActionBar", '<div class="actionbar row-fluid">\n  <div class="actionbar-section left-button pull-left">\n    <div class="slide-menu"><div class="glyphicons show_lines"></div></div>\n    <div class="back"><div class="glyphicons chevron-left"></div></div>\n  </div>\n  <div class="actionbar-section center pull-left">\n    <div class="page-title pull-left"></div>\n    <div class="btn-group pull-left channel">\n      <a class="btn btn-link dropdown-toggle" data-toggle="dropdown" href="#">\n        <img src="public/img/Crown.png" alt="" class="current-channel pull-left">\n        <div class="arrow pull-left"></div>\n      </a>\n      <ul class="dropdown-menu">\n        <li><a href="?ch=m"><img src="public/img/Crown.png" alt=""></a></li>\n        <li><a href="?ch=f"><img src="public/img/Crown_Woman.png" alt=""></a></li>\n      </ul>\n    </div>\n  </div>\n  <div class="actionbar-section right-button pull-right">\n    <div class="buttons">\n      <a href="Search" class="button hide glyphicons search"></a>\n    </div>\n  </div>\n</div>\n<div class="spinner"></div>');
    template("public/BookWithComment", function($data, $id) {
        var $helpers = this, $line = 0, $escape = $helpers.$escape, Id = $data.Id, ImageUrl = $data.ImageUrl, Title = $data.Title, Author = $data.Author, $string = $helpers.$string, $substring = $helpers.$substring, Summary = $data.Summary, Comment = $data.Comment, $out = "";
        try {
            $out += '<li class="book row-fluid" id="';
            $line = 1;
            $out += $escape(Id);
            $out += '"> <a href="../Book/Detail.html?id=';
            $line = 2;
            $out += $escape(Id);
            $out += '"></a> <div class="megaInfo row-fluid"> <div class="bookCover span3"> <img src="';
            $line = 5;
            $out += $escape(ImageUrl);
            $out += '" alt=""> </div> <div class="bookMega span9"> <div class="row-fluid"> <div class="pull-left">';
            $line = 9;
            $out += $escape(Title);
            $out += '</div> <div class="pull-left author">';
            $line = 10;
            $out += $escape(Author);
            $out += '</div> </div> <div class="row-fluid">';
            $line = 12;
            $out += $string($substring(Summary, 0, 50));
            $out += "</div> </div> </div> ";
            $line = 15;
            if (Comment) {
                $out += ' <div class="comment row-fluid"> <div class="span3 text-right">看点</div> <div class="span9">';
                $line = 18;
                $out += $escape(Comment);
                $out += "</div> </div> ";
                $line = 20;
            }
            $out += " </li>";
        } catch (e) {
            throw {
                id: $id,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<li class="book row-fluid" id="{{Id}}">\n  <a href="../Book/Detail.html?id={{Id}}"></a>\n  <div class="megaInfo row-fluid">\n    <div class="bookCover span3">\n      <img src="{{ImageUrl}}" alt="">\n    </div>\n    <div class="bookMega span9">\n      <div class="row-fluid">\n        <div class="pull-left">{{Title}}</div>\n        <div class="pull-left author">{{Author}}</div>\n      </div>\n      <div class="row-fluid">{{$substring Summary 0 50}}</div>\n    </div>\n  </div>\n  {{if Comment}}\n  <div class="comment row-fluid">\n    <div class="span3 text-right">看点</div>\n    <div class="span9">{{Comment}}</div>\n  </div>\n  {{/if}}\n</li>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
        return new String($out);
    });
    template("public/Response", function($data, $id) {
        var $helpers = this, $line = 0, $escape = $helpers.$escape, Id = $data.Id, Author = $data.Author, Content = $data.Content, CreationTime = $data.CreationTime, $out = "";
        try {
            $out += '<div class="response row-fluid" id="';
            $line = 1;
            $out += $escape(Id);
            $out += '"> <div class="avatar pull-left span2"> <a href="../People/Detail.html?nickname=';
            $line = 3;
            $out += $escape(Author.Nickname);
            $out += '"><img src="';
            $line = 3;
            $out += $escape(Author.AvatarUrl);
            $out += '" alt="" class="img-circle"></a> </div> <div class="responseContent pull-left span10"> <div class="author row-fluid"> <a href="../People/Detail.html?nickname=';
            $line = 7;
            $out += $escape(Author.Nickname);
            $out += '" class="pull-left"><strong>';
            $line = 7;
            $out += $escape(Author.Nickname);
            $out += '</strong></a>说： <a href="#" class="responseBtn pull-right">回复</a> </div> <div class="mega row-fluid"> <div class="responseText">';
            $line = 11;
            $out += $escape(Content);
            $out += '</div> <div class="timestamp pull-right">';
            $line = 12;
            $out += $escape(CreationTime);
            $out += "前</div> </div> </div> </div>";
        } catch (e) {
            throw {
                id: $id,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="response row-fluid" id="{{Id}}">\n  <div class="avatar pull-left span2">\n    <a href="../People/Detail.html?nickname={{Author.Nickname}}"><img src="{{Author.AvatarUrl}}" alt="" class="img-circle"></a>\n  </div>\n  <div class="responseContent pull-left span10">\n    <div class="author row-fluid">\n      <a href="../People/Detail.html?nickname={{Author.Nickname}}" class="pull-left"><strong>{{Author.Nickname}}</strong></a>说：\n      <a href="#" class="responseBtn pull-right">回复</a>\n    </div>\n    <div class="mega row-fluid">\n      <div class="responseText">{{Content}}</div>\n      <div class="timestamp pull-right">{{CreationTime}}前</div>\n    </div>\n  </div>\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
        return new String($out);
    });
    template("public/Responses", function($data, $id) {
        var $helpers = this, $line = 0, $escape = $helpers.$escape, AuthorId = $data.AuthorId, Id = $data.Id, avatarUrl = $data.avatarUrl, nickname = $data.nickname, bookId = $data.bookId, $each = $helpers.$each, responses = $data.responses, $value = $data.$value, $index = $data.$index, include = function(id, data) {
            data = data || $data;
            var $text = $helpers.$include(id, data, $id);
            $out += $text;
            return $text;
        }, isLogin = $data.isLogin, $out = "";
        try {
            $out += '<div class="container" data-authorid="';
            $line = 1;
            $out += $escape(AuthorId);
            $out += '" data-id="';
            $line = 1;
            $out += $escape(Id);
            $out += '" data-avatar="';
            $line = 1;
            $out += $escape(avatarUrl);
            $out += '" data-nickname="';
            $line = 1;
            $out += $escape(nickname);
            $out += '" data-bookid="';
            $line = 1;
            $out += $escape(bookId);
            $out += '"> ';
            $line = 2;
            $each(responses, function($value, $index) {
                $out += " ";
                $line = 3;
                include("./Response", $value);
                $out += " ";
                $line = 4;
            });
            $out += " </div> ";
            $line = 6;
            if (isLogin === true) {
                $out += ' <div class="postResponse row-fluid"> <div class="replyInput span9"> <input type="text" class="input-block-level" name="q"> <div class="cancelInput hide">x</div> </div> <button class="btn button text-center span3 submit" disabled="disabled">回复</button> </div> ';
                $line = 14;
            }
        } catch (e) {
            throw {
                id: $id,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="container" data-authorid="{{AuthorId}}" data-id="{{Id}}" data-avatar="{{avatarUrl}}" data-nickname="{{nickname}}" data-bookid="{{bookId}}">\n  {{each responses}}\n  {{include "./Response" $value}}\n  {{/each}}\n</div>\n{{if isLogin === true}}\n<div class="postResponse row-fluid">\n  <div class="replyInput span9">\n    <input type="text" class="input-block-level" name="q">\n    <div class="cancelInput hide">x</div>\n  </div>\n  <button class="btn button text-center span3 submit" disabled="disabled">回复</button>\n</div>\n{{/if}}'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
        return new String($out);
    });
    template("public/Reviews", function($data, $id) {
        var $helpers = this, $line = 0, $each = $helpers.$each, recommendedReviews = $data.recommendedReviews, $value = $data.$value, $index = $data.$index, $escape = $helpers.$escape, $string = $helpers.$string, $substring = $helpers.$substring, $out = "";
        try {
            $line = 1;
            $each(recommendedReviews, function($value, $index) {
                $out += ' <li class="review" id="';
                $line = 2;
                $out += $escape($value.Id);
                $out += '"> <a href="';
                $line = 3;
                if ($value.Title) {
                    $out += "Review";
                    $line = 3;
                } else {
                    $out += "Comment";
                    $line = 3;
                }
                $out += "/Detail.html?id=";
                $line = 3;
                $out += $escape($value.Id);
                $out += '"></a> <div class="row-fluid reviewBasic"> <div class="reviewInfo pull-left"> ';
                $line = 6;
                if ($value.Title) {
                    $out += ' <div class="reviewTitle dotdotdotForLongText"><strong>';
                    $line = 7;
                    $out += $escape($value.Title);
                    $out += "</strong></div> ";
                    $line = 8;
                }
                $out += ' <div class="content">';
                $line = 9;
                if ($value.Title) {
                    $line = 9;
                    $out += $string($substring($value.Content, 0, 45));
                    $line = 9;
                } else {
                    $line = 9;
                    $out += $string($substring($value.Content, 0, 55));
                    $line = 9;
                }
                $out += '</div> </div> <div class="bookCover pull-left"> <a href="Book/Detail.html?id=';
                $line = 12;
                $out += $escape($value.Book.Id);
                $out += '"></a> <img src="';
                $line = 13;
                $out += $escape($value.Book.ImageUrl);
                $out += '" alt=""> <div class="bookTitle text-center">';
                $line = 14;
                $out += $string($substring($value.Book.Title, 0, 10));
                $out += '</div> </div> </div> <div class="row-fluid reviewRelated"> <div class="user span8 row-fluid"> <div class="avatar span3"> <div class="arrow"></div> <a href="People/Detail.html?nickname=';
                $line = 21;
                $out += $escape($value.Author.Nickname);
                $out += '"><img src="';
                $line = 21;
                $out += $escape($value.Author.AvatarUrl);
                $out += '" alt="" class="img-circle"></a> </div> <div class="userInfo span9"> <div class="row-fluid dotdotdotForLongText"><a href="People/Detail.html?nickname=';
                $line = 24;
                $out += $escape($value.Author.Nickname);
                $out += '">';
                $line = 24;
                $out += $string($substring($value.Author.Nickname, 0, 10));
                $out += '</a></div> <div class="row-fluid"><div class="ratingStar" data-score="';
                $line = 25;
                $out += $escape($value.Score);
                $out += '"></div></div> </div> </div> <div class="mega span4 row-fluid"> <div class="span6"><div class="glyphicons comments">';
                $line = 29;
                $out += $escape($value.ResponseSum);
                $out += '</div></div> <div class="span6"><div class="glyphicons thumbs_up">';
                $line = 30;
                $out += $escape($value.LikeSum);
                $out += "</div></div> </div> </div> </li> ";
                $line = 34;
            });
        } catch (e) {
            throw {
                id: $id,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '{{each recommendedReviews}}\n<li class="review" id="{{$value.Id}}">\n  <a href="{{if $value.Title}}Review{{else}}Comment{{/if}}/Detail.html?id={{$value.Id}}"></a>\n  <div class="row-fluid reviewBasic">\n    <div class="reviewInfo pull-left">\n      {{if $value.Title}}\n      <div class="reviewTitle dotdotdotForLongText"><strong>{{$value.Title}}</strong></div>\n      {{/if}}\n      <div class="content">{{if $value.Title}}{{$substring $value.Content 0 45}}{{else}}{{$substring $value.Content 0 55}}{{/if}}</div>\n    </div>\n    <div class="bookCover pull-left">\n      <a href="Book/Detail.html?id={{$value.Book.Id}}"></a>\n      <img src="{{$value.Book.ImageUrl}}" alt="">\n      <div class="bookTitle text-center">{{$substring $value.Book.Title 0 10}}</div>\n    </div>\n  </div>\n  <div class="row-fluid reviewRelated">\n    <div class="user span8 row-fluid">\n      <div class="avatar span3">\n        <div class="arrow"></div>\n        <a href="People/Detail.html?nickname={{$value.Author.Nickname}}"><img src="{{$value.Author.AvatarUrl}}" alt="" class="img-circle"></a>\n      </div>\n      <div class="userInfo span9">\n        <div class="row-fluid dotdotdotForLongText"><a href="People/Detail.html?nickname={{$value.Author.Nickname}}">{{$substring $value.Author.Nickname 0 10}}</a></div>\n        <div class="row-fluid"><div class="ratingStar" data-score="{{$value.Score}}"></div></div>\n      </div>\n    </div>\n    <div class="mega span4 row-fluid">\n      <div class="span6"><div class="glyphicons comments">{{$value.ResponseSum}}</div></div>\n      <div class="span6"><div class="glyphicons thumbs_up">{{$value.LikeSum}}</div></div>\n    </div>\n  </div>\n</li>\n{{/each}}'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
        return new String($out);
    });
    template("Comment/Detail", function($data, $id) {
        var $helpers = this, $line = 0, $escape = $helpers.$escape, comment = $data.comment, $out = "";
        try {
            $out += '<div class="container" data-bookid="';
            $line = 1;
            $out += $escape(comment.Book.Id);
            $out += '"> <div class="info row-fluid"> <div class="user pull-left" id="';
            $line = 3;
            $out += $escape(comment.Author.Id);
            $out += '"> <a href="../People/Detail.html?nickname=';
            $line = 4;
            $out += $escape(comment.Author.Nickname);
            $out += '"> <div class="avatar pull-left"><img src="';
            $line = 5;
            $out += $escape(comment.Author.AvatarUrl);
            $out += '" alt="" class="img-circle"></div> <div class="nickname pull-left">';
            $line = 6;
            $out += $escape(comment.Author.Nickname);
            $out += '</div> </a> </div> <div class="ratingStar pull-left" data-score="';
            $line = 9;
            $out += $escape(comment.Score);
            $out += '"></div> </div> <div class="content">';
            $line = 11;
            $out += $escape(comment.Content);
            $out += '</div> <div class="book row-fluid" id="';
            $line = 12;
            $out += $escape(comment.Book);
            $out += '"> <a href="../Book/Detail.html?id=';
            $line = 13;
            $out += $escape(comment.Book.Id);
            $out += '"></a> <div class="megaInfo row-fluid"> <div class="bookCover span3"> <img src="';
            $line = 16;
            $out += $escape(comment.Book.ImageUrl);
            $out += '" alt="" data-srcimg="';
            $line = 16;
            $out += $escape(comment.Book.ImageUrl);
            $out += '"> </div> <div class="bookMega span9"> <h4><strong>';
            $line = 19;
            $out += $escape(comment.Book.Title);
            $out += '</strong></h4> <div class="pull-left">';
            $line = 20;
            $out += $escape(comment.Book.Author);
            $out += '</div> <div class="clearfix"></div> <div class="pull-left">';
            $line = 22;
            $out += $escape(comment.Book.Category);
            $out += '</div> </div> </div> </div> </div> <div class="row-fluid mega"> <table class="pull-right"> <tr> <td class="response"> <a href="Response.html?commentId=';
            $line = 31;
            $out += $escape(comment.Id);
            $out += '"> <span class="glyphicons comments">';
            $line = 32;
            $out += $escape(comment.ResponseSum);
            $out += '</span> </a> </td> <td class="thumbsUp"> <div><span class="glyphicons thumbs_up">';
            $line = 36;
            $out += $escape(comment.LikeSum);
            $out += "</span></div> </td> </tr> </table> </div>";
        } catch (e) {
            throw {
                id: $id,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="container" data-bookid="{{comment.Book.Id}}">\n  <div class="info row-fluid">\n    <div class="user pull-left" id="{{comment.Author.Id}}">\n      <a href="../People/Detail.html?nickname={{comment.Author.Nickname}}">\n        <div class="avatar pull-left"><img src="{{comment.Author.AvatarUrl}}" alt="" class="img-circle"></div>\n        <div class="nickname pull-left">{{comment.Author.Nickname}}</div>\n      </a>\n    </div>\n    <div class="ratingStar pull-left" data-score="{{comment.Score}}"></div>\n  </div>\n  <div class="content">{{comment.Content}}</div>\n  <div class="book row-fluid" id="{{comment.Book}}">\n    <a href="../Book/Detail.html?id={{comment.Book.Id}}"></a>\n    <div class="megaInfo row-fluid">\n      <div class="bookCover span3">\n        <img src="{{comment.Book.ImageUrl}}" alt="" data-srcimg="{{comment.Book.ImageUrl}}">\n      </div>\n      <div class="bookMega span9">\n        <h4><strong>{{comment.Book.Title}}</strong></h4>\n        <div class="pull-left">{{comment.Book.Author}}</div>\n        <div class="clearfix"></div>\n        <div class="pull-left">{{comment.Book.Category}}</div>\n      </div>\n    </div>\n  </div>\n</div>\n<div class="row-fluid mega">\n  <table class="pull-right">\n    <tr>\n      <td class="response">\n        <a href="Response.html?commentId={{comment.Id}}">\n          <span class="glyphicons comments">{{comment.ResponseSum}}</span>\n        </a>\n      </td>\n      <td class="thumbsUp">\n        <div><span class="glyphicons thumbs_up">{{comment.LikeSum}}</span></div>\n      </td>\n    </tr>\n  </table>\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
        return new String($out);
    });
    template("Book/MoreComments", "");
    if (typeof define === "function") {
        define(function() {
            return template;
        });
    } else if (typeof exports !== "undefined") {
        module.exports = template;
    } else {
        global.template = template;
    }
}(this);