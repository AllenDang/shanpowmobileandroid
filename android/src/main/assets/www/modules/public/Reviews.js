/*TMODJS:{"debug":true,"version":15,"md5":"c5f797dfd3a9694b1aec02bcaeee6812"}*/
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