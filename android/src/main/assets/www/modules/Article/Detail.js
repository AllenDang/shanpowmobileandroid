/*TMODJS:{"debug":true,"version":7,"md5":"ef28119558730b08a1e6ab1713321bad"}*/
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
        $out += '"> <a href="People/Detail.html?nickname=';
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
                $out += ' <div class="book span3"> <a href="Book/Detail.html?id=';
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
        $out += ' </div> <div class="row-fluid mega"> <table class="pull-right"> <tr> <td class="response"> <a href="Article/Response.html?id=';
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
            source: '<div class="container" data-reviewid="{{article.Id}}">\n  <div class="row-fluid title">{{article.Title}}</div>\n  <div class="info row-fluid">\n    <div class="user pull-left" id="{{article.Author.Id}}">\n      <a href="People/Detail.html?nickname={{article.Author.Nickname}}">\n        <div class="avatar pull-left"><img src="{{article.Author.AvatarUrl}}" alt="" class="img-circle"></div>\n        <div class="nickname pull-left">{{article.Author.Nickname}}</div>\n      </a>\n    </div>\n  </div>\n  <div class="content">{{#article.Content}}</div>\n  {{if relatedBooks}}\n  <div class="section row-fluid similarBooks">\n    <div class="row-fluid title">\n      <span>相关书籍</span>\n    </div>\n    <div class="row-fluid">\n      {{each relatedBooks}}\n      <div class="book span3">\n        <a href="Book/Detail.html?id={{$value.Id}}">\n          <div class="bookCover">\n            <div class="wrapper"><img src="{{$value.ImageUrl}}" alt=""></div>\n          </div>\n          <div class="bookTitle text-center">{{$value.Title}}</div>\n        </a>\n      </div>\n      {{/each}}\n    </div>\n  </div>\n  {{/if}}\n</div>\n<div class="row-fluid mega">\n  <table class="pull-right">\n    <tr>\n      <td class="response">\n        <a href="Article/Response.html?id={{article.Id}}">\n          <span class="glyphicons comments">{{article.ResponseSum}}</span>\n        </a>\n      </td>\n      <td class="viewcount">\n        <div><span class="glyphicons eye_open">{{article.ViewCount}}</span></div>\n      </td>\n    </tr>\n  </table>\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
        };
    }
    return new String($out);
});