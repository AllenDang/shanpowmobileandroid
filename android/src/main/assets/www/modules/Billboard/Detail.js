/*TMODJS:{"debug":true,"version":4,"md5":"b16df4c9bb08dfb4bb508d62dce99e0f"}*/
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