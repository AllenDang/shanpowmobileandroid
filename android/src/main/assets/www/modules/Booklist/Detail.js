/*TMODJS:{"debug":true,"version":3,"md5":"1bd9bb2f6e9f8e6d713fda1a4b82e898"}*/
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