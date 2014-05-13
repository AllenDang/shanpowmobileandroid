/*TMODJS:{"debug":true,"version":2,"md5":"64a118d122e3e35e531b88f779029e92"}*/
template("Billboard/Detail", function($data, $id) {
    var $helpers = this, $line = 0, $escape = $helpers.$escape, CreationTime = $data.CreationTime, NextVersionPlan = $data.NextVersionPlan, $each = $helpers.$each, Books = $data.Books, $value = $data.$value, $index = $data.$index, $string = $helpers.$string, $substring = $helpers.$substring, ViewCount = $data.ViewCount, LikeSum = $data.LikeSum, $out = "";
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
            $out += ' <li class="book row-fluid" id="';
            $line = 10;
            $out += $escape($value.Id);
            $out += '"> <a href="../Book/Detail.html?id=';
            $line = 11;
            $out += $escape($value.Id);
            $out += '"></a> <div class="megaInfo row-fluid"> <div class="bookCover span3"> <img src="';
            $line = 14;
            $out += $escape($value.ImageUrl);
            $out += '" alt=""> </div> <div class="bookMega span9"> <div class="row-fluid"> <div class="pull-left">';
            $line = 18;
            $out += $escape($value.Title);
            $out += '</div> <div class="pull-left author">';
            $line = 19;
            $out += $escape($value.Author);
            $out += '</div> </div> <div class="row-fluid">';
            $line = 21;
            $out += $string($substring($value.Summary, 0, 50));
            $out += "</div> </div> </div> ";
            $line = 24;
            if ($value.Comment) {
                $out += ' <div class="comment row-fluid"> <div class="span3 text-right">看点</div> <div class="span9">';
                $line = 27;
                $out += $escape($value.Comment);
                $out += "</div> </div> ";
                $line = 29;
            }
            $out += " </li> ";
            $line = 31;
        });
        $out += ' </ul> </div> </div> <div class="mega"> <table> <tr> <td class="span6"> <div class="glyphicons eye_open">';
        $line = 39;
        $out += $escape(ViewCount);
        $out += '</div> </td> <td class="span6"> <div class="glyphicons heart">';
        $line = 42;
        $out += $escape(LikeSum);
        $out += "</div> </td> </tr> </table> </div>";
    } catch (e) {
        throw {
            id: $id,
            name: "Render Error",
            message: e.message,
            line: $line,
            source: '<div class="container">\n  <div class="row-fluid text-center">本期发布于{{CreationTime}}</div>\n  {{if NextVersionPlan > 0}}\n  <div class="desc row-fluid text-center">距离下期发布还有{{NextVersionPlan}}天</div>\n  {{/if}}\n  <hr>\n  <div class="listDetail tab-pane active" id="allbooks">\n    <ul class="unstyled">\n      {{each Books}}\n      <li class="book row-fluid" id="{{$value.Id}}">\n        <a href="../Book/Detail.html?id={{$value.Id}}"></a>\n        <div class="megaInfo row-fluid">\n          <div class="bookCover span3">\n            <img src="{{$value.ImageUrl}}" alt="">\n          </div>\n          <div class="bookMega span9">\n            <div class="row-fluid">\n              <div class="pull-left">{{$value.Title}}</div>\n              <div class="pull-left author">{{$value.Author}}</div>\n            </div>\n            <div class="row-fluid">{{$substring $value.Summary 0 50}}</div>\n          </div>\n        </div>\n        {{if $value.Comment}}\n        <div class="comment row-fluid">\n          <div class="span3 text-right">看点</div>\n          <div class="span9">{{$value.Comment}}</div>\n        </div>\n        {{/if}}\n      </li>\n      {{/each}}\n    </ul>\n  </div>\n</div>\n<div class="mega">\n  <table>\n    <tr>\n      <td class="span6">\n        <div class="glyphicons eye_open">{{ViewCount}}</div>\n      </td>\n      <td class="span6">\n        <div class="glyphicons heart">{{LikeSum}}</div>\n      </td>\n    </tr>\n  </table>\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
        };
    }
    return new String($out);
});