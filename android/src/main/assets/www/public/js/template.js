/*TMODJS:{"debug":true,"version":"1.0.0"}*/
!function(String) {
    function template(filename, content) {
        return (/string|function/.test(typeof content) ? compile : renderFile)(filename, content);
    }
    function toString(value, type) {
        return "string" != typeof value && (type = typeof value, "number" === type ? value += "" : value = "function" === type ? toString(value.call(value)) : ""), 
        value;
    }
    function escapeFn(s) {
        return escapeMap[s];
    }
    function escapeHTML(content) {
        return toString(content).replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    }
    function each(data, callback) {
        if (isArray(data)) for (var i = 0, len = data.length; len > i; i++) callback.call(data, data[i], i, data); else for (i in data) callback.call(data, data[i], i);
    }
    function resolve(from, to) {
        var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/, dirname = ("./" + from).replace(/[^/]+$/, ""), filename = dirname + to;
        for (filename = filename.replace(/\/\.\//g, "/"); filename.match(DOUBLE_DOT_RE); ) filename = filename.replace(DOUBLE_DOT_RE, "/");
        return filename;
    }
    function renderFile(filename, data) {
        var fn = template.get(filename) || showDebugInfo({
            filename: filename,
            name: "Render Error",
            message: "Template not found"
        });
        return data ? fn(data) : fn;
    }
    function compile(filename, fn) {
        if ("string" == typeof fn) {
            var string = fn;
            fn = function() {
                return new String(string);
            };
        }
        var render = cache[filename] = function(data) {
            try {
                return new fn(data, filename) + "";
            } catch (e) {
                return showDebugInfo(e)();
            }
        };
        return render.prototype = fn.prototype = utils, render.toString = function() {
            return fn + "";
        }, render;
    }
    function showDebugInfo(e) {
        var type = "{Template Error}", message = e.stack || "";
        if (message) message = message.split("\n").slice(0, 2).join("\n"); else for (var name in e) message += "<" + name + ">\n" + e[name] + "\n\n";
        return function() {
            return "object" == typeof console && console.error(type + "\n\n" + message), type;
        };
    }
    var cache = template.cache = {}, String = this.String, escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, isArray = Array.isArray || function(obj) {
        return "[object Array]" === {}.toString.call(obj);
    }, utils = template.utils = {
        $helpers: {},
        $include: function(filename, data, from) {
            return filename = resolve(from, filename), renderFile(filename, data);
        },
        $string: toString,
        $escape: escapeHTML,
        $each: each
    }, helpers = template.helpers = utils.$helpers;
    template.get = function(filename) {
        return cache[filename.replace(/^\.\//, "")];
    }, template.helper = function(name, helper) {
        helpers[name] = helper;
    }, "function" == typeof define ? define(function() {
        return template;
    }) : "undefined" != typeof exports ? module.exports = template : this.template = template, 
    template.helper("Math", Math), template.helper("$substring", function(string, index, length) {
        return (string ? string.length : 0) > length + index ? string.substring(index, length) + "..." : string;
    }), template.helper("$add", function() {
        for (var result = 0, i = arguments.length - 1; i >= 0; i--) result += arguments[i] || 0;
        return result;
    }), template.helper("$len", function(collection) {
        return collection.length;
    }), template.helper("$array", function(size) {
        return new Array(size);
    }), template.helper("$sub", function(x, y) {
        return x - y;
    }), /*v:10*/
    template("Article/Detail", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), $escape = $utils.$escape, Article = $data.Article, $string = $utils.$string, RelatedBooks = $data.RelatedBooks, $each = $utils.$each, $out = ($data.$value, 
            $data.$index, "");
            return $out += '<div class="container" data-reviewid="', $line = 1, $out += $escape(Article.Id), 
            $out += '"> <div class="row-fluid titleImage"><img src="', $line = 2, $out += $escape(Article.ImageUrl), 
            $out += '?imageView/2/w/360"></div> <div class="row-fluid title">', $line = 3, $out += $escape(Article.Title), 
            $out += '</div> <div class="info row-fluid"> <div class="user pull-left" id="', 
            $line = 5, $out += $escape(Article.Author.Id), $out += '"> <a href="../People/Detail.html?nickname=', 
            $line = 6, $out += $escape(Article.Author.Nickname), $out += '"> <div class="avatar pull-left"><img src="', 
            $line = 7, $out += $escape(Article.Author.AvatarUrl), $out += '" alt="" class="img-circle"></div> <div class="nickname pull-left">', 
            $line = 8, $out += $escape(Article.Author.Nickname), $out += '</div> </a> </div> </div> <div class="content">', 
            $line = 12, $out += $string(Article.Content), $out += "</div> ", $line = 13, RelatedBooks && ($out += ' <div class="section row-fluid similarBooks"> <div class="row-fluid title"> <span>相关书籍</span> </div> <div class="row-fluid"> ', 
            $line = 19, $each(RelatedBooks, function($value) {
                $out += ' <div class="book span3"> <a href="../Book/Detail.html?id=', $line = 21, 
                $out += $escape($value.Id), $out += '"> <div class="bookCover"> <div class="wrapper"><img src="', 
                $line = 23, $out += $escape($value.ImageUrl), $out += '" alt=""></div> </div> <div class="bookTitle text-center">', 
                $line = 25, $out += $escape($value.Title), $out += "</div> </a> </div> ", $line = 28;
            }), $out += " </div> </div> ", $line = 31), $out += ' </div> <div class="row-fluid mega"> <table class="pull-right"> <tr> <td class="response"> <a href="Response.html?id=', 
            $line = 37, $out += $escape(Article.Id), $out += "&authorId=", $line = 37, $out += $escape(Article.Author.Id), 
            $out += '"> <span class="glyphicons comments">', $line = 38, $out += $escape(Article.ResponseSum), 
            $out += '</span> </a> </td> <td class="viewcount"> <div><span class="glyphicons eye_open">', 
            $line = 42, $out += $escape(Article.ViewCount), $out += "</span></div> </td> </tr> </table> </div>", 
            new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="container" data-reviewid="{{Article.Id}}">\n  <div class="row-fluid titleImage"><img src="{{Article.ImageUrl}}?imageView/2/w/360"></div>\n  <div class="row-fluid title">{{Article.Title}}</div>\n  <div class="info row-fluid">\n    <div class="user pull-left" id="{{Article.Author.Id}}">\n      <a href="../People/Detail.html?nickname={{Article.Author.Nickname}}">\n        <div class="avatar pull-left"><img src="{{Article.Author.AvatarUrl}}" alt="" class="img-circle"></div>\n        <div class="nickname pull-left">{{Article.Author.Nickname}}</div>\n      </a>\n    </div>\n  </div>\n  <div class="content">{{#Article.Content}}</div>\n  {{if RelatedBooks}}\n  <div class="section row-fluid similarBooks">\n    <div class="row-fluid title">\n      <span>相关书籍</span>\n    </div>\n    <div class="row-fluid">\n      {{each RelatedBooks}}\n      <div class="book span3">\n        <a href="../Book/Detail.html?id={{$value.Id}}">\n          <div class="bookCover">\n            <div class="wrapper"><img src="{{$value.ImageUrl}}" alt=""></div>\n          </div>\n          <div class="bookTitle text-center">{{$value.Title}}</div>\n        </a>\n      </div>\n      {{/each}}\n    </div>\n  </div>\n  {{/if}}\n</div>\n<div class="row-fluid mega">\n  <table class="pull-right">\n    <tr>\n      <td class="response">\n        <a href="Response.html?id={{Article.Id}}&authorId={{Article.Author.Id}}">\n          <span class="glyphicons comments">{{Article.ResponseSum}}</span>\n        </a>\n      </td>\n      <td class="viewcount">\n        <div><span class="glyphicons eye_open">{{Article.ViewCount}}</span></div>\n      </td>\n    </tr>\n  </table>\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:4*/
    template("Article/List", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), $each = $utils.$each, Data = $data.Data, include = ($data.$value, 
            $data.$index, function(filename, data) {
                data = data || $data;
                var text = $utils.$include(filename, data, $filename);
                return $out += text;
            }), $out = "";
            return $out += '<div class="container"> ', $line = 2, $each(Data, function($value) {
                $out += " ", $line = 3, include("../public/ArticleItem", $value), $out += " ", $line = 4;
            }), $out += " </div>", new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="container">\n  {{each Data}}\n  {{include "../public/ArticleItem" $value}}\n  {{/each}}\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:4*/
    template("Billboard/Detail", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), $escape = $utils.$escape, Billboard = $data.Billboard, IsDispNextPlan = $data.IsDispNextPlan, $each = $utils.$each, include = ($data.$value, 
            $data.$index, function(filename, data) {
                data = data || $data;
                var text = $utils.$include(filename, data, $filename);
                return $out += text;
            }), $out = "";
            return $out += '<div class="container"> <div class="row-fluid text-center">本期发布于', 
            $line = 2, $out += $escape(Billboard.CreationTime), $out += "</div> ", $line = 3, 
            IsDispNextPlan === !0 && ($out += ' <div class="desc row-fluid text-center">距离下期发布还有', 
            $line = 4, $out += $escape(Billboard.NextVersionPlan), $out += "</div> ", $line = 5), 
            $out += ' <hr> <div class="listDetail tab-pane active" id="allbooks"> <ul class="unstyled"> ', 
            $line = 9, $each(Billboard.Books, function($value) {
                $out += " ", $line = 10, include("../public/BookWithComment", $value), $out += " ", 
                $line = 11;
            }), $out += ' </ul> </div> </div> <div class="mega"> <table> <tr> <td class="span6"> <div class="glyphicons eye_open">', 
            $line = 19, $out += $escape(Billboard.ViewCount), $out += '</div> </td> <td class="span6"> <div class="glyphicons heart">', 
            $line = 22, $out += $escape(Billboard.LikeSum), $out += "</div> </td> </tr> </table> </div>", 
            new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="container">\n  <div class="row-fluid text-center">本期发布于{{Billboard.CreationTime}}</div>\n  {{if IsDispNextPlan === true}}\n  <div class="desc row-fluid text-center">距离下期发布还有{{Billboard.NextVersionPlan}}</div>\n  {{/if}}\n  <hr>\n  <div class="listDetail tab-pane active" id="allbooks">\n    <ul class="unstyled">\n      {{each Billboard.Books}}\n      {{include "../public/BookWithComment" $value}}\n      {{/each}}\n    </ul>\n  </div>\n</div>\n<div class="mega">\n  <table>\n    <tr>\n      <td class="span6">\n        <div class="glyphicons eye_open">{{Billboard.ViewCount}}</div>\n      </td>\n      <td class="span6">\n        <div class="glyphicons heart">{{Billboard.LikeSum}}</div>\n      </td>\n    </tr>\n  </table>\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:4*/
    template("Billboard/Index", function($data, $filename) {
        try {
            var $utils = this, $helpers = $utils.$helpers, $line = 0, $each = $utils.$each, Data = $data.Data, $escape = ($data.$c, 
            $data.$i, $utils.$escape), $string = $utils.$string, $substring = $helpers.$substring, $sub = ($data.$d, 
            $data.$j, $helpers.$sub), $out = "";
            return $out += '<div class="container"> ', $line = 2, $each(Data, function($c) {
                $out += ' <div class="row-fluid billboard"> <a href="Detail.html?title=', $line = 4, 
                $out += $escape($c.Title), $out += "&version=", $line = 4, $out += $escape($c.Version), 
                $out += '"> <div class="row-fluid info"> <div class="span4"><img src="', $line = 6, 
                $out += $escape($c.ImageUrl), $out += '" alt=""></div> <div class="span8"> <div class="row-fluid"><h4>', 
                $line = 8, $out += $escape($c.Title), $out += '</h4></div> <div class="row-fluid muted">更新于', 
                $line = 9, $out += $escape($c.CreationTime), $out += '</div> <div class="row-fluid description">', 
                $line = 10, $out += $string($substring($c.Description, 0, 55)), $out += '</div> </div> </div> </a> <div class="row-fluid versions"> ', 
                $line = 15, $each($c.array, function($d, $j) {
                    $out += ' <div class="ver pull-left text-center"><a href="Detail.html?title=', $line = 16, 
                    $out += $escape($c.Title), $out += "&version=", $line = 16, $out += $string($sub($c.Version, $j)), 
                    $out += '">', $line = 16, $out += $string($sub($c.Version, $j)), $out += "</a></div> ", 
                    $line = 17;
                }), $out += ' <div class="ver pull-left text-center more ', $line = 18, $c.Version <= 5 && ($out += "hide", 
                $line = 18), $out += '">更多<span class="halflings chevron-down"></span></div> </div> </div> ', 
                $line = 21;
            }), $out += " </div>", new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="container">\n  {{each Data as $c $i}}\n  <div class="row-fluid billboard">\n    <a href="Detail.html?title={{$c.Title}}&version={{$c.Version}}">\n      <div class="row-fluid info">\n        <div class="span4"><img src="{{$c.ImageUrl}}" alt=""></div>\n        <div class="span8">\n          <div class="row-fluid"><h4>{{$c.Title}}</h4></div>\n          <div class="row-fluid muted">更新于{{$c.CreationTime}}</div>\n          <div class="row-fluid description">{{$substring $c.Description 0 55}}</div>\n        </div>\n      </div>\n    </a>\n    <div class="row-fluid versions">\n      {{each $c.array as $d $j}}\n      <div class="ver pull-left text-center"><a href="Detail.html?title={{$c.Title}}&version={{$sub $c.Version $j}}">{{$sub $c.Version $j}}</a></div>\n      {{/each}}\n      <div class="ver pull-left text-center more {{if $c.Version <= 5}}hide{{/if}}">更多<span class="halflings chevron-down"></span></div>\n    </div>\n  </div>\n  {{/each}}\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:6*/
    template("Book/Detail", function($data, $filename) {
        try {
            var $utils = this, $helpers = $utils.$helpers, $line = 0, $escape = $utils.$escape, Book = $data.Book, UsersumOfReading = $data.UsersumOfReading, IsLogin = $data.IsLogin, UserBookStatus = $data.UserBookStatus, UserReview = $data.UserReview, UserComment = $data.UserComment, $string = $utils.$string, $substring = $helpers.$substring, $each = $utils.$each, RelatedBooklists = ($data.$value, 
            $data.$index, $data.RelatedBooklists), BooksWithSameAuthor = ($data.$c, $data.$i, 
            $data.$d, $data.$j, $data.BooksWithSameAuthor), $out = "";
            return $out += '<div class="container" id="', $line = 1, $out += $escape(Book.Id), 
            $out += '"> <div class="section row-fluid mainInfo"> <div class="row-fluid"> <div class="span4 bookCover"><div class="wrapper"><img src="', 
            $line = 4, $out += $escape(Book.ImageUrl), $out += '" alt=""></div></div> <div class="span8 basicInfo"> <div class="row-fluid"><div class="span5 text-right">作者：</div><div class="badge pull-left">', 
            $line = 6, $out += $escape(Book.Author), $out += '</div></div> <div class="row-fluid"><div class="span5 text-right">状态：</div><div class="span7">', 
            $line = 7, $out += $escape(Book.Status), $out += '</div></div> <div class="row-fluid"><div class="span5 text-right">字数：</div><div class="span7">', 
            $line = 8, $out += $escape(Book.WordCount), $out += '</div></div> <div class="row-fluid"><div class="span5 text-right">类型：</div><div class="badge pull-left">', 
            $line = 9, $out += $escape(Book.Category), $out += '</div></div> <div class="row-fluid"><div class="span5 text-right">最近更新：</div><div class="span7 dotdotdotForLongText">', 
            $line = 10, $out += $escape(Book.LastUpdateDate), $out += '</div></div> </div> </div> <div class="row-fluid subSection2"> <div class="span6 text-center"> <div class="score">', 
            $line = 15, Book.Score ? ($line = 15, $out += $escape(Book.Score), $line = 15) : ($out += "0", 
            $line = 15), $out += '</div> <div class="ratingStar" data-score="', $line = 16, 
            $out += $escape(Book.Score), $out += '"></div> <div class="ratingSum">评分来自', $line = 17, 
            $out += $escape(Book.ScoreSum), $out += '书友</div> </div> <div class="span6 text-center"><span>', 
            $line = 19, $out += $escape(UsersumOfReading), $out += '</span><span class="reading">正在看</span></div> </div> <div class="row-fluid"></div> </div> ', 
            $line = 23, IsLogin === !0 && ($out += ' <div class="section row-fluid readStatus"> <div class="row-fluid status"> <div class="span4 text-center statusAction" data-statuscode="wanttoread"> <a href="#"> <div class="wanttoread"> <img src="../public/img/WantToRead', 
            $line = 29, UserBookStatus && ($line = 29, 1 === UserBookStatus.Status && ($out += "_Active", 
            $line = 29), $line = 29), $out += '.png" alt="" class="pull-left"> <div class="pull-left" id="wanttoread">我想读</div> </div> </a> </div> <div class="span4 text-center statusAction" data-statuscode="read"> <a href="WriteReview.html?bookid=', 
            $line = 35, $out += $escape(Book.Id), $out += "&status=read&category=", $line = 35, 
            $out += $escape(Book.Category), $out += "&bookcover=", $line = 35, $out += $escape(Book.ImageUrl), 
            $out += "&isforman=", $line = 35, $out += $escape(Book.ForMan), $out += "&booktitle=", 
            $line = 35, $out += $escape(Book.Title), $out += '"> <div class="read"> <img src="../public/img/Read', 
            $line = 37, UserBookStatus && ($line = 37, 4 === UserBookStatus.Status && ($out += "_Active", 
            $line = 37), $line = 37), $out += '.png" alt="" class="pull-left"> <div class="pull-left" id="read">我读过</div> </div> </a> </div> <div class="span4 text-center statusAction" data-statuscode="giveup"> <a href="WriteReview.html?bookid=', 
            $line = 43, $out += $escape(Book.Id), $out += "&status=giveup&category=", $line = 43, 
            $out += $escape(Book.Category), $out += "&bookcover=", $line = 43, $out += $escape(Book.ImageUrl), 
            $out += "&isforman=", $line = 43, $out += $escape(Book.ForMan), $out += "&booktitle=", 
            $line = 43, $out += $escape(Book.Title), $out += '"> <div class="giveup"> <img src="../public/img/GiveUp', 
            $line = 45, UserBookStatus && ($line = 45, 3 === UserBookStatus.Status && ($out += "_Active", 
            $line = 45), $line = 45), $out += '.png" alt="" class="pull-left"> <div class="pull-left" id="giveup">弃读</div> </div> </a> </div> </div> <div class="row-fluid selfComment ', 
            $line = 51, UserBookStatus && ($line = 51, 2 === UserBookStatus.Status && ($out += "hide", 
            $line = 51), $out += " ", $line = 51, 0 === UserBookStatus.Status && ($out += "hide", 
            $line = 51), $line = 51), $out += '"> <div class="row-fluid ', $line = 52, UserReview ? $line = 52 : ($line = 52, 
            UserComment ? $line = 52 : ($out += "hide", $line = 52), $line = 52), $out += '"> <div class="offset', 
            $line = 53, UserBookStatus && ($line = 53, 1 === UserBookStatus.Status ? ($out += "1", 
            $line = 53) : ($line = 53, 4 === UserBookStatus.Status ? ($out += "5", $line = 53) : ($line = 53, 
            3 === UserBookStatus.Status && ($out += "9", $line = 53), $line = 53), $line = 53), 
            $line = 53), $out += ' text-center arrow"></div> </div> <div class="row-fluid"> ', 
            $line = 56, UserReview ? ($out += ' <div class="review row-fluid"> <div class="firstRow row-fluid"> <div class="nickname pull-left">我读过这本书</div> <div class="reviewScore pull-left" data-score="', 
            $line = 60, $out += $escape(UserReview.Score), $out += '"></div> <div class="mega pull-right"> <table> <tr> <td> <div class="glyphicons comments">', 
            $line = 65, $out += $escape(UserReview.ResponseSum), $out += '</div> </td> <td> <div class="glyphicons thumbs_up">', 
            $line = 68, $out += $escape(UserReview.LikeSum), $out += '</div> </td> </tr> </table> </div> </div> <div class="secondRow row-fluid"> <div class="reviewTitle pull-left dotdotdotForLongText">', 
            $line = 75, $out += $escape(UserReview.Title), $out += '</div> </div> <div class="content row-fluid">', 
            $line = 77, $out += $string($substring(UserReview.Content, 0, 80)), $out += "</div> </div> ", 
            $line = 79) : ($out += " ", $line = 80, UserComment && ($out += ' <div class="review row-fluid"> <div class="firstRow row-fluid"> <div class="nickname pull-left">我读过这本书</div> <div class="reviewScore pull-left" data-score="', 
            $line = 84, $out += $escape(UserComment.Score), $out += '"></div> <div class="mega pull-right"> <table> <tr> <td> <div class="glyphicons comments">', 
            $line = 89, $out += $escape(UserComment.ResponseSum), $out += '</div> </td> <td> <div class="glyphicons thumbs_up">', 
            $line = 92, $out += $escape(UserComment.LikeSum), $out += '</div> </td> </tr> </table> </div> </div> <div class="secondRow row-fluid"> <div class="pull-right timeStamp">', 
            $line = 99, $out += $escape(UserComment.CreationTime), $out += '</div> </div> <div class="content row-fluid">', 
            $line = 101, $out += $string($substring(UserComment.Content, 0, 80)), $out += "</div> </div> ", 
            $line = 103), $out += " ", $line = 104), $out += " </div> </div> ", $line = 107, 
            0 === UserBookStatus.Status && ($out += " <hr> ", $line = 109), $out += ' <div class="row-fluid action"> <div class="span6 text-center"> <div class="addToBooklist"> <img src="../public/img/AddToBooklist.png" alt="" class="pull-left"> <div class="pull-left text-left">加入我的书单</div> </div> </div> <div class="span6 text-center write"> <a href="WriteReview.html?status=read&bookid=', 
            $line = 118, $out += $escape(Book.Id), $out += "&category=", $line = 118, $out += $escape(Book.Category), 
            $out += "&bookcover=", $line = 118, $out += $escape(Book.ImageUrl), $out += "&isforman=", 
            $line = 118, $out += $escape(Book.ForMan), $out += "&booktitle=", $line = 118, $out += $escape(Book.Title), 
            $out += '"></a> <div class="writeComment"> <img src="../public/img/Pencil.png" alt="" class="pull-left"> <div class="pull-left">写评论</div> </div> </div> <div class="span2"></div> </div> </div> ', 
            $line = 127), $out += " ", $line = 128, IsLogin === !0 ? ($out += ' <div class="readButton text-center login" data-url="', 
            $line = 129, $out += $escape(Book.Url), $out += '"> <span class="before"></span> <span>开始阅读</span> <span class="after"></span> </div> ', 
            $line = 134) : ($out += ' <div class="readButton text-center" data-url="', $line = 135, 
            $out += $escape(Book.Url), $out += '">开始阅读</div> ', $line = 136), $out += ' <div class="section row-fluid summary"> <div class="row-fluid title">内容简介</div> <div class="row-fluid summaryContent">', 
            $line = 139, $out += $escape(Book.Summary), $out += '</div> <div class="expand pull-right"></div> </div> ', 
            $line = 142, Book.Comments && ($out += ' <div class="section row-fluid comments"> <div class="row-fluid title"> <span>短评（', 
            $line = 145, $out += $escape(Book.CommentSum), $out += '）</span> <span class="more pull-right"><a href="MoreComments.html?bookid=', 
            $line = 146, $out += $escape(Book.Id), $out += '">更多&nbsp;...</a></span> </div> <div class="row-fluid"> ', 
            $line = 149, $each(Book.Comments, function($value) {
                $out += ' <div class="row-fluid comment" id="', $line = 150, $out += $escape($value.Id), 
                $out += '"> <a href="../Comment/Detail.html?id=', $line = 151, $out += $escape($value.Id), 
                $out += '"></a> <div class="row-fluid"><div class="author pull-left"><a href="../People/Detail.html?nickname=', 
                $line = 152, $out += $escape($value.Author.Nickname), $out += '">', $line = 152, 
                $out += $escape($value.Author.Nickname), $out += '</a></div><div class="cmtScore pull-left" data-score="', 
                $line = 152, $out += $escape($value.Score), $out += '"></div></div> <div class="row-fluid"><div class="content">', 
                $line = 153, $out += $escape($value.Content), $out += '</div></div> <div class="row-fluid mega"> <table class="pull-right"> <tr> <td> <div class="glyphicons comments">', 
                $line = 158, $out += $escape($value.ResponseSum), $out += '</div> </td> <td> <div class="glyphicons thumbs_up">', 
                $line = 161, $out += $escape($value.LikeSum), $out += "</div> </td> </tr> </table> </div> </div> ", 
                $line = 167;
            }), $out += " </div> </div> ", $line = 170), $out += " ", $line = 171, Book.Reviews && ($out += ' <div class="section row-fluid reviews"> <div class="row-fluid title"> <span>书评（', 
            $line = 174, $out += $escape(Book.ReviewSum), $out += '）</span> <span class="more pull-right"><a href="MoreReviews.html?bookid=', 
            $line = 175, $out += $escape(Book.Id), $out += '">更多&nbsp;...</a></span> </div> <div class="row-fluid"> ', 
            $line = 178, $each(Book.Reviews, function($value) {
                $out += ' <div class="review row-fluid" id="', $line = 179, $out += $escape($value.Id), 
                $out += '"> <a href="../Review/Detail.html?id=', $line = 180, $out += $escape($value.Id), 
                $out += '"></a> <div class="megaInfo row-fluid"> <div class="userAvatar pull-left"><a href="../People/Detail.html?nickname=', 
                $line = 182, $out += $escape($value.Author.Nickname), $out += '"><img src="', $line = 182, 
                $out += $escape($value.Author.AvatarUrl), $out += '" alt=""></a></div> <div class="otherInfo pull-left"> <div class="firstRow row-fluid"> <div class="nickname pull-left"><a href="../People/Detail.html?nickname=', 
                $line = 185, $out += $escape($value.Author.Nickname), $out += '">', $line = 185, 
                $out += $escape($value.Author.Nickname), $out += '</a></div> <div class="reviewScore pull-left" data-score="', 
                $line = 186, $out += $escape($value.Score), $out += '"></div> <div class="mega pull-right"> <table> <tr> <td> <div class="glyphicons comments">', 
                $line = 191, $out += $escape($value.ResponseSum), $out += '</div> </td> <td> <div class="glyphicons thumbs_up">', 
                $line = 194, $out += $escape($value.LikeSum), $out += '</div> </td> </tr> </table> </div> </div> <div class="secondRow row-fluid"> <div class="reviewTitle pull-left dotdotdotForLongText">', 
                $line = 201, $out += $escape($value.Title), $out += '</div> </div> </div> </div> <div class="content row-fluid">', 
                $line = 205, $out += $string($substring($value.Content, 0, 80)), $out += "</div> </div> ", 
                $line = 207;
            }), $out += " </div> </div> ", $line = 210), $out += " ", $line = 211, RelatedBooklists && ($out += ' <div class="section row-fluid booklists"> <div class="row-fluid title"> <span>收藏这本书的书单</span> </div> <div class="row-fluid"> ', 
            $line = 217, $each(RelatedBooklists, function($c) {
                $out += ' <div class="booklist pull-left span6"> <a href="../Booklist/Detail.html?id=', 
                $line = 219, $out += $escape($c.Id), $out += '"></a> <div class="row-fluid booklistTitle"><div class="titleText pull-left">', 
                $line = 220, $out += $escape($c.Title), $out += '</div><div class="pull-right">(', 
                $line = 220, $out += $escape($c.BookSum), $out += ')</div></div> <div class="row-fluid nickname">', 
                $line = 221, $out += $escape($c.Author.Nickname), $out += '</div> <div class="row-fluid"> ', 
                $line = 223, $each($c.BookCoverUrls, function($d, $j) {
                    $out += " ", $line = 224, 3 >= $j && ($out += ' <div class="bookCover span3"><div class="wrapper"><img src="', 
                    $line = 225, $out += $escape($d), $out += '" alt=""></div></div> ', $line = 226), 
                    $out += " ", $line = 227;
                }), $out += ' </div> <div class="row-fluid mega"> <div class="span6"><div class="glyphicons comments">', 
                $line = 230, $out += $escape($c.ResponseSum), $out += '</div></div> <div class="span6"><div class="glyphicons heart">', 
                $line = 231, $out += $escape($c.SubscribeSum), $out += "</div></div> </div> </div> ", 
                $line = 234;
            }), $out += " </div> </div> ", $line = 237), $out += " ", $line = 238, BooksWithSameAuthor && ($out += ' <div class="section row-fluid booksBySameAuthor"> <div class="row-fluid title"> <span>作者的其他书</span> </div> <div class="row-fluid"> ', 
            $line = 244, $each(BooksWithSameAuthor, function($value) {
                $out += ' <div class="sameBook span3"> <a href="Detail.html?id=', $line = 246, $out += $escape($value.Id), 
                $out += '"> <div class="bookCover"> <div class="wrapper"><img src="', $line = 248, 
                $out += $escape($value.ImageUrl), $out += '" alt=""></div> </div> <div class="bookTitle text-center">', 
                $line = 250, $out += $escape($value.Title), $out += "</div> </a> </div> ", $line = 253;
            }), $out += " </div> </div> ", $line = 256), $out += " ", $line = 257, Book.SimilarBooks && ($out += ' <div class="section row-fluid similarBooks"> <div class="row-fluid title"> <span>喜欢这本书的人也喜欢</span> </div> <div class="row-fluid"> ', 
            $line = 263, $each(Book.SimilarBooks, function($c, $i) {
                $out += " ", $line = 264, 3 >= $i && ($out += ' <div class="sameBook span3"> <a href="Detail.html?id=', 
                $line = 266, $out += $escape($c.Id), $out += '"> <div class="bookCover"> <div class="wrapper"><img src="', 
                $line = 268, $out += $escape($c.ImageUrl), $out += '" alt=""></div> </div> <div class="bookTitle text-center">', 
                $line = 270, $out += $escape($c.Title), $out += "</div> </a> </div> ", $line = 273), 
                $out += " ", $line = 274;
            }), $out += " </div> </div> ", $line = 277), $out += " </div>", new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="container" id="{{Book.Id}}">\n  <div class="section row-fluid mainInfo">\n    <div class="row-fluid">\n      <div class="span4 bookCover"><div class="wrapper"><img src="{{Book.ImageUrl}}" alt=""></div></div>\n      <div class="span8 basicInfo">\n        <div class="row-fluid"><div class="span5 text-right">作者：</div><div class="badge pull-left">{{Book.Author}}</div></div>\n        <div class="row-fluid"><div class="span5 text-right">状态：</div><div class="span7">{{Book.Status}}</div></div>\n        <div class="row-fluid"><div class="span5 text-right">字数：</div><div class="span7">{{Book.WordCount}}</div></div>\n        <div class="row-fluid"><div class="span5 text-right">类型：</div><div class="badge pull-left">{{Book.Category}}</div></div>\n        <div class="row-fluid"><div class="span5 text-right">最近更新：</div><div class="span7 dotdotdotForLongText">{{Book.LastUpdateDate}}</div></div>\n      </div>\n    </div>\n    <div class="row-fluid subSection2">\n      <div class="span6 text-center">\n        <div class="score">{{if Book.Score}}{{Book.Score}}{{else}}0{{/if}}</div>\n        <div class="ratingStar" data-score="{{Book.Score}}"></div>\n        <div class="ratingSum">评分来自{{Book.ScoreSum}}书友</div>\n      </div>\n      <div class="span6 text-center"><span>{{UsersumOfReading}}</span><span class="reading">正在看</span></div>\n    </div>\n    <div class="row-fluid"></div>\n  </div>\n  {{if IsLogin === true}}\n  <div class="section row-fluid readStatus">\n    <div class="row-fluid status">\n      <div class="span4 text-center statusAction" data-statuscode="wanttoread">\n        <a href="#">\n          <div class="wanttoread">\n            <img src="../public/img/WantToRead{{if UserBookStatus}}{{if UserBookStatus.Status === 1}}_Active{{/if}}{{/if}}.png" alt="" class="pull-left">\n            <div class="pull-left" id="wanttoread">我想读</div>\n          </div>\n        </a>\n      </div>\n      <div class="span4 text-center statusAction" data-statuscode="read">\n        <a href="WriteReview.html?bookid={{Book.Id}}&status=read&category={{Book.Category}}&bookcover={{Book.ImageUrl}}&isforman={{Book.ForMan}}&booktitle={{Book.Title}}">\n          <div class="read">\n            <img src="../public/img/Read{{if UserBookStatus}}{{if UserBookStatus.Status === 4}}_Active{{/if}}{{/if}}.png" alt="" class="pull-left">\n            <div class="pull-left" id="read">我读过</div>\n          </div>\n        </a>\n      </div>\n      <div class="span4 text-center statusAction" data-statuscode="giveup">\n        <a href="WriteReview.html?bookid={{Book.Id}}&status=giveup&category={{Book.Category}}&bookcover={{Book.ImageUrl}}&isforman={{Book.ForMan}}&booktitle={{Book.Title}}">\n          <div class="giveup">\n            <img src="../public/img/GiveUp{{if UserBookStatus}}{{if UserBookStatus.Status === 3}}_Active{{/if}}{{/if}}.png" alt="" class="pull-left">\n            <div class="pull-left" id="giveup">弃读</div>\n          </div>\n        </a>\n      </div>\n    </div>\n    <div class="row-fluid selfComment {{if UserBookStatus}}{{if UserBookStatus.Status === 2}}hide{{/if}} {{if UserBookStatus.Status === 0}}hide{{/if}}{{/if}}">\n      <div class="row-fluid {{if UserReview}}{{else}}{{if UserComment}}{{else}}hide{{/if}}{{/if}}">\n        <div class="offset{{if UserBookStatus}}{{if UserBookStatus.Status === 1}}1{{else}}{{if UserBookStatus.Status === 4}}5{{else}}{{if UserBookStatus.Status === 3}}9{{/if}}{{/if}}{{/if}}{{/if}} text-center arrow"></div>\n      </div>\n      <div class="row-fluid">\n        {{if UserReview}}\n        <div class="review row-fluid">\n          <div class="firstRow row-fluid">\n            <div class="nickname pull-left">我读过这本书</div>\n            <div class="reviewScore pull-left" data-score="{{UserReview.Score}}"></div>\n            <div class="mega pull-right">\n              <table>\n                <tr>\n                  <td>\n                    <div class="glyphicons comments">{{UserReview.ResponseSum}}</div>\n                  </td>\n                  <td>\n                    <div class="glyphicons thumbs_up">{{UserReview.LikeSum}}</div>\n                  </td>\n                </tr>\n              </table>\n            </div>\n          </div>\n          <div class="secondRow row-fluid">\n            <div class="reviewTitle pull-left dotdotdotForLongText">{{UserReview.Title}}</div>\n          </div>\n          <div class="content row-fluid">{{$substring UserReview.Content 0 80}}</div>\n        </div>\n        {{else}}\n        {{if UserComment}}\n        <div class="review row-fluid">\n          <div class="firstRow row-fluid">\n            <div class="nickname pull-left">我读过这本书</div>\n            <div class="reviewScore pull-left" data-score="{{UserComment.Score}}"></div>\n            <div class="mega pull-right">\n              <table>\n                <tr>\n                  <td>\n                    <div class="glyphicons comments">{{UserComment.ResponseSum}}</div>\n                  </td>\n                  <td>\n                    <div class="glyphicons thumbs_up">{{UserComment.LikeSum}}</div>\n                  </td>\n                </tr>\n              </table>\n            </div>\n          </div>\n          <div class="secondRow row-fluid">\n            <div class="pull-right timeStamp">{{UserComment.CreationTime}}</div>\n          </div>\n          <div class="content row-fluid">{{$substring UserComment.Content 0 80}}</div>\n        </div>\n        {{/if}}\n        {{/if}}\n      </div>\n    </div>\n    {{if UserBookStatus.Status === 0}}\n    <hr>\n    {{/if}}\n    <div class="row-fluid action">\n      <div class="span6 text-center">\n        <div class="addToBooklist">\n          <img src="../public/img/AddToBooklist.png" alt="" class="pull-left">\n          <div class="pull-left text-left">加入我的书单</div>\n        </div>\n      </div>\n      <div class="span6 text-center write">\n        <a href="WriteReview.html?status=read&bookid={{Book.Id}}&category={{Book.Category}}&bookcover={{Book.ImageUrl}}&isforman={{Book.ForMan}}&booktitle={{Book.Title}}"></a>\n        <div class="writeComment">\n          <img src="../public/img/Pencil.png" alt="" class="pull-left">\n          <div class="pull-left">写评论</div>\n        </div>\n      </div>\n      <div class="span2"></div>\n    </div>\n  </div>\n  {{/if}}\n  {{if IsLogin === true}}\n  <div class="readButton text-center login" data-url="{{Book.Url}}">\n    <span class="before"></span>\n    <span>开始阅读</span>\n    <span class="after"></span>\n  </div>\n  {{else}}\n  <div class="readButton text-center" data-url="{{Book.Url}}">开始阅读</div>\n  {{/if}}\n  <div class="section row-fluid summary">\n    <div class="row-fluid title">内容简介</div>\n    <div class="row-fluid summaryContent">{{Book.Summary}}</div>\n    <div class="expand pull-right"></div>\n  </div>\n  {{if Book.Comments}}\n  <div class="section row-fluid comments">\n    <div class="row-fluid title">\n      <span>短评（{{Book.CommentSum}}）</span>\n      <span class="more pull-right"><a href="MoreComments.html?bookid={{Book.Id}}">更多&nbsp;...</a></span>\n    </div>\n    <div class="row-fluid">\n      {{each Book.Comments}}\n      <div class="row-fluid comment" id="{{$value.Id}}">\n        <a href="../Comment/Detail.html?id={{$value.Id}}"></a>\n        <div class="row-fluid"><div class="author pull-left"><a href="../People/Detail.html?nickname={{$value.Author.Nickname}}">{{$value.Author.Nickname}}</a></div><div class="cmtScore pull-left" data-score="{{$value.Score}}"></div></div>\n        <div class="row-fluid"><div class="content">{{$value.Content}}</div></div>\n        <div class="row-fluid mega">\n          <table class="pull-right">\n            <tr>\n              <td>\n                <div class="glyphicons comments">{{$value.ResponseSum}}</div>\n              </td>\n              <td>\n                <div class="glyphicons thumbs_up">{{$value.LikeSum}}</div>\n              </td>\n            </tr>\n          </table>\n        </div>\n      </div>\n      {{/each}}\n    </div>\n  </div>\n  {{/if}}\n  {{if Book.Reviews}}\n  <div class="section row-fluid reviews">\n    <div class="row-fluid title">\n      <span>书评（{{Book.ReviewSum}}）</span>\n      <span class="more pull-right"><a href="MoreReviews.html?bookid={{Book.Id}}">更多&nbsp;...</a></span>\n    </div>\n    <div class="row-fluid">\n      {{each Book.Reviews}}\n      <div class="review row-fluid" id="{{$value.Id}}">\n        <a href="../Review/Detail.html?id={{$value.Id}}"></a>\n        <div class="megaInfo row-fluid">\n          <div class="userAvatar pull-left"><a href="../People/Detail.html?nickname={{$value.Author.Nickname}}"><img src="{{$value.Author.AvatarUrl}}" alt=""></a></div>\n          <div class="otherInfo pull-left">\n            <div class="firstRow row-fluid">\n              <div class="nickname pull-left"><a href="../People/Detail.html?nickname={{$value.Author.Nickname}}">{{$value.Author.Nickname}}</a></div>\n              <div class="reviewScore pull-left" data-score="{{$value.Score}}"></div>\n              <div class="mega pull-right">\n                <table>\n                  <tr>\n                    <td>\n                      <div class="glyphicons comments">{{$value.ResponseSum}}</div>\n                    </td>\n                    <td>\n                      <div class="glyphicons thumbs_up">{{$value.LikeSum}}</div>\n                    </td>\n                  </tr>\n                </table>\n              </div>\n            </div>\n            <div class="secondRow row-fluid">\n              <div class="reviewTitle pull-left dotdotdotForLongText">{{$value.Title}}</div>\n            </div>\n          </div>\n        </div>\n        <div class="content row-fluid">{{$substring $value.Content 0 80}}</div>\n      </div>\n      {{/each}}\n    </div>\n  </div>\n  {{/if}}\n  {{if RelatedBooklists}}\n  <div class="section row-fluid booklists">\n    <div class="row-fluid title">\n      <span>收藏这本书的书单</span>\n    </div>\n    <div class="row-fluid">\n      {{each RelatedBooklists as $c $i}}\n      <div class="booklist pull-left span6">\n        <a href="../Booklist/Detail.html?id={{$c.Id}}"></a>\n        <div class="row-fluid booklistTitle"><div class="titleText pull-left">{{$c.Title}}</div><div class="pull-right">({{$c.BookSum}})</div></div>\n        <div class="row-fluid nickname">{{$c.Author.Nickname}}</div>\n        <div class="row-fluid">\n          {{each $c.BookCoverUrls as $d $j}}\n          {{if $j <= 3}}\n          <div class="bookCover span3"><div class="wrapper"><img src="{{$d}}" alt=""></div></div>\n          {{/if}}\n          {{/each}}\n        </div>\n        <div class="row-fluid mega">\n          <div class="span6"><div class="glyphicons comments">{{$c.ResponseSum}}</div></div>\n          <div class="span6"><div class="glyphicons heart">{{$c.SubscribeSum}}</div></div>\n        </div>\n      </div>\n      {{/each}}\n    </div>\n  </div>\n  {{/if}}\n  {{if BooksWithSameAuthor}}\n  <div class="section row-fluid booksBySameAuthor">\n    <div class="row-fluid title">\n      <span>作者的其他书</span>\n    </div>\n    <div class="row-fluid">\n      {{each BooksWithSameAuthor}}\n      <div class="sameBook span3">\n        <a href="Detail.html?id={{$value.Id}}">\n          <div class="bookCover">\n            <div class="wrapper"><img src="{{$value.ImageUrl}}" alt=""></div>\n          </div>\n          <div class="bookTitle text-center">{{$value.Title}}</div>\n        </a>\n      </div>\n      {{/each}}\n    </div>\n  </div>\n  {{/if}}\n  {{if Book.SimilarBooks}}\n  <div class="section row-fluid similarBooks">\n    <div class="row-fluid title">\n      <span>喜欢这本书的人也喜欢</span>\n    </div>\n    <div class="row-fluid">\n      {{each Book.SimilarBooks as $c $i}}\n      {{if $i <= 3}}\n      <div class="sameBook span3">\n        <a href="Detail.html?id={{$c.Id}}">\n          <div class="bookCover">\n            <div class="wrapper"><img src="{{$c.ImageUrl}}" alt=""></div>\n          </div>\n          <div class="bookTitle text-center">{{$c.Title}}</div>\n        </a>\n      </div>\n      {{/if}}\n      {{/each}}\n    </div>\n  </div>\n  {{/if}}\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:4*/
    template("Book/MoreComments", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), $each = $utils.$each, Data = $data.Data, $escape = ($data.$value, 
            $data.$index, $utils.$escape), $out = "";
            return $out += '<div class="container"> ', $line = 2, $each(Data, function($value) {
                $out += ' <div class="row-fluid comment"> <a href="../Comment/Detail.html?id=', 
                $line = 4, $out += $escape($value.Id), $out += '"></a> <div class="row-fluid"><div class="author pull-left"><a href="../People/Detail.html?nickname=', 
                $line = 5, $out += $escape($value.Author.Nickname), $out += '">', $line = 5, $out += $escape($value.Author.Nickname), 
                $out += '</a></div><div class="cmtScore pull-left" data-score="', $line = 5, $out += $escape($value.Score), 
                $out += '"></div></div> <div class="row-fluid"><div class="content">', $line = 6, 
                $out += $escape($value.Content), $out += '</div></div> <div class="row-fluid mega"> <table class="pull-right"> <tr> <td> <div class="glyphicons comments">', 
                $line = 11, $out += $escape($value.ResponseSum), $out += '</div> </td> <td> <div class="glyphicons thumbs_up">', 
                $line = 14, $out += $escape($value.LikeSum), $out += "</div> </td> </tr> </table> </div> </div> ", 
                $line = 20;
            }), $out += " </div>", new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="container">\n  {{each Data}}\n  <div class="row-fluid comment">\n    <a href="../Comment/Detail.html?id={{$value.Id}}"></a>\n    <div class="row-fluid"><div class="author pull-left"><a href="../People/Detail.html?nickname={{$value.Author.Nickname}}">{{$value.Author.Nickname}}</a></div><div class="cmtScore pull-left" data-score="{{$value.Score}}"></div></div>\n    <div class="row-fluid"><div class="content">{{$value.Content}}</div></div>\n    <div class="row-fluid mega">\n      <table class="pull-right">\n        <tr>\n          <td>\n            <div class="glyphicons comments">{{$value.ResponseSum}}</div>\n          </td>\n          <td>\n            <div class="glyphicons thumbs_up">{{$value.LikeSum}}</div>\n          </td>\n        </tr>\n      </table>\n    </div>\n  </div>\n  {{/each}}\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:4*/
    template("Book/MoreReviews", function($data, $filename) {
        try {
            var $utils = this, $helpers = $utils.$helpers, $line = 0, $each = $utils.$each, Data = $data.Data, $escape = ($data.$value, 
            $data.$index, $utils.$escape), $string = $utils.$string, $substring = $helpers.$substring, $out = "";
            return $out += '<div class="container"> ', $line = 2, $each(Data, function($value) {
                $out += ' <div class="review row-fluid"> <a href="../Review/Detail.html?id=', $line = 4, 
                $out += $escape($value.Id), $out += '"></a> <div class="megaInfo row-fluid"> <div class="userAvatar pull-left"><a href="../People/Detail.html?nickname=', 
                $line = 6, $out += $escape($value.Author.Nickname), $out += '"><img src="', $line = 6, 
                $out += $escape($value.Author.AvatarUrl), $out += '" alt=""></a></div> <div class="otherInfo pull-left"> <div class="firstRow row-fluid"> <div class="nickname pull-left"><a href="/m/people/', 
                $line = 9, $out += $escape($value.Author.Nickname), $out += '">', $line = 9, $out += $escape($value.Author.Nickname), 
                $out += '</a></div> <div class="reviewScore pull-left" data-score="', $line = 10, 
                $out += $escape($value.Score), $out += '"></div> <div class="mega pull-right"> <table> <tr> <td> <div class="glyphicons comments">', 
                $line = 15, $out += $escape($value.ResponseSum), $out += '</div> </td> <td> <div class="glyphicons thumbs_up">', 
                $line = 18, $out += $escape($value.LikeSum), $out += '</div> </td> </tr> </table> </div> </div> <div class="secondRow row-fluid"> <div class="reviewTitle pull-left dotdotdotForLongText">', 
                $line = 25, $out += $escape($value.Title), $out += '</div> </div> </div> </div> <div class="content row-fluid">', 
                $line = 29, $out += $string($substring($value.Content, 0, 80)), $out += "</div> </div> ", 
                $line = 31;
            }), $out += " </div>", new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="container">\n  {{each Data}}\n  <div class="review row-fluid">\n    <a href="../Review/Detail.html?id={{$value.Id}}"></a>\n    <div class="megaInfo row-fluid">\n      <div class="userAvatar pull-left"><a href="../People/Detail.html?nickname={{$value.Author.Nickname}}"><img src="{{$value.Author.AvatarUrl}}" alt=""></a></div>\n      <div class="otherInfo pull-left">\n        <div class="firstRow row-fluid">\n          <div class="nickname pull-left"><a href="/m/people/{{$value.Author.Nickname}}">{{$value.Author.Nickname}}</a></div>\n          <div class="reviewScore pull-left" data-score="{{$value.Score}}"></div>\n          <div class="mega pull-right">\n            <table>\n              <tr>\n                <td>\n                  <div class="glyphicons comments">{{$value.ResponseSum}}</div>\n                </td>\n                <td>\n                  <div class="glyphicons thumbs_up">{{$value.LikeSum}}</div>\n                </td>\n              </tr>\n            </table>\n          </div>\n        </div>\n        <div class="secondRow row-fluid">\n          <div class="reviewTitle pull-left dotdotdotForLongText">{{$value.Title}}</div>\n        </div>\n      </div>\n    </div>\n    <div class="content row-fluid">{{$substring $value.Content 0 80}}</div>\n  </div>\n  {{/each}}\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:7*/
    template("Booklist/Detail", function($data, $filename) {
        try {
            var $utils = this, $helpers = $utils.$helpers, $line = 0, $escape = $utils.$escape, Author = $data.Author, CreationTime = $data.CreationTime, Description = $data.Description, Categories = $data.Categories, $string = $utils.$string, $len = $helpers.$len, Books = $data.Books, $each = $utils.$each, Id = ($data.$value, 
            $data.$index, $data.Id), ResponseSum = $data.ResponseSum, SubscribeSum = $data.SubscribeSum, $out = "";
            return $out += '<div class="container"> <h5 class="row-fluid text-center"> <a href="People/Detail.html?nickname=', 
            $line = 3, $out += $escape(Author.Nickname), $out += '" class="authorNameLink">', 
            $line = 3, $out += $escape(Author.Nickname), $out += "</a><span>发布于 ", $line = 3, 
            $out += $escape(CreationTime), $out += '</span> </h5> <div class="desc row-fluid text-center">', 
            $line = 5, $out += $escape(Description), $out += "</div> <hr> ", $line = 7, Categories ? ($out += ' <ul class="cats unstyled inline row-fluid"> <li class="cat span3 text-center active" data-cat="all">全部(', 
            $line = 9, $out += $string($len(Books)), $out += ")</li> ", $line = 10, $each(Categories, function($value) {
                $out += ' <li class="cat span3 text-center" data-cat="', $line = 11, $out += $escape($value.Category), 
                $out += '">', $line = 11, $out += $escape($value.Category), $out += "(", $line = 11, 
                $out += $escape($value.Count), $out += ")</li> ", $line = 12;
            }), $out += ' <li class="cat more span3 text-center">更多<span class="halflings chevron-down"></span></li> </ul> ', 
            $line = 15) : ($out += ' <em class="muted">暂时还没有书籍被加入到本书单</em> ', $line = 17), $out += ' <hr> <div class="clearfix"></div> <div class="tab-content"> <div class="listDetail tab-pane active" id="allbooks"> <ul class="unstyled"> ', 
            $line = 23, $each(Books, function($value) {
                $out += ' <li class="book row-fluid" data-cat="', $line = 24, $out += $escape($value.GeneralCategory), 
                $out += '" id="', $line = 24, $out += $escape($value.Id), $out += '"> <a href="../Book/Detail.html?id=', 
                $line = 25, $out += $escape($value.Id), $out += '"></a> <div class="megaInfo row-fluid"> <div class="bookCover span3"> <img src="', 
                $line = 28, $out += $escape($value.ImageUrl), $out += '" alt="" data-srcimg="', 
                $line = 28, $out += $escape($value.ImageUrl), $out += '"> </div> <div class="bookMega span9"> <h4><strong>', 
                $line = 31, $out += $escape($value.Title), $out += '</strong></h4> <div class="pull-left">', 
                $line = 32, $out += $escape($value.Author), $out += '</div> <div class="clearfix"></div> <div class="pull-left">', 
                $line = 34, $out += $escape($value.Category), $out += "</div> </div> </div> ", $line = 37, 
                $value.Comment && ($out += ' <div class="comment row-fluid"> <div class="span3">创建者评价</div> <div class="span9"> <div class="ratingStar" data-score="', 
                $line = 41, $out += $escape($value.Score), $out += '"></div> <div class="content">', 
                $line = 42, $out += $escape($value.Comment), $out += "</div> </div> </div> ", $line = 45), 
                $out += " </li> ", $line = 47;
            }), $out += ' </ul> </div> </div> </div> <div class="mega"> <table> <tr> <td class="span6"> <a href="Response.html?id=', 
            $line = 56, $out += $escape(Id), $out += "&authorId=", $line = 56, $out += $escape(Author.Id), 
            $out += '"> <span class="glyphicons chat">', $line = 57, $out += $escape(ResponseSum), 
            $out += '</span> </a> </td> <td class="span6"> <div><span class="glyphicons heart">', 
            $line = 61, $out += $escape(SubscribeSum), $out += "</span></div> </td> </tr> </table> </div>", 
            new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="container">\n  <h5 class="row-fluid text-center">\n    <a href="People/Detail.html?nickname={{Author.Nickname}}" class="authorNameLink">{{Author.Nickname}}</a><span>发布于 {{CreationTime}}</span>\n  </h5>\n  <div class="desc row-fluid text-center">{{Description}}</div>\n  <hr>\n  {{if Categories}}\n  <ul class="cats unstyled inline row-fluid">\n    <li class="cat span3 text-center active" data-cat="all">全部({{$len Books}})</li>\n    {{each Categories}}\n    <li class="cat span3 text-center" data-cat="{{$value.Category}}">{{$value.Category}}({{$value.Count}})</li>\n    {{/each}}\n    <li class="cat more span3 text-center">更多<span class="halflings chevron-down"></span></li>\n  </ul>\n  {{else}}\n  <em class="muted">暂时还没有书籍被加入到本书单</em>\n  {{/if}}\n  <hr>\n  <div class="clearfix"></div>\n  <div class="tab-content">\n    <div class="listDetail tab-pane active" id="allbooks">\n      <ul class="unstyled">\n        {{each Books}}\n        <li class="book row-fluid" data-cat="{{$value.GeneralCategory}}" id="{{$value.Id}}">\n          <a href="../Book/Detail.html?id={{$value.Id}}"></a>\n          <div class="megaInfo row-fluid">\n            <div class="bookCover span3">\n              <img src="{{$value.ImageUrl}}" alt="" data-srcimg="{{$value.ImageUrl}}">\n            </div>\n            <div class="bookMega span9">\n              <h4><strong>{{$value.Title}}</strong></h4>\n              <div class="pull-left">{{$value.Author}}</div>\n              <div class="clearfix"></div>\n              <div class="pull-left">{{$value.Category}}</div>\n            </div>\n          </div>\n          {{if $value.Comment}}\n          <div class="comment row-fluid">\n            <div class="span3">创建者评价</div>\n            <div class="span9">\n              <div class="ratingStar" data-score="{{$value.Score}}"></div>\n              <div class="content">{{$value.Comment}}</div>\n            </div>\n          </div>\n          {{/if}}\n        </li>\n        {{/each}}\n      </ul>\n    </div>\n  </div>\n</div>\n<div class="mega">\n  <table>\n    <tr>\n      <td class="span6">\n        <a href="Response.html?id={{Id}}&authorId={{Author.Id}}">\n          <span class="glyphicons chat">{{ResponseSum}}</span>\n        </a>\n      </td>\n      <td class="span6">\n        <div><span class="glyphicons heart">{{SubscribeSum}}</span></div>\n      </td>\n    </tr>\n  </table>\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:4*/
    template("Booklist/My", '<div class="container"> <div class="row-fluid tabs"> <div class="tab pull-left text-center active" data-target="mine"></div> <div class="tab pull-left text-center" data-target="subscribed"></div> </div> <div class="row-fluid"> <div class="booklists"> <div class="row-fluid text-center none"></div> </div> </div> </div>'), 
    /*v:5*/
    template("Comment/Detail", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), $escape = $utils.$escape, Comment = $data.Comment, IsLogin = $data.IsLogin, $out = "";
            return $out += '<div class="container" data-bookid="', $line = 1, $out += $escape(Comment.Book.Id), 
            $out += '"> <div class="info row-fluid"> <div class="user pull-left" id="', $line = 3, 
            $out += $escape(Comment.Author.Id), $out += '"> <a href="../People/Detail.html?nickname=', 
            $line = 4, $out += $escape(Comment.Author.Nickname), $out += '"> <div class="avatar pull-left"><img src="', 
            $line = 5, $out += $escape(Comment.Author.AvatarUrl), $out += '" alt="" class="img-circle"></div> <div class="nickname pull-left">', 
            $line = 6, $out += $escape(Comment.Author.Nickname), $out += '</div> </a> </div> <div class="ratingStar pull-left" data-score="', 
            $line = 9, $out += $escape(Comment.Score), $out += '"></div> </div> <div class="content">', 
            $line = 11, $out += $escape(Comment.Content), $out += '</div> <div class="book row-fluid" id="', 
            $line = 12, $out += $escape(Comment.Book), $out += '"> <a href="../Book/Detail.html?id=', 
            $line = 13, $out += $escape(Comment.Book.Id), $out += '"></a> <div class="megaInfo row-fluid"> <div class="bookCover span3"> <img src="', 
            $line = 16, $out += $escape(Comment.Book.ImageUrl), $out += '" alt="" data-srcimg="', 
            $line = 16, $out += $escape(Comment.Book.ImageUrl), $out += '"> </div> <div class="bookMega span9"> <h4><strong>', 
            $line = 19, $out += $escape(Comment.Book.Title), $out += '</strong></h4> <div class="pull-left">', 
            $line = 20, $out += $escape(Comment.Book.Author), $out += '</div> <div class="clearfix"></div> <div class="pull-left">', 
            $line = 22, $out += $escape(Comment.Book.Category), $out += '</div> </div> </div> </div> </div> <div class="row-fluid mega"> <table class="pull-right"> <tr> <td class="response"> <a href="Response.html?id=', 
            $line = 31, $out += $escape(Comment.Id), $out += '"> <span class="glyphicons comments">', 
            $line = 32, $out += $escape(Comment.ResponseSum), $out += '</span> </a> </td> <td class="thumbsUp"> <div><span class="glyphicons thumbs_up">', 
            $line = 36, $out += $escape(Comment.LikeSum), $out += '</span></div> </td> </tr> </table> </div> <script type="text/javascript"> window.logined = ', 
            $line = 43, IsLogin === !0 ? ($out += "true", $line = 43) : ($out += "false", $line = 43), 
            $out += "; </script>", new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="container" data-bookid="{{Comment.Book.Id}}">\n  <div class="info row-fluid">\n    <div class="user pull-left" id="{{Comment.Author.Id}}">\n      <a href="../People/Detail.html?nickname={{Comment.Author.Nickname}}">\n        <div class="avatar pull-left"><img src="{{Comment.Author.AvatarUrl}}" alt="" class="img-circle"></div>\n        <div class="nickname pull-left">{{Comment.Author.Nickname}}</div>\n      </a>\n    </div>\n    <div class="ratingStar pull-left" data-score="{{Comment.Score}}"></div>\n  </div>\n  <div class="content">{{Comment.Content}}</div>\n  <div class="book row-fluid" id="{{Comment.Book}}">\n    <a href="../Book/Detail.html?id={{Comment.Book.Id}}"></a>\n    <div class="megaInfo row-fluid">\n      <div class="bookCover span3">\n        <img src="{{Comment.Book.ImageUrl}}" alt="" data-srcimg="{{Comment.Book.ImageUrl}}">\n      </div>\n      <div class="bookMega span9">\n        <h4><strong>{{Comment.Book.Title}}</strong></h4>\n        <div class="pull-left">{{Comment.Book.Author}}</div>\n        <div class="clearfix"></div>\n        <div class="pull-left">{{Comment.Book.Category}}</div>\n      </div>\n    </div>\n  </div>\n</div>\n<div class="row-fluid mega">\n  <table class="pull-right">\n    <tr>\n      <td class="response">\n        <a href="Response.html?id={{Comment.Id}}">\n          <span class="glyphicons comments">{{Comment.ResponseSum}}</span>\n        </a>\n      </td>\n      <td class="thumbsUp">\n        <div><span class="glyphicons thumbs_up">{{Comment.LikeSum}}</span></div>\n      </td>\n    </tr>\n  </table>\n</div>\n\n<script type="text/javascript">\n  window.logined = {{if IsLogin === true}}true{{else}}false{{/if}};\n</script>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:4*/
    template("DirectMessage/Messages", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), $each = $utils.$each, Messages = $data.Messages, include = ($data.$value, 
            $data.$index, function(filename, data) {
                data = data || $data;
                var text = $utils.$include(filename, data, $filename);
                return $out += text;
            }), $out = "";
            return $out += '<div class="container"> <div class="loadMore well text-center hide">载入更多历史信息</div> <div class="messages"> ', 
            $line = 4, $each(Messages, function($value) {
                $out += " ", $line = 5, $value.IsMySelf === !0 ? ($out += " ", $line = 6, include("./MineMsg", $value), 
                $out += " ", $line = 7) : ($out += " ", $line = 8, include("./TheirMsg", $value), 
                $out += " ", $line = 9), $out += " ", $line = 10;
            }), $out += " </div> ", $line = 12, include("../public/InputGroup"), $out += " </div>", 
            new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="container">\n  <div class="loadMore well text-center hide">载入更多历史信息</div>\n  <div class="messages">\n    {{each Messages}}\n    {{if $value.IsMySelf === true}}\n    {{include "./MineMsg" $value}}\n    {{else}}\n    {{include "./TheirMsg" $value}}\n    {{/if}}\n    {{/each}}\n  </div>\n  {{include "../public/InputGroup"}}\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:4*/
    template("DirectMessage/MineMsg", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), $escape = $utils.$escape, Id = $data.Id, CreationTime = $data.CreationTime, Content = $data.Content, Poster = $data.Poster, $out = "";
            return $out += '<div class="row-fluid message mine" id="', $line = 1, $out += $escape(Id), 
            $out += '"> <div class="info span10"> <div class="row-fluid time text-center muted">', 
            $line = 3, $out += $escape(CreationTime), $out += '前</div> <div class="row-fluid content">', 
            $line = 4, $out += $escape(Content), $out += '</div> <div class="status loading hide"></div> </div> <div class="avatar span2"> <a href="file:///android_asset/www/People/Detail.html?nickname=', 
            $line = 8, $out += $escape(Poster.Nickname), $out += '"><img src="', $line = 8, 
            $out += $escape(Poster.AvatarUrl), $out += '" class="img-circle pull-right"></a> </div> </div>', 
            new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="row-fluid message mine" id="{{Id}}">\n  <div class="info span10">\n    <div class="row-fluid time text-center muted">{{CreationTime}}前</div>\n    <div class="row-fluid content">{{Content}}</div>\n    <div class="status loading hide"></div>\n  </div>\n  <div class="avatar span2">\n    <a href="file:///android_asset/www/People/Detail.html?nickname={{Poster.Nickname}}"><img src="{{Poster.AvatarUrl}}" class="img-circle pull-right"></a>\n  </div>\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:4*/
    template("DirectMessage/TheirMsg", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), $escape = $utils.$escape, Id = $data.Id, Poster = $data.Poster, CreationTime = $data.CreationTime, Content = $data.Content, $out = "";
            return $out += '<div class="row-fluid message" id="', $line = 1, $out += $escape(Id), 
            $out += '"> <div class="avatar span2"> <a href="file:///android_asset/www/People/Detail.html?nickname=', 
            $line = 3, $out += $escape(Poster.Nickname), $out += '"><img src="', $line = 3, 
            $out += $escape(Poster.AvatarUrl), $out += '" class="img-circle"></a> </div> <div class="info span10 row-fluid"> <div class="row-fluid time text-center muted">', 
            $line = 6, $out += $escape(CreationTime), $out += '前</div> <div class="row-fluid content">', 
            $line = 7, $out += $escape(Content), $out += "</div> </div> </div>", new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="row-fluid message" id="{{Id}}">\n  <div class="avatar span2">\n    <a href="file:///android_asset/www/People/Detail.html?nickname={{Poster.Nickname}}"><img src="{{Poster.AvatarUrl}}" class="img-circle"></a>\n  </div>\n  <div class="info span10 row-fluid">\n    <div class="row-fluid time text-center muted">{{CreationTime}}前</div>\n    <div class="row-fluid content">{{Content}}</div>\n  </div>\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:4*/
    template("Index/Articles", function($data, $filename) {
        try {
            var $utils = this, $helpers = $utils.$helpers, $line = 0, $each = $utils.$each, Articles = $data.Articles, $escape = ($data.$value, 
            $data.$index, $utils.$escape), $string = $utils.$string, $substring = $helpers.$substring, include = function(filename, data) {
                data = data || $data;
                var text = $utils.$include(filename, data, $filename);
                return $out += text;
            }, $out = "";
            return $line = 1, $each(Articles, function($value, $index) {
                $out += " ", $line = 2, 0 === $index ? ($out += ' <div class="mainArticleItem"> <a href="Article/Detail.html?id=', 
                $line = 4, $out += $escape($value.Id), $out += '"></a> <img src="', $line = 5, $value.ImageUrl ? ($line = 5, 
                $out += $escape($value.ImageUrl), $line = 5) : ($out += "http://shanpowbookcover.qiniudn.com/%E5%B0%8F%E7%BC%96%E5%81%B7%E6%87%92%E6%B2%A1%E9%85%8D%E5%9B%BE.png", 
                $line = 5), $out += '" alt=""> <div class="titleWrapper"><div class="articleTitle">', 
                $line = 6, $out += $string($substring($value.Title, 0, 50)), $out += "</div></div> </div> ", 
                $line = 8) : ($out += " ", $line = 9, include("../public/ArticleItem", $value), 
                $out += " ", $line = 10), $out += " ", $line = 11;
            }), new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '{{each Articles}}\n{{if $index === 0}}\n<div class="mainArticleItem">\n  <a href="Article/Detail.html?id={{$value.Id}}"></a>\n  <img src="{{if $value.ImageUrl}}{{$value.ImageUrl}}{{else}}http://shanpowbookcover.qiniudn.com/%E5%B0%8F%E7%BC%96%E5%81%B7%E6%87%92%E6%B2%A1%E9%85%8D%E5%9B%BE.png{{/if}}" alt="">\n  <div class="titleWrapper"><div class="articleTitle">{{$substring $value.Title 0 50}}</div></div>\n</div>\n{{else}}\n{{include "../public/ArticleItem" $value}}\n{{/if}}\n{{/each}}'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:4*/
    template("Index/Billboards", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), $each = $utils.$each, Billboards = $data.Billboards, $escape = ($data.$value, 
            $data.$index, $utils.$escape), $out = "";
            return $line = 1, $each(Billboards, function($value) {
                $out += ' <div class="ranking pull-left"> <a href="Billboard/Detail.html?title=', 
                $line = 3, $out += $escape($value.Title), $out += "&version=", $line = 3, $out += $escape($value.Version), 
                $out += '"></a> <div class="rankingImage"> <img src="', $line = 5, $out += $escape($value.ImageUrl), 
                $out += '?imageView2/1/w/200/h/200" alt=""> <div class="updateInfo">更新至第<span>', 
                $line = 6, $out += $escape($value.Version), $out += '</span>期</div> </div> <div class="rankingTitle"><table><tr><td>', 
                $line = 8, $out += $escape($value.Title), $out += "</td></tr></table></div> </div> ", 
                $line = 10;
            }), new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '{{each Billboards}}\n<div class="ranking pull-left">\n  <a href="Billboard/Detail.html?title={{$value.Title}}&version={{$value.Version}}"></a>\n  <div class="rankingImage">\n    <img src="{{$value.ImageUrl}}?imageView2/1/w/200/h/200" alt="">\n    <div class="updateInfo">更新至第<span>{{$value.Version}}</span>期</div>\n  </div>\n  <div class="rankingTitle"><table><tr><td>{{$value.Title}}</td></tr></table></div>\n</div>\n{{/each}}'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:7*/
    template("Index/Main", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), include = function(filename, data) {
                data = data || $data;
                var text = $utils.$include(filename, data, $filename);
                return $out += text;
            }, Ch = $data.Ch, $escape = $utils.$escape, $each = $utils.$each, RecommendedReviews = $data.RecommendedReviews, $out = ($data.$value, 
            $data.$index, "");
            return $out += '<div class="container"> <div class="row-fluid articles section"> ', 
            $line = 3, include("./Articles"), $out += ' </div> <div class="row-fluid hot_ranking section"> <div class="title row-fluid"> <h4> <span class="icon"></span> <span>新鲜热榜</span> <span class="more"><a href="Billboard/Index.html">更多&nbsp;...</a></span> </h4> </div> <div class="rankinglist row-fluid"> ', 
            $line = 14, include("./Billboards"), $out += ' </div> </div> <div class="row-fluid wizard section"> <div class="title row-fluid"> <h4> <span class="icon"></span> <span>猜你喜欢</span> <span class="more hide"><a href="Book/Recommendation.html">一键治书荒</a></span> </h4> </div> <div class="row-fluid bookRecommended"> ', 
            $line = 26, include("./Wizard"), $out += ' </div> </div> <div class="row-fluid reviews section"> <div class="title row-fluid"> <h4> <span class="icon"></span> <span>推荐书评</span> <span class="more"><a href="Review/All.html?ch=', 
            $line = 34, Ch ? ($line = 34, $out += $escape(Ch), $line = 34) : ($out += "m", $line = 34), 
            $out += '">更多&nbsp;...</a></span> </h4> </div> <div class="unstyled"> ', $line = 38, 
            $each(RecommendedReviews, function($value) {
                $out += " ", $line = 39, include("../public/Review", $value), $out += " ", $line = 40;
            }), $out += " </div> </div> </div>", new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="container">\n  <div class="row-fluid articles section">\n    {{include "./Articles"}}\n  </div>\n  <div class="row-fluid hot_ranking section">\n    <div class="title row-fluid">\n      <h4>\n        <span class="icon"></span>\n        <span>新鲜热榜</span>\n        <span class="more"><a href="Billboard/Index.html">更多&nbsp;...</a></span>\n      </h4>\n    </div>\n    <div class="rankinglist row-fluid">\n      {{include "./Billboards"}}\n    </div>\n  </div>\n  <div class="row-fluid wizard section">\n    <div class="title row-fluid">\n      <h4>\n        <span class="icon"></span>\n        <span>猜你喜欢</span>\n        <span class="more hide"><a href="Book/Recommendation.html">一键治书荒</a></span>\n      </h4>\n    </div>\n    <div class="row-fluid bookRecommended">\n      {{include "./Wizard"}}\n    </div>\n  </div>\n  <div class="row-fluid reviews section">\n    <div class="title row-fluid">\n      <h4>\n        <span class="icon"></span>\n        <span>推荐书评</span>\n        <span class="more"><a href="Review/All.html?ch={{if Ch}}{{Ch}}{{else}}m{{/if}}">更多&nbsp;...</a></span>\n      </h4>\n    </div>\n    <div class="unstyled">\n      {{each RecommendedReviews}}\n      {{include "../public/Review" $value}}\n      {{/each}}\n    </div>\n  </div>\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:4*/
    template("Index/Wizard", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), IsLogin = $data.IsLogin, $each = $utils.$each, GuessBooks = $data.GuessBooks, $escape = ($data.$value, 
            $data.$index, $utils.$escape), $out = "";
            return $line = 1, IsLogin === !0 ? ($out += " ", $line = 2, $each(GuessBooks, function($value) {
                $out += ' <div class="wizardBook span3"> <a href="Book/Detail.html?id=', $line = 4, 
                $out += $escape($value.Id), $out += '"> <div class="bookCover"> <div class="wrapper"><img src="', 
                $line = 6, $out += $escape($value.ImageUrl), $out += '" alt=""></div> </div> <div class="bookTitle text-center">', 
                $line = 8, $out += $escape($value.Title), $out += "</div> </a> </div> ", $line = 11;
            }), $out += " ", $line = 12) : ($out += ' <div class="span6 pull-left"> <div class="tip row-fluid">曲高不一定和寡，登录后发现您的专属推荐，还有志同道合的书友们</div> <div class="login pull-left row-fluid"><a href="#" onclick="cordova.exec(null,null,\'ActivityLauncher\',\'login\',[]);">立即登录</a></div> </div> <div class="span6 pull-left"><img src="public/img/tagCloud.png" alt=""></div> ', 
            $line = 18), new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '{{if IsLogin === true}}\n  {{each GuessBooks}}\n  <div class="wizardBook span3">\n    <a href="Book/Detail.html?id={{$value.Id}}">\n      <div class="bookCover">\n        <div class="wrapper"><img src="{{$value.ImageUrl}}" alt=""></div>\n      </div>\n      <div class="bookTitle text-center">{{$value.Title}}</div>\n    </a>\n  </div>\n  {{/each}}\n{{else}}\n  <div class="span6 pull-left">\n    <div class="tip row-fluid">曲高不一定和寡，登录后发现您的专属推荐，还有志同道合的书友们</div>\n    <div class="login pull-left row-fluid"><a href="#" onclick="cordova.exec(null,null,\'ActivityLauncher\',\'login\',[]);">立即登录</a></div>\n  </div>\n  <div class="span6 pull-left"><img src="public/img/tagCloud.png" alt=""></div>\n{{/if}}'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:6*/
    template("MessageCenter/DirectMessage", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), $each = $utils.$each, Data = $data.Data, $escape = ($data.$value, 
            $data.$index, $utils.$escape), $out = "";
            return $line = 1, $each(Data, function($value) {
                $out += ' <div class="row-fluid msg ', $line = 2, $value.IsNewMessages === !0 && ($out += "unread", 
                $line = 2), $out += ' dm" id="', $line = 2, $out += $escape($value.Id), $out += '"> <div class="userAvatar span2"> <a href="file:///android_asset/www/People/Detail.html?nickname=', 
                $line = 4, $out += $escape($value.Contacter.Nickname), $out += '"><img src="', $line = 4, 
                $out += $escape($value.Contacter.AvatarUrl), $out += '" alt="" class="img-circle"></a> </div> <div class="info span10"> <div class="row-fluid info"> <div class="span8 dotdotdotForLongText"><a href="file:///android_asset/www/People/Detail.html?nickname=', 
                $line = 8, $out += $escape($value.Contacter.Nickname), $out += '">', $line = 8, 
                $out += $escape($value.Contacter.Nickname), $out += '</a></div> <div class="span4 text-right">', 
                $line = 9, $out += $escape($value.LatestMessageTime), $out += '前</div> </div> <div class="content">', 
                $line = 11, $out += $escape($value.LatestMessage), $out += '</div> </div> <a href="file:///android_asset/www/DirectMessage/Conversation.html?id=', 
                $line = 13, $out += $escape($value.Id), $out += "&other=", $line = 13, $out += $escape($value.Contacter.Nickname), 
                $out += '"></a> ', $line = 14, $value.IsNewMessages === !0 && ($out += '<div class="unread-indicator"></div>', 
                $line = 14), $out += " </div> <hr> ", $line = 17;
            }), new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '{{each Data}}\n  <div class="row-fluid msg {{if $value.IsNewMessages === true}}unread{{/if}} dm" id="{{$value.Id}}">\n    <div class="userAvatar span2">\n      <a href="file:///android_asset/www/People/Detail.html?nickname={{$value.Contacter.Nickname}}"><img src="{{$value.Contacter.AvatarUrl}}" alt="" class="img-circle"></a>\n    </div>\n    <div class="info span10">\n      <div class="row-fluid info">\n        <div class="span8 dotdotdotForLongText"><a href="file:///android_asset/www/People/Detail.html?nickname={{$value.Contacter.Nickname}}">{{$value.Contacter.Nickname}}</a></div>\n        <div class="span4 text-right">{{$value.LatestMessageTime}}前</div>\n      </div>\n      <div class="content">{{$value.LatestMessage}}</div>\n    </div>\n    <a href="file:///android_asset/www/DirectMessage/Conversation.html?id={{$value.Id}}&other={{$value.Contacter.Nickname}}"></a>\n    {{if $value.IsNewMessages === true}}<div class="unread-indicator"></div>{{/if}}\n  </div>\n  <hr>\n{{/each}}'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:8*/
    template("MessageCenter/Index", '<div class="container"> <div class="row-fluid tabs"> <div class="tab pull-left text-center active" id="directmessage">私信<span class="newMsgIndicator hide"></span></div> <div class="tab pull-left text-center" id="response">回复<span class="newMsgIndicator hide"></span></div> <div class="tab pull-left text-center" id="update">更新<span class="newMsgIndicator hide"></span></div> </div> <div class="row-fluid payload"> </div> </div>'), 
    /*v:13*/
    template("MessageCenter/Response", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), $each = $utils.$each, Messages = $data.Messages, $escape = ($data.$value, 
            $data.$index, $utils.$escape), $out = "";
            return $line = 1, $each(Messages, function($value) {
                $out += ' <div class="row-fluid msg ', $line = 2, $value.IsRead === !1 && ($out += "unread", 
                $line = 2), $out += ' response" id="', $line = 2, $out += $escape($value.Id), $out += '"> ', 
                $line = 3, $value.IsRead === !1 && ($out += '<div class="unread-indicator"></div>', 
                $line = 3), $out += ' <div class="userAvatar span2"> <a href="file:///android_asset/www/People/Detail.html?nickname=', 
                $line = 5, $out += $escape($value.FromUser.Nickname), $out += '"><img src="', $line = 5, 
                $out += $escape($value.FromUser.AvatarUrl), $out += '" alt="" class="img-circle"></a> </div> <div class="info span10"> <div class="row-fluid info"> <div class="span10 dotdotdotForLongText"><a href="file:///android_asset/www/People/Detail.html?nickname=', 
                $line = 9, $out += $escape($value.FromUser.Nickname), $out += '">', $line = 9, $out += $escape($value.FromUser.Nickname), 
                $out += "</a>&nbsp;", $line = 9, $out += $escape($value.Message), $out += '</div> <div class="span2 text-right">', 
                $line = 10, $out += $escape($value.CreationTime), $out += '前</div> </div> <div class="content ', 
                $line = 12, 6 === $value.Action && ($out += "glyphicons thumbs_up", $line = 12), 
                $out += " ", $line = 12, 7 === $value.Action && ($out += "glyphicons thumbs_down", 
                $line = 12), $out += '">', $line = 12, $out += $escape($value.Content), $out += "</div> </div> ", 
                $line = 14, 2 === $value.Type ? ($out += ' <a href="file:///android_asset/www/Review/', 
                $line = 15, 6 === $value.Action || 7 === $value.Action ? ($out += "Detail", $line = 15) : ($out += "Response", 
                $line = 15), $out += ".html?id=", $line = 15, $out += $escape($value.AnchorId), 
                $out += '"></a> ', $line = 16) : 3 === $value.Type ? ($out += ' <a href="file:///android_asset/www/Booklist/Response.html?id=', 
                $line = 17, $out += $escape($value.AnchorId), $out += '"></a> ', $line = 18) : 9 === $value.Type ? ($out += ' <a href="file:///android_asset/www/Article/Response.html?id=', 
                $line = 19, $out += $escape($value.AnchorId), $out += '"></a> ', $line = 20) : 10 === $value.Type && ($out += ' <a href="file:///android_asset/www/Comment/', 
                $line = 21, 6 === $value.Action || 7 === $value.Action ? ($out += "Detail", $line = 21) : ($out += "Response", 
                $line = 21), $out += ".html?id=", $line = 21, $out += $escape($value.AnchorId), 
                $out += '"></a> ', $line = 22), $out += " </div> <hr> ", $line = 25;
            }), new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '{{each Messages}}\n  <div class="row-fluid msg {{if $value.IsRead === false}}unread{{/if}} response" id="{{$value.Id}}">\n    {{if $value.IsRead === false}}<div class="unread-indicator"></div>{{/if}}\n    <div class="userAvatar span2">\n      <a href="file:///android_asset/www/People/Detail.html?nickname={{$value.FromUser.Nickname}}"><img src="{{$value.FromUser.AvatarUrl}}" alt="" class="img-circle"></a>\n    </div>\n    <div class="info span10">\n      <div class="row-fluid info">\n        <div class="span10 dotdotdotForLongText"><a href="file:///android_asset/www/People/Detail.html?nickname={{$value.FromUser.Nickname}}">{{$value.FromUser.Nickname}}</a>&nbsp;{{$value.Message}}</div>\n        <div class="span2 text-right">{{$value.CreationTime}}前</div>\n      </div>\n      <div class="content {{if $value.Action === 6}}glyphicons thumbs_up{{/if}} {{if $value.Action === 7}}glyphicons thumbs_down{{/if}}">{{$value.Content}}</div>\n    </div>\n    {{if $value.Type === 2}}\n    <a href="file:///android_asset/www/Review/{{if $value.Action === 6 || $value.Action === 7}}Detail{{else}}Response{{/if}}.html?id={{$value.AnchorId}}"></a>\n    {{else if $value.Type === 3}}\n    <a href="file:///android_asset/www/Booklist/Response.html?id={{$value.AnchorId}}"></a>\n    {{else if $value.Type === 9}}\n    <a href="file:///android_asset/www/Article/Response.html?id={{$value.AnchorId}}"></a>\n    {{else if $value.Type === 10}}\n    <a href="file:///android_asset/www/Comment/{{if $value.Action === 6 || $value.Action === 7}}Detail{{else}}Response{{/if}}.html?id={{$value.AnchorId}}"></a>\n    {{/if}}\n  </div>\n  <hr>\n{{/each}}'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:8*/
    template("MessageCenter/Update", function($data, $filename) {
        try {
            var $utils = this, $helpers = $utils.$helpers, $line = 0, $each = $utils.$each, Messages = $data.Messages, $escape = ($data.$value, 
            $data.$index, $utils.$escape), $string = $utils.$string, $substring = $helpers.$substring, $out = "";
            return $line = 1, $each(Messages, function($value) {
                $out += ' <div class="row-fluid msg ', $line = 2, $value.IsRead === !1 && ($out += "unread", 
                $line = 2), $out += ' update" id="', $line = 2, $out += $escape($value.Id), $out += '"> <div class="bookcover span2"> <a href="file:///android_asset/www/Book/Detail.html?id=', 
                $line = 4, $out += $escape($value.Book.Id), $out += '"><img src="', $line = 4, $out += $escape($value.Book.ImageUrl), 
                $out += '" alt="" class=""></a> </div> <div class="info span10"> <div class="row-fluid info"> <div class="span9 dotdotdotForLongText"><a href="file:///android_asset/www/People/Detail.html?nickname=', 
                $line = 8, $out += $escape($value.FromUser.Nickname), $out += '">', $line = 8, $out += $escape($value.FromUser.Nickname), 
                $out += "</a>", $line = 8, $out += $escape($value.Message), $out += '</div> <div class="span3 text-right">', 
                $line = 9, $out += $escape($value.CreationTime), $out += '前</div> </div> <div class="content"> <h5 class="contentTitle">', 
                $line = 12, $out += $escape($value.Title), $out += '</h5> <div class="summary">', 
                $line = 13, $out += $string($substring($value.Content, 0, 50)), $out += "</div> </div> </div> ", 
                $line = 16, 2 === $value.Type ? ($out += ' <a href="file:///android_asset/www/Review/Detail.html?id=', 
                $line = 17, $out += $escape($value.AnchorId), $out += '"></a> ', $line = 18) : 10 === $value.Type && ($out += ' <a href="file:///android_asset/www/Comment/Detail.html?id=', 
                $line = 19, $out += $escape($value.AnchorId), $out += '"></a> ', $line = 20), $out += " ", 
                $line = 21, $value.IsRead === !1 && ($out += '<div class="unread-indicator"></div>', 
                $line = 21), $out += " </div> <hr> ", $line = 24;
            }), new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '{{each Messages}}\n  <div class="row-fluid msg {{if $value.IsRead === false}}unread{{/if}} update" id="{{$value.Id}}">\n    <div class="bookcover span2">\n      <a href="file:///android_asset/www/Book/Detail.html?id={{$value.Book.Id}}"><img src="{{$value.Book.ImageUrl}}" alt="" class=""></a>\n    </div>\n    <div class="info span10">\n      <div class="row-fluid info">\n        <div class="span9 dotdotdotForLongText"><a href="file:///android_asset/www/People/Detail.html?nickname={{$value.FromUser.Nickname}}">{{$value.FromUser.Nickname}}</a>{{$value.Message}}</div>\n        <div class="span3 text-right">{{$value.CreationTime}}前</div>\n      </div>\n      <div class="content">\n        <h5 class="contentTitle">{{$value.Title}}</h5>\n        <div class="summary">{{$substring $value.Content 0 50}}</div>\n      </div>\n    </div>\n    {{if $value.Type === 2}}\n    <a href="file:///android_asset/www/Review/Detail.html?id={{$value.AnchorId}}"></a>\n    {{else if $value.Type === 10}}\n    <a href="file:///android_asset/www/Comment/Detail.html?id={{$value.AnchorId}}"></a>\n    {{/if}}\n    {{if $value.IsRead === false}}<div class="unread-indicator"></div>{{/if}}\n  </div>\n  <hr>\n{{/each}}'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:4*/
    template("People/BookFollowed", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), BooksCount = $data.BooksCount, $each = $utils.$each, Books = $data.Books, include = ($data.$value, 
            $data.$index, function(filename, data) {
                data = data || $data;
                var text = $utils.$include(filename, data, $filename);
                return $out += text;
            }), $out = "";
            return $out += '<div class="container"> ', $line = 2, BooksCount > 0 ? ($out += " ", 
            $line = 3, $each(Books, function($value) {
                $out += " ", $line = 4, include("../public/Book", $value), $out += " ", $line = 5;
            }), $out += " ", $line = 6) : ($out += ' <div class="well">没有关注的书籍</div> ', $line = 8), 
            $out += " </div>", new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="container">\n  {{if BooksCount > 0}}\n    {{each Books}}\n    {{include "../public/Book" $value}}\n    {{/each}}\n  {{else}}\n    <div class="well">没有关注的书籍</div>\n  {{/if}}\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:4*/
    template("People/Books", '<div class="container"> <div class="tabbable"> <ul class="nav nav-tabs"> <li class="active text-center"><a href="#reading" data-toggle="tab" id="readingTab">正在阅读的</a></li> <li class="text-center"><a href="#read" data-toggle="tab" id="readTab">读过的</a></li> <li class="text-center"><a href="#wanttoread" data-toggle="tab" id="wantTab">想读的</a></li> </ul> <div class="tab-content"> <div class="tab-pane row-fluid active" id="reading"> </div> <div class="tab-pane" id="read"> </div> <div class="tab-pane" id="wanttoread"> </div> </div> </div> </div>'), 
    /*v:4*/
    template("People/BooksRead", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), $escape = $utils.$escape, BooksCount = $data.BooksCount, $out = "";
            return $out += '<div class="sum">共', $line = 1, $out += $escape(BooksCount), $out += '本</div> <div class="loadMore row-fluid text-center">加载更多记录</div>', 
            new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="sum">共{{BooksCount}}本</div>\n<div class="loadMore row-fluid text-center">加载更多记录</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:4*/
    template("People/BooksReading", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), Books = $data.Books, $each = $utils.$each, $escape = ($data.$value, 
            $data.$index, $utils.$escape), $out = "";
            return $line = 1, Books ? ($out += " ", $line = 2, $each(Books, function($value) {
                $out += ' <div class="readingBook span4"> <div class="bookCover"><a href="file:///android_asset/www/Book/Detail.html?id=', 
                $line = 4, $out += $escape($value.Id), $out += '"><img src="', $line = 4, $out += $escape($value.ImageUrl), 
                $out += '" alt=""></a></div> <div class="bookTitle text-center dotdotdotForLongText">', 
                $line = 5, $out += $escape($value.Title), $out += "</div> </div> ", $line = 7;
            }), $out += " ", $line = 8) : ($out += ' <div class="readingBook span12 well">没有正在阅读的书籍</div> ', 
            $line = 10), new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '{{if Books}}\n  {{each Books}}\n  <div class="readingBook span4">\n    <div class="bookCover"><a href="file:///android_asset/www/Book/Detail.html?id={{$value.Id}}"><img src="{{$value.ImageUrl}}" alt=""></a></div>\n    <div class="bookTitle text-center dotdotdotForLongText">{{$value.Title}}</div>\n  </div>\n  {{/each}}\n{{else}}\n  <div class="readingBook span12 well">没有正在阅读的书籍</div>\n{{/if}}'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:4*/
    template("People/BooksWant", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), $escape = $utils.$escape, BooksCount = $data.BooksCount, $each = $utils.$each, Books = $data.Books, include = ($data.$value, 
            $data.$index, function(filename, data) {
                data = data || $data;
                var text = $utils.$include(filename, data, $filename);
                return $out += text;
            }), $out = "";
            return $out += '<div class="sum">共', $line = 1, $out += $escape(BooksCount), $out += "本</div> ", 
            $line = 2, $each(Books, function($value) {
                $out += " ", $line = 3, include("../public/Book", $value), $out += " ", $line = 4;
            }), new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="sum">共{{BooksCount}}本</div>\n{{each Books}}\n{{include "../public/Book" $value}}\n{{/each}}'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:4*/
    template("People/Detail", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), $escape = $utils.$escape, UserAvatarUrl = $data.UserAvatarUrl, Nickname = $data.Nickname, FollowingsCnt = $data.FollowingsCnt, FollowersCnt = $data.FollowersCnt, ReviewCnt = $data.ReviewCnt, CommentCnt = $data.CommentCnt, IsMySelf = $data.IsMySelf, $each = $utils.$each, ReadHistories = $data.ReadHistories, $out = ($data.$value, 
            $data.$index, "");
            return $out += '<div class="container"> <div class="row-fluid section basicInfo"> <div class="whiteArea"></div> <div class="avatar"><img src="', 
            $line = 4, $out += $escape(UserAvatarUrl), $out += '" alt="" class="img-circle"></div> <div class="nickname text-center">', 
            $line = 5, $out += $escape(Nickname), $out += '</div> </div> <div class="row-fluid section advancedInfo"> <div class="info pull-left span3"> <div class="num text-center">', 
            $line = 9, $out += $escape(FollowingsCnt), $out += '</div> <div class="key text-center">关注</div> </div> <div class="info pull-left span3"> <div class="num text-center">', 
            $line = 13, $out += $escape(FollowersCnt), $out += '</div> <div class="key text-center">粉丝</div> </div> <div class="info pull-left span3"> <div class="num text-center">', 
            $line = 17, $out += $escape(ReviewCnt), $out += '</div> <div class="key text-center">书评</div> </div> <div class="info pull-left span3"> <div class="num text-center">', 
            $line = 21, $out += $escape(CommentCnt), $out += '</div> <div class="key text-center">短评</div> </div> </div> <div class="row-fluid section readRecord"> <div class="title row-fluid"> <span>', 
            $line = 27, IsMySelf === !0 ? ($out += "我", $line = 27) : ($out += "Ta", $line = 27), 
            $out += '的阅读记录</span> <span class="more"><a href="Books.html?nickname=', $line = 28, 
            $out += $escape(Nickname), $out += '">更多&nbsp;...</a></span> </div> <div class="row-fluid books"> ', 
            $line = 31, $each(ReadHistories, function($value) {
                $out += ' <div class="span3 book"> <a href="../Book/Detail.html?id=', $line = 33, 
                $out += $escape($value.Id), $out += '"></a> <div class="bookCover"> <img src="', 
                $line = 35, $out += $escape($value.ImageUrl), $out += '" alt=""> <div class="readStatus text-center">已读完</div> </div> <div class="bookTitle text-center">', 
                $line = 38, $out += $escape($value.Title), $out += "</div> </div> ", $line = 40;
            }), $out += ' </div> </div> <div class="row-fluid section booklists"> <div class="span4 button"> <a href="FollowedBooks.html?nickname=', 
            $line = 45, $out += $escape(Nickname), $out += '"> <div class="icon"><img src="../public/img/heart.png" alt=""></div> <div class="text-center">', 
            $line = 47, IsMySelf === !0 ? ($out += "我", $line = 47) : ($out += "Ta", $line = 47), 
            $out += '关注的书</div> </a> </div> <div class="span4 button"> <a href="../Booklist/My.html?nickname=', 
            $line = 51, $out += $escape(Nickname), $out += '&create=1"> <div class="icon"><img src="../public/img/CreateBooklist.png" alt=""></div> <div class="text-center">', 
            $line = 53, IsMySelf === !0 ? ($out += "我", $line = 53) : ($out += "Ta", $line = 53), 
            $out += '创建的书单</div> </a> </div> <div class="span4 button"> <a href="../Booklist/My.html?nickname=', 
            $line = 57, $out += $escape(Nickname), $out += '&subscribe=1"> <div class="icon"><img src="../public/img/SubscribeBooklist.png" alt=""></div> <div class="text-center">', 
            $line = 59, IsMySelf === !0 ? ($out += "我", $line = 59) : ($out += "Ta", $line = 59), 
            $out += "收藏的书单</div> </a> </div> </div> ", $line = 63, IsMySelf === !1 && ($out += ' <div class="row-fluid section"> <div class="sendDirectMessage span10 offset1 text-center">发送私信</div> </div> ', 
            $line = 67), $out += " </div>", new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="container">\n  <div class="row-fluid section basicInfo">\n    <div class="whiteArea"></div>\n    <div class="avatar"><img src="{{UserAvatarUrl}}" alt="" class="img-circle"></div>\n    <div class="nickname text-center">{{Nickname}}</div>\n  </div>\n  <div class="row-fluid section advancedInfo">\n    <div class="info pull-left span3">\n      <div class="num text-center">{{FollowingsCnt}}</div>\n      <div class="key text-center">关注</div>\n    </div>\n    <div class="info pull-left span3">\n      <div class="num text-center">{{FollowersCnt}}</div>\n      <div class="key text-center">粉丝</div>\n    </div>\n    <div class="info pull-left span3">\n      <div class="num text-center">{{ReviewCnt}}</div>\n      <div class="key text-center">书评</div>\n    </div>\n    <div class="info pull-left span3">\n      <div class="num text-center">{{CommentCnt}}</div>\n      <div class="key text-center">短评</div>\n    </div>\n  </div>\n  <div class="row-fluid section readRecord">\n    <div class="title row-fluid">\n      <span>{{if IsMySelf === true}}我{{else}}Ta{{/if}}的阅读记录</span>\n      <span class="more"><a href="Books.html?nickname={{Nickname}}">更多&nbsp;...</a></span>\n    </div>\n    <div class="row-fluid books">\n      {{each ReadHistories}}\n      <div class="span3 book">\n        <a href="../Book/Detail.html?id={{$value.Id}}"></a>\n        <div class="bookCover">\n          <img src="{{$value.ImageUrl}}" alt="">\n          <div class="readStatus text-center">已读完</div>\n        </div>\n        <div class="bookTitle text-center">{{$value.Title}}</div>\n      </div>\n      {{/each}}\n    </div>\n  </div>\n  <div class="row-fluid section booklists">\n    <div class="span4 button">\n      <a href="FollowedBooks.html?nickname={{Nickname}}">\n        <div class="icon"><img src="../public/img/heart.png" alt=""></div>\n        <div class="text-center">{{if IsMySelf === true}}我{{else}}Ta{{/if}}关注的书</div>\n      </a>\n    </div>\n    <div class="span4 button">\n      <a href="../Booklist/My.html?nickname={{Nickname}}&create=1">\n        <div class="icon"><img src="../public/img/CreateBooklist.png" alt=""></div>\n        <div class="text-center">{{if IsMySelf === true}}我{{else}}Ta{{/if}}创建的书单</div>\n      </a>\n    </div>\n    <div class="span4 button">\n      <a href="../Booklist/My.html?nickname={{Nickname}}&subscribe=1">\n        <div class="icon"><img src="../public/img/SubscribeBooklist.png" alt=""></div>\n        <div class="text-center">{{if IsMySelf === true}}我{{else}}Ta{{/if}}收藏的书单</div>\n      </a>\n    </div>\n  </div>\n  {{if IsMySelf === false}}\n  <div class="row-fluid section">\n    <div class="sendDirectMessage span10 offset1 text-center">发送私信</div>\n  </div>\n  {{/if}}\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:4*/
    template("Review/All", "<div class=\"container\"> <div class='loadMore text-center hide'>加载更多书评</div> </div>"), 
    /*v:5*/
    template("Review/Detail", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), $escape = $utils.$escape, Review = $data.Review, IsLogin = $data.IsLogin, $out = "";
            return $out += '<div class="container" data-reviewid="', $line = 1, $out += $escape(Review.Id), 
            $out += '" data-bookid="', $line = 1, $out += $escape(Review.Book.Id), $out += '"> <div class="row-fluid title">', 
            $line = 2, $out += $escape(Review.Title), $out += '</div> <div class="info row-fluid"> <div class="user pull-left" id="', 
            $line = 4, $out += $escape(Review.Author.Id), $out += '"> <a href="../People/Detail.html?nickname=', 
            $line = 5, $out += $escape(Review.Author.Nickname), $out += '"> <div class="avatar pull-left"><img src="', 
            $line = 6, $out += $escape(Review.Author.AvatarUrl), $out += '" alt="" class="img-circle"></div> <div class="nickname pull-left">', 
            $line = 7, $out += $escape(Review.Author.Nickname), $out += '</div> </a> </div> <div class="ratingStar pull-left" data-score="', 
            $line = 10, $out += $escape(Review.Score), $out += '"></div> </div> <div class="content">', 
            $line = 12, $out += $escape(Review.Content), $out += '</div> <div class="book row-fluid" id="', 
            $line = 13, $out += $escape(Review.Book.Id), $out += '"> <a href="../Book/Detail.html?id=', 
            $line = 14, $out += $escape(Review.Book.Id), $out += '"></a> <div class="megaInfo row-fluid"> <div class="bookCover span3"> <img src="', 
            $line = 17, $out += $escape(Review.Book.ImageUrl), $out += '" alt="" data-srcimg="', 
            $line = 17, $out += $escape(Review.Book.ImageUrl), $out += '"> </div> <div class="bookMega span9"> <h4><strong>', 
            $line = 20, $out += $escape(Review.Book.Title), $out += '</strong></h4> <div class="pull-left">', 
            $line = 21, $out += $escape(Review.Book.Category), $out += '</div> </div> </div> </div> </div> <div class="row-fluid mega"> <table class="pull-right"> <tr> <td class="response"> <a href="Response.html?id=', 
            $line = 30, $out += $escape(Review.Id), $out += '"> <span class="glyphicons comments">', 
            $line = 31, $out += $escape(Review.ResponseSum), $out += '</span> </a> </td> <td class="thumbsUp"> <div><span class="glyphicons thumbs_up text-center">', 
            $line = 35, $out += $escape(Review.LikeSum), $out += '</span></div> </td> </tr> </table> </div> <script type="text/javascript"> window.logined = ', 
            $line = 42, IsLogin === !0 ? ($out += "true", $line = 42) : ($out += "false", $line = 42), 
            $out += "; </script>", new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="container" data-reviewid="{{Review.Id}}" data-bookid="{{Review.Book.Id}}">\n  <div class="row-fluid title">{{Review.Title}}</div>\n  <div class="info row-fluid">\n    <div class="user pull-left" id="{{Review.Author.Id}}">\n      <a href="../People/Detail.html?nickname={{Review.Author.Nickname}}">\n        <div class="avatar pull-left"><img src="{{Review.Author.AvatarUrl}}" alt="" class="img-circle"></div>\n        <div class="nickname pull-left">{{Review.Author.Nickname}}</div>\n      </a>\n    </div>\n    <div class="ratingStar pull-left" data-score="{{Review.Score}}"></div>\n  </div>\n  <div class="content">{{Review.Content}}</div>\n  <div class="book row-fluid" id="{{Review.Book.Id}}">\n    <a href="../Book/Detail.html?id={{Review.Book.Id}}"></a>\n    <div class="megaInfo row-fluid">\n      <div class="bookCover span3">\n        <img src="{{Review.Book.ImageUrl}}" alt="" data-srcimg="{{Review.Book.ImageUrl}}">\n      </div>\n      <div class="bookMega span9">\n        <h4><strong>{{Review.Book.Title}}</strong></h4>\n        <div class="pull-left">{{Review.Book.Category}}</div>\n      </div>\n    </div>\n  </div>\n</div>\n<div class="row-fluid mega">\n  <table class="pull-right">\n    <tr>\n      <td class="response">\n        <a href="Response.html?id={{Review.Id}}">\n          <span class="glyphicons comments">{{Review.ResponseSum}}</span>\n        </a>\n      </td>\n      <td class="thumbsUp">\n        <div><span class="glyphicons thumbs_up text-center">{{Review.LikeSum}}</span></div>\n      </td>\n    </tr>\n  </table>\n</div>\n\n<script type="text/javascript">\n  window.logined = {{if IsLogin === true}}true{{else}}false{{/if}};\n</script>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:4*/
    template("Search/Result", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), Books = $data.Books, $each = $utils.$each, $escape = ($data.$value, 
            $data.$index, $utils.$escape), Billboards = $data.Billboards, Booklists = $data.Booklists, BookSum = $data.BookSum, Users = ($data.$c, 
            $data.$i, $data.Users), $out = "";
            return $out += '<div class="container"> ', $line = 2, Books && ($out += ' <div class="row-fluid section books"> ', 
            $line = 4, $each(Books, function($value) {
                $out += ' <div class="book row-fluid" id="', $line = 5, $out += $escape($value.Id), 
                $out += '"> <a href="../Book/Detail.html?id=', $line = 6, $out += $escape($value.Id), 
                $out += '"></a> <div class="megaInfo row-fluid"> <div class="bookCover span3"> <img src="', 
                $line = 9, $out += $escape($value.ImageUrl), $out += '" alt="" data-srcimg="', $line = 9, 
                $out += $escape($value.ImageUrl), $out += '"> </div> <div class="bookMega span9"> <h4><strong>', 
                $line = 12, $out += $escape($value.Title), $out += '</strong></h4> <div class="pull-left">', 
                $line = 13, $out += $escape($value.Author), $out += '</div> <div class="clearfix"></div> <div class="pull-left">', 
                $line = 15, $out += $escape($value.Category), $out += '</div> <div class="pull-left ratingStar" data-score="', 
                $line = 16, $out += $escape($value.Score), $out += '"></div> </div> </div> </div> ', 
                $line = 20;
            }), $out += " </div> ", $line = 22), $out += " ", $line = 23, Billboards && ($out += ' <div class="row-fluid section billboards"> <div class="title">相关榜单</div> <hr> ', 
            $line = 27, $each(Billboards, function($value) {
                $out += ' <div class="ranking pull-left"> <a href="../Billboard/Detail.html?title=', 
                $line = 29, $out += $escape($value.Title), $out += "&version=", $line = 29, $out += $escape($value.Version), 
                $out += '"> <div class="rankingImage"> <img src="', $line = 31, $out += $escape($value.ImageUrl), 
                $out += '" alt=""> </div> <div class="rankingTitle text-center">', $line = 33, $out += $escape($value.Title), 
                $out += "</div> </a> </div> ", $line = 36;
            }), $out += " </div> ", $line = 38), $out += " ", $line = 39, Booklists && ($out += ' <div class="row-fluid section booklists"> <div class="title">相关书单</div> <hr> <div class="bls"> ', 
            $line = 44, $each(Booklists, function($value) {
                $out += ' <div class="booklist"> <a href="../Booklist/Detail.html?id=', $line = 46, 
                $out += $escape($value.Id), $out += '"> <div class="detail pull-left"> <h4 class="pull-left">', 
                $line = 48, $out += $escape($value.Title), $out += '</h4> <div class="pull-right small">(', 
                $line = 49, $out += $escape($value.BookSum), $out += ')</div> <div class="clearfix"></div> <div class="timestamp pull-right">', 
                $line = 51, $out += $escape($value.LastUpdateTime), $out += '前</div> <div class="clearfix"></div> ', 
                $line = 53, BookSum > 0 ? ($out += ' <div class="covers row-fluid"> ', $line = 55, 
                $each($value.BookCovers, function($c) {
                    $out += ' <div class="pull-left bookCover span3"><img src="', $line = 56, $out += $escape($c.ImageUrl), 
                    $out += '" alt="', $line = 56, $out += $escape($c.Title), $out += '" title="', $line = 56, 
                    $out += $escape($c.Title), $out += '"></div> ', $line = 57;
                }), $out += " </div> ", $line = 59) : ($out += ' <div class="covers">暂时还没有书籍被加入到本书单</div> ', 
                $line = 61), $out += ' <div class="clearfix"></div> ', $line = 63, $value.Description && ($out += ' <div class="row-fluid desc"> <div class="descTitle">【书单简介】</div> <div class="descText">', 
                $line = 66, $out += $escape($value.Description), $out += "</div> </div> ", $line = 68), 
                $out += ' </div> <div class="mega"> <table> <tr> <td class="span6"> <div class="glyphicons chat">', 
                $line = 74, $out += $escape($value.ResponseSum), $out += '</div> </td> <td class="span6"> <div class="glyphicons heart">', 
                $line = 77, $out += $escape($value.SubscribeSum), $out += "</div> </td> </tr> </table> </div> </a> </div> ", 
                $line = 84;
            }), $out += " </div> </div> ", $line = 87), $out += " ", $line = 88, Users && ($out += ' <div class="row-fluid section users"> <div class="title">相关用户</div> <hr> ', 
            $line = 92, $each(Users, function($value) {
                $out += ' <div class="user pull-left"> <a href="../People/Detail.html?nickname=', 
                $line = 94, $out += $escape($value.Nickname), $out += '"> <div class="userAvatar"> <img src="', 
                $line = 96, $out += $escape($value.AvatarUrl), $out += '" alt="" class="img-circle"> </div> <div class="nickname text-center">', 
                $line = 98, $out += $escape($value.Nickname), $out += "</div> </a> </div> ", $line = 101;
            }), $out += " </div> ", $line = 103), $out += " </div>", new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="container">\n  {{if Books}}\n  <div class="row-fluid section books">\n    {{each Books}}\n    <div class="book row-fluid" id="{{$value.Id}}">\n      <a href="../Book/Detail.html?id={{$value.Id}}"></a>\n      <div class="megaInfo row-fluid">\n        <div class="bookCover span3">\n          <img src="{{$value.ImageUrl}}" alt="" data-srcimg="{{$value.ImageUrl}}">\n        </div>\n        <div class="bookMega span9">\n          <h4><strong>{{$value.Title}}</strong></h4>\n          <div class="pull-left">{{$value.Author}}</div>\n          <div class="clearfix"></div>\n          <div class="pull-left">{{$value.Category}}</div>\n          <div class="pull-left ratingStar" data-score="{{$value.Score}}"></div>\n        </div>\n      </div>\n    </div>\n    {{/each}}\n  </div>\n  {{/if}}\n  {{if Billboards}}\n  <div class="row-fluid section billboards">\n    <div class="title">相关榜单</div>\n    <hr>\n    {{each Billboards}}\n    <div class="ranking pull-left">\n      <a href="../Billboard/Detail.html?title={{$value.Title}}&version={{$value.Version}}">\n        <div class="rankingImage">\n          <img src="{{$value.ImageUrl}}" alt="">\n        </div>\n        <div class="rankingTitle text-center">{{$value.Title}}</div>\n      </a>\n    </div>\n    {{/each}}\n  </div>\n  {{/if}}\n  {{if Booklists}}\n  <div class="row-fluid section booklists">\n    <div class="title">相关书单</div>\n    <hr>\n    <div class="bls">\n      {{each Booklists}}\n      <div class="booklist">\n        <a href="../Booklist/Detail.html?id={{$value.Id}}">\n          <div class="detail pull-left">\n            <h4 class="pull-left">{{$value.Title}}</h4>\n            <div class="pull-right small">({{$value.BookSum}})</div>\n            <div class="clearfix"></div>\n            <div class="timestamp pull-right">{{$value.LastUpdateTime}}前</div>\n            <div class="clearfix"></div>\n            {{if BookSum > 0}}\n            <div class="covers row-fluid">\n              {{each $value.BookCovers as $c $i}}\n                <div class="pull-left bookCover span3"><img src="{{$c.ImageUrl}}" alt="{{$c.Title}}" title="{{$c.Title}}"></div>\n              {{/each}}\n            </div>\n            {{else}}\n            <div class="covers">暂时还没有书籍被加入到本书单</div>\n            {{/if}}\n            <div class="clearfix"></div>\n            {{if $value.Description}}\n            <div class="row-fluid desc">\n              <div class="descTitle">【书单简介】</div>\n              <div class="descText">{{$value.Description}}</div>\n            </div>\n            {{/if}}\n          </div>\n          <div class="mega">\n            <table>\n              <tr>\n                <td class="span6">\n                  <div class="glyphicons chat">{{$value.ResponseSum}}</div>\n                </td>\n                <td class="span6">\n                  <div class="glyphicons heart">{{$value.SubscribeSum}}</div>\n                </td>\n              </tr>\n            </table>\n          </div>\n        </a>\n      </div>\n      {{/each}}\n    </div>\n  </div>\n  {{/if}}\n  {{if Users}}\n  <div class="row-fluid section users">\n    <div class="title">相关用户</div>\n    <hr>\n    {{each Users}}\n    <div class="user pull-left">\n      <a href="../People/Detail.html?nickname={{$value.Nickname}}">\n        <div class="userAvatar">\n          <img src="{{$value.AvatarUrl}}" alt="" class="img-circle">\n        </div>\n        <div class="nickname text-center">{{$value.Nickname}}</div>\n      </a>\n    </div>\n    {{/each}}\n  </div>\n  {{/if}}\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:38*/
    template("public/ActionBar", '<div class="actionbar row-fluid"> <div class="actionbar-section left-button pull-left"> <div class="slide-menu hide"> <div class="glyphicons show_lines"></div> <div class="badge"></div> </div> <div class="back"><div class="glyphicons chevron-left"></div></div> </div> <div class="actionbar-section center title-section pull-left"> <div class="page-title pull-left"></div> <div class="btn-group pull-left channel hide"> <a class="btn btn-link dropdown-toggle" data-toggle="dropdown" href="#"> <img src="public/img/Crown.png" alt="" class="current-channel pull-left"> <div class="arrow pull-left"></div> </a> <ul class="dropdown-menu"> <li><a href="?ch=m"><img src="public/img/Crown.png" alt=""></a></li> <li><a href="?ch=f"><img src="public/img/Crown_Woman.png" alt=""></a></li> </ul> </div> </div> <div class="actionbar-section center pull-left hide loading"> <div class="pullingText">下拉刷新...</div> </div> <div class="actionbar-section right-button pull-right"> <div class="buttons"> <a href="file:///android_asset/www/Search/Index.html" class="button hide glyphicons search"></a> <div class="write hide"> <div class="pull-left button post">发送</div> </div> <div class="message-center pull-left hide"> <a href="file:///android_asset/www/MessageCenter/Index.html" class=""> <img src="../public/img/MessageCenter.png"> <span class="badge unreadCount"></span> </a> </div> <div class="follow pull-left hide"><a href="file:///android_asset/www/MessageCenter/Index.html" class="glyphicons heart"></a></div> <div class="side-menu hide pull-left btn-group"> <a class="dropdown-toggle" data-toggle="dropdown" href="#"><img src="../public/img/sidemenu.png"></a> <ul class="dropdown-menu pull-right"> <li><a tabindex="-1" href="#" id="logout">退出登录</a></li> </ul> </div> </div> </div> <div class="pullbar"></div> </div> <div class="container spinner"></div>'), 
    /*v:4*/
    template("public/ArticleItem", function($data, $filename) {
        try {
            var $utils = this, $helpers = $utils.$helpers, $line = 0, $string = $utils.$string, $substring = $helpers.$substring, Title = $data.Title, $escape = $utils.$escape, Author = $data.Author, OnlineTime = $data.OnlineTime, ImageUrl = $data.ImageUrl, Id = $data.Id, $out = "";
            return $out += '<div class="articleItem row-fluid"> <div class="row-fluid"> <div class="articleTitleText">', 
            $line = 3, $out += $string($substring(Title, 0, 50)), $out += '</div> </div> <div class="row-fluid"> <div class="info span8"> <div class="author pull-left muted dotdotdotForLongText">', 
            $line = 7, $out += $escape(Author), $out += '</div> <div class="time pull-right muted">', 
            $line = 8, $out += $escape(OnlineTime), $out += '前</div> </div> <div class="span4"> <img src="', 
            $line = 11, ImageUrl ? ($line = 11, $out += $escape(ImageUrl), $out += "?imageView/2/h/34", 
            $line = 11) : ($out += "http://shanpowbookcover.qiniudn.com/%E5%B0%8F%E7%BC%96%E5%81%B7%E6%87%92%E6%B2%A1%E9%85%8D%E5%9B%BE.png", 
            $line = 11), $out += '" alt=""> </div> </div> <a href="file:///android_asset/www/Article/Detail.html?id=', 
            $line = 14, $out += $escape(Id), $out += '"></a> </div>', new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="articleItem row-fluid">\n  <div class="row-fluid">\n    <div class="articleTitleText">{{$substring Title 0 50}}</div>\n  </div>\n  <div class="row-fluid">\n    <div class="info span8">\n      <div class="author pull-left muted dotdotdotForLongText">{{Author}}</div>\n      <div class="time pull-right muted">{{OnlineTime}}前</div>\n    </div>\n    <div class="span4">\n      <img src="{{if ImageUrl}}{{ImageUrl}}?imageView/2/h/34{{else}}http://shanpowbookcover.qiniudn.com/%E5%B0%8F%E7%BC%96%E5%81%B7%E6%87%92%E6%B2%A1%E9%85%8D%E5%9B%BE.png{{/if}}" alt="">\n    </div>\n  </div>\n  <a href="file:///android_asset/www/Article/Detail.html?id={{Id}}"></a>\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:4*/
    template("public/Book", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), $escape = $utils.$escape, Id = $data.Id, ImageUrl = $data.ImageUrl, Title = $data.Title, CreationTime = $data.CreationTime, Author = $data.Author, Category = $data.Category, Score = $data.Score, $out = "";
            return $out += '<div class="book row-fluid" id="', $line = 1, $out += $escape(Id), 
            $out += '"> <a href="file:///android_asset/www/Book/Detail.html?id=', $line = 2, 
            $out += $escape(Id), $out += '"></a> <div class="megaInfo row-fluid"> <div class="bookCover span3"> <img src="', 
            $line = 5, $out += $escape(ImageUrl), $out += '" alt=""> </div> <div class="bookMega span9"> <h4>', 
            $line = 8, $out += $escape(Title), $out += '</h4> <div class="pull-left time">', 
            $line = 9, $out += $escape(CreationTime), $out += '</div> <div class="clearfix"></div> <div class="pull-left author">', 
            $line = 11, $out += $escape(Author), $out += '</div> <div class="clearfix"></div> <div class="pull-left category">', 
            $line = 13, $out += $escape(Category), $out += "</div> <div class='pull-left ratingStar' data-score='", 
            $line = 14, $out += $escape(Score), $out += "'></div> </div> </div> </div>", new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="book row-fluid" id="{{Id}}">\n  <a href="file:///android_asset/www/Book/Detail.html?id={{Id}}"></a>\n  <div class="megaInfo row-fluid">\n    <div class="bookCover span3">\n      <img src="{{ImageUrl}}" alt="">\n    </div>\n    <div class="bookMega span9">\n      <h4>{{Title}}</h4>\n      <div class="pull-left time">{{CreationTime}}</div>\n      <div class="clearfix"></div>\n      <div class="pull-left author">{{Author}}</div>\n      <div class="clearfix"></div>\n      <div class="pull-left category">{{Category}}</div>\n      <div class=\'pull-left ratingStar\' data-score=\'{{Score}}\'></div>\n    </div>\n  </div>\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:4*/
    template("public/BookBook", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), $escape = $utils.$escape, BookId = $data.BookId, BookImageUrl = $data.BookImageUrl, BookTitle = $data.BookTitle, CreationTime = $data.CreationTime, BookAuthor = $data.BookAuthor, BookCategory = $data.BookCategory, BookScore = $data.BookScore, $out = "";
            return $out += '<div class="book row-fluid" id="', $line = 1, $out += $escape(BookId), 
            $out += '"> <a href="file:///android_asset/www/Book/Detail.html?id=', $line = 2, 
            $out += $escape(BookId), $out += '"></a> <div class="megaInfo row-fluid"> <div class="bookCover span3"> <img src="', 
            $line = 5, $out += $escape(BookImageUrl), $out += '" alt=""> </div> <div class="bookMega span9"> <h4>', 
            $line = 8, $out += $escape(BookTitle), $out += '</h4> <div class="pull-left time">', 
            $line = 9, $out += $escape(CreationTime), $out += '</div> <div class="clearfix"></div> <div class="pull-left author">', 
            $line = 11, $out += $escape(BookAuthor), $out += '</div> <div class="clearfix"></div> <div class="pull-left category">', 
            $line = 13, $out += $escape(BookCategory), $out += "</div> <div class='pull-left ratingStar' data-score='", 
            $line = 14, $out += $escape(BookScore), $out += "'></div> </div> </div> </div>", 
            new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="book row-fluid" id="{{BookId}}">\n  <a href="file:///android_asset/www/Book/Detail.html?id={{BookId}}"></a>\n  <div class="megaInfo row-fluid">\n    <div class="bookCover span3">\n      <img src="{{BookImageUrl}}" alt="">\n    </div>\n    <div class="bookMega span9">\n      <h4>{{BookTitle}}</h4>\n      <div class="pull-left time">{{CreationTime}}</div>\n      <div class="clearfix"></div>\n      <div class="pull-left author">{{BookAuthor}}</div>\n      <div class="clearfix"></div>\n      <div class="pull-left category">{{BookCategory}}</div>\n      <div class=\'pull-left ratingStar\' data-score=\'{{BookScore}}\'></div>\n    </div>\n  </div>\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:4*/
    template("public/BookWithComment", function($data, $filename) {
        try {
            var $utils = this, $helpers = $utils.$helpers, $line = 0, $escape = $utils.$escape, Id = $data.Id, ImageUrl = $data.ImageUrl, Title = $data.Title, Author = $data.Author, $string = $utils.$string, $substring = $helpers.$substring, Summary = $data.Summary, Comment = $data.Comment, $out = "";
            return $out += '<li class="book row-fluid" id="', $line = 1, $out += $escape(Id), 
            $out += '"> <a href="../Book/Detail.html?id=', $line = 2, $out += $escape(Id), $out += '"></a> <div class="megaInfo row-fluid"> <div class="bookCover span3"> <img src="', 
            $line = 5, $out += $escape(ImageUrl), $out += '" alt=""> </div> <div class="bookMega span9"> <div class="row-fluid"> <div class="pull-left">', 
            $line = 9, $out += $escape(Title), $out += '</div> <div class="pull-left author">', 
            $line = 10, $out += $escape(Author), $out += '</div> </div> <div class="row-fluid">', 
            $line = 12, $out += $string($substring(Summary, 0, 50)), $out += "</div> </div> </div> ", 
            $line = 15, Comment && ($out += ' <div class="comment row-fluid">', $line = 16, 
            $out += $escape(Comment), $out += "</div> ", $line = 17), $out += " </li>", new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<li class="book row-fluid" id="{{Id}}">\n  <a href="../Book/Detail.html?id={{Id}}"></a>\n  <div class="megaInfo row-fluid">\n    <div class="bookCover span3">\n      <img src="{{ImageUrl}}" alt="">\n    </div>\n    <div class="bookMega span9">\n      <div class="row-fluid">\n        <div class="pull-left">{{Title}}</div>\n        <div class="pull-left author">{{Author}}</div>\n      </div>\n      <div class="row-fluid">{{$substring Summary 0 50}}</div>\n    </div>\n  </div>\n  {{if Comment}}\n  <div class="comment row-fluid">{{Comment}}</div>\n  {{/if}}\n</li>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:4*/
    template("public/Booklist", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), $escape = $utils.$escape, Id = $data.Id, Title = $data.Title, BookSum = $data.BookSum, LastUpdateTime = $data.LastUpdateTime, $each = $utils.$each, BookCovers = $data.BookCovers, Description = ($data.$value, 
            $data.$index, $data.Description), ResponseSum = $data.ResponseSum, SubscribeSum = $data.SubscribeSum, $out = "";
            return $out += '<div class="item"> <a href="file:///android_asset/www/Booklist/Detail.html?id=', 
            $line = 2, $out += $escape(Id), $out += '"> <div class="detail pull-left"> <h4 class="pull-left">', 
            $line = 4, $out += $escape(Title), $out += '</h4> <div class="pull-right small">(', 
            $line = 5, $out += $escape(BookSum), $out += ')</div> <div class="clearfix"></div> <div class="timestamp pull-right">', 
            $line = 7, $out += $escape(LastUpdateTime), $out += '前</div> <div class="clearfix"></div> ', 
            $line = 9, BookSum > 0 ? ($out += ' <div class="covers row-fluid"> ', $line = 11, 
            $each(BookCovers, function($value) {
                $out += ' <div class="pull-left bookCover span3"><img src="', $line = 12, $out += $escape($value), 
                $out += '"></div> ', $line = 13;
            }), $out += " </div> ", $line = 15) : ($out += ' <div class="covers">暂时还没有书籍被加入到本书单</div> ', 
            $line = 17), $out += ' <div class="clearfix"></div> ', $line = 19, Description && ($out += ' <div class="row-fluid desc"> <div class="descTitle">【书单简介】</div> <div class="descText">', 
            $line = 22, $out += $escape(Description), $out += "</div> </div> ", $line = 24), 
            $out += ' </div> <div class="mega"> <table> <tr> <td class="span6"> <div class="glyphicons chat">', 
            $line = 30, $out += $escape(ResponseSum), $out += '</div> </td> <td class="span6"> <div class="glyphicons heart">', 
            $line = 33, $out += $escape(SubscribeSum), $out += "</div> </td> </tr> </table> </div> </a> </div>", 
            new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="item">\n  <a href="file:///android_asset/www/Booklist/Detail.html?id={{Id}}">\n    <div class="detail pull-left">\n      <h4 class="pull-left">{{Title}}</h4>\n      <div class="pull-right small">({{BookSum}})</div>\n      <div class="clearfix"></div>\n      <div class="timestamp pull-right">{{LastUpdateTime}}前</div>\n      <div class="clearfix"></div>\n      {{if BookSum > 0}}\n      <div class="covers row-fluid">\n        {{each BookCovers}}\n          <div class="pull-left bookCover span3"><img src="{{$value}}"></div>\n        {{/each}}\n      </div>\n      {{else}}\n      <div class="covers">暂时还没有书籍被加入到本书单</div>\n      {{/if}}\n      <div class="clearfix"></div>\n      {{if Description}}\n      <div class="row-fluid desc">\n        <div class="descTitle">【书单简介】</div>\n        <div class="descText">{{Description}}</div>\n      </div>\n      {{/if}}\n    </div>\n    <div class="mega">\n      <table>\n        <tr>\n          <td class="span6">\n            <div class="glyphicons chat">{{ResponseSum}}</div>\n          </td>\n          <td class="span6">\n            <div class="glyphicons heart">{{SubscribeSum}}</div>\n          </td>\n        </tr>\n      </table>\n    </div>\n  </a>\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:9*/
    template("public/ErrorMsg", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), onBlank = $data.onBlank, $escape = $utils.$escape, tip = $data.tip, $out = "";
            return $out += '<div class="error-msg ', $line = 1, onBlank === !1 && ($out += "black", 
            $line = 1), $out += '"> <img src="file:///android_asset/www/public/img/down-25', 
            $line = 2, onBlank === !1 && ($out += "-white", $line = 2), $out += '.png" alt=""> <span>', 
            $line = 3, $out += $escape(tip), $out += "</span> </div>", new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="error-msg {{if onBlank === false}}black{{/if}}">\n  <img src="file:///android_asset/www/public/img/down-25{{if onBlank === false}}-white{{/if}}.png" alt="">\n  <span>{{tip}}</span>\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:10*/
    template("public/InputGroup", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), IsLogin = $data.IsLogin, $out = "";
            return $line = 1, IsLogin === !0 && ($out += ' <div class="postResponse row-fluid" id="input-group"> <textarea id="replyInput" type="text" class="span10" name="q" rows="1"></textarea> <div id="submit" class="glyphicons ok_2"></div> </div> <script type="text/javascript"> autoTextarea($("#replyInput")[0], 10, 200); </script> ', 
            $line = 9), new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '{{if IsLogin === true}}\n<div class="postResponse row-fluid" id="input-group">\n  <textarea id="replyInput" type="text" class="span10" name="q" rows="1"></textarea>\n  <div id="submit" class="glyphicons ok_2"></div>\n</div>\n<script type="text/javascript">\n  autoTextarea($("#replyInput")[0], 10, 200);\n</script>\n{{/if}}'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:4*/
    template("public/Response", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), $escape = $utils.$escape, Id = $data.Id, Author = $data.Author, Content = $data.Content, CreationTime = $data.CreationTime, $out = "";
            return $out += '<div class="responseItem row-fluid" id="', $line = 1, $out += $escape(Id), 
            $out += '"> <div class="author row-fluid"> <div class="avatar pull-left span2"> <a href="../People/Detail.html?nickname=', 
            $line = 4, $out += $escape(Author.Nickname), $out += '"><img src="', $line = 4, 
            $out += $escape(Author.AvatarUrl), $out += '" alt="" class="img-circle"></a> </div> <div class="name span10"> <a href="../People/Detail.html?nickname=', 
            $line = 7, $out += $escape(Author.Nickname), $out += '" class="pull-left">', $line = 7, 
            $out += $escape(Author.Nickname), $out += '</a>说： <a href="#" class="responseBtn pull-right">回复</a> </div> </div> <div class="responseContent row-fluid"> <div class="responseText">', 
            $line = 12, $out += $escape(Content), $out += '</div> <div class="timestamp pull-right">', 
            $line = 13, $out += $escape(CreationTime), $out += '前</div> <div class="status loading hide pull-right"></div> </div> </div>', 
            new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="responseItem row-fluid" id="{{Id}}">\n  <div class="author row-fluid">\n    <div class="avatar pull-left span2">\n      <a href="../People/Detail.html?nickname={{Author.Nickname}}"><img src="{{Author.AvatarUrl}}" alt="" class="img-circle"></a>\n    </div>\n    <div class="name span10">\n      <a href="../People/Detail.html?nickname={{Author.Nickname}}" class="pull-left">{{Author.Nickname}}</a>说：\n      <a href="#" class="responseBtn pull-right">回复</a>\n    </div>\n  </div>\n  <div class="responseContent row-fluid">\n    <div class="responseText">{{Content}}</div>\n    <div class="timestamp pull-right">{{CreationTime}}前</div>\n    <div class="status loading hide pull-right"></div>\n  </div>\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:6*/
    template("public/Responses", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), $escape = $utils.$escape, AuthorId = $data.AuthorId, Id = $data.Id, AvatarUrl = $data.AvatarUrl, Nickname = $data.Nickname, BookId = $data.BookId, $each = $utils.$each, Responses = $data.Responses, include = ($data.$value, 
            $data.$index, function(filename, data) {
                data = data || $data;
                var text = $utils.$include(filename, data, $filename);
                return $out += text;
            }), $out = "";
            return $out += '<div class="container" data-authorid="', $line = 1, $out += $escape(AuthorId), 
            $out += '" data-id="', $line = 1, $out += $escape(Id), $out += '" data-avatar="', 
            $line = 1, $out += $escape(AvatarUrl), $out += '" data-nickname="', $line = 1, $out += $escape(Nickname), 
            $out += '" data-bookid="', $line = 1, $out += $escape(BookId), $out += '"> ', $line = 2, 
            $each(Responses, function($value) {
                $out += " ", $line = 3, include("./Response", $value), $out += " ", $line = 4;
            }), $out += " </div>", new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="container" data-authorid="{{AuthorId}}" data-id="{{Id}}" data-avatar="{{AvatarUrl}}" data-nickname="{{Nickname}}" data-bookid="{{BookId}}">\n  {{each Responses}}\n  {{include "./Response" $value}}\n  {{/each}}\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:4*/
    template("public/Review", function($data, $filename) {
        try {
            var $utils = this, $helpers = $utils.$helpers, $line = 0, $escape = $utils.$escape, Id = $data.Id, Title = $data.Title, $string = $utils.$string, $substring = $helpers.$substring, Content = $data.Content, Book = $data.Book, Author = $data.Author, Score = $data.Score, ResponseSum = $data.ResponseSum, LikeSum = $data.LikeSum, $out = "";
            return $out += '<div class="review" id="', $line = 1, $out += $escape(Id), $out += '"> <a href="file:///android_asset/www/', 
            $line = 2, Title ? ($out += "Review", $line = 2) : ($out += "Comment", $line = 2), 
            $out += "/Detail.html?id=", $line = 2, $out += $escape(Id), $out += '"></a> <div class="row-fluid reviewBasic"> <div class="reviewInfo pull-left"> ', 
            $line = 5, Title && ($out += ' <div class="reviewTitle dotdotdotForLongText"><strong>', 
            $line = 6, $out += $escape(Title), $out += "</strong></div> ", $line = 7), $out += ' <div class="content">', 
            $line = 8, Title ? ($line = 8, $out += $string($substring(Content, 0, 40)), $line = 8) : ($line = 8, 
            $out += $string($substring(Content, 0, 50)), $line = 8), $out += '</div> </div> <div class="bookCover pull-left"> <a href="Book/Detail.html?id=', 
            $line = 11, $out += $escape(Book.Id), $out += '"></a> <img src="', $line = 12, $out += $escape(Book.ImageUrl), 
            $out += '" alt=""> <div class="bookTitle text-center">', $line = 13, $out += $string($substring(Book.Title, 0, 10)), 
            $out += '</div> </div> </div> <div class="row-fluid reviewRelated"> <div class="user span8 row-fluid"> <div class="avatar span3"> <div class="arrow"></div> <a href="People/Detail.html?nickname=', 
            $line = 20, $out += $escape(Author.Nickname), $out += '"><img src="', $line = 20, 
            $out += $escape(Author.AvatarUrl), $out += '" alt="" class="img-circle"></a> </div> <div class="userInfo span8"> <div class="row-fluid dotdotdotForLongText"><a href="People/Detail.html?nickname=', 
            $line = 23, $out += $escape(Author.Nickname), $out += '">', $line = 23, $out += $string($substring(Author.Nickname, 0, 10)), 
            $out += '</a></div> <div class="row-fluid"><div class="ratingStar" data-score="', 
            $line = 24, $out += $escape(Score), $out += '"></div></div> </div> </div> <div class="mega span4 row-fluid"> <div class="span6"><div class="glyphicons comments">', 
            $line = 28, $out += $escape(ResponseSum), $out += '</div></div> <div class="span6"><div class="glyphicons thumbs_up">', 
            $line = 29, $out += $escape(LikeSum), $out += "</div></div> </div> </div> </div>", 
            new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="review" id="{{Id}}">\n  <a href="file:///android_asset/www/{{if Title}}Review{{else}}Comment{{/if}}/Detail.html?id={{Id}}"></a>\n  <div class="row-fluid reviewBasic">\n    <div class="reviewInfo pull-left">\n      {{if Title}}\n      <div class="reviewTitle dotdotdotForLongText"><strong>{{Title}}</strong></div>\n      {{/if}}\n      <div class="content">{{if Title}}{{$substring Content 0 40}}{{else}}{{$substring Content 0 50}}{{/if}}</div>\n    </div>\n    <div class="bookCover pull-left">\n      <a href="Book/Detail.html?id={{Book.Id}}"></a>\n      <img src="{{Book.ImageUrl}}" alt="">\n      <div class="bookTitle text-center">{{$substring Book.Title 0 10}}</div>\n    </div>\n  </div>\n  <div class="row-fluid reviewRelated">\n    <div class="user span8 row-fluid">\n      <div class="avatar span3">\n        <div class="arrow"></div>\n        <a href="People/Detail.html?nickname={{Author.Nickname}}"><img src="{{Author.AvatarUrl}}" alt="" class="img-circle"></a>\n      </div>\n      <div class="userInfo span8">\n        <div class="row-fluid dotdotdotForLongText"><a href="People/Detail.html?nickname={{Author.Nickname}}">{{$substring Author.Nickname 0 10}}</a></div>\n        <div class="row-fluid"><div class="ratingStar" data-score="{{Score}}"></div></div>\n      </div>\n    </div>\n    <div class="mega span4 row-fluid">\n      <div class="span6"><div class="glyphicons comments">{{ResponseSum}}</div></div>\n      <div class="span6"><div class="glyphicons thumbs_up">{{LikeSum}}</div></div>\n    </div>\n  </div>\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    }), /*v:4*/
    template("public/WizardBook", function($data, $filename) {
        try {
            var $utils = this, $helpers = $utils.$helpers, $line = 0, $escape = $utils.$escape, ImageUrl = $data.ImageUrl, Title = $data.Title, Author = $data.Author, $string = $utils.$string, $substring = $helpers.$substring, Summary = $data.Summary, Id = $data.Id, $out = "";
            return $out += "<div class='book row-fluid'> <div class='bookCover span3'> <img src='", 
            $line = 3, $out += $escape(ImageUrl), $out += "' alt=''> </div> <div class='bookMega span9'> <div class='row-fluid'> <div class='pull-left'>", 
            $line = 7, $out += $escape(Title), $out += "</div> <div class='pull-left author'>", 
            $line = 8, $out += $escape(Author), $out += "</div> </div> <div class='row-fluid'>", 
            $line = 10, $out += $string($substring(Summary, 0, 50)), $out += "</div> </div> <a href='file:///android_asset/www/Book/Detail.html?id=", 
            $line = 12, $out += $escape(Id), $out += "'></a> </div>", new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: "<div class='book row-fluid'>\n  <div class='bookCover span3'>\n    <img src='{{ImageUrl}}' alt=''>\n  </div>\n  <div class='bookMega span9'>\n    <div class='row-fluid'>\n      <div class='pull-left'>{{Title}}</div>\n      <div class='pull-left author'>{{Author}}</div>\n    </div>\n    <div class='row-fluid'>{{$substring Summary 0 50}}</div>\n  </div>\n  <a href='file:///android_asset/www/Book/Detail.html?id={{Id}}'></a>\n</div>".split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
            };
        }
    });
}();