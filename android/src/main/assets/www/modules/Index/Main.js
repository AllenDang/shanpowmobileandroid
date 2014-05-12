/*TMODJS:{"debug":true,"version":8,"md5":"9580fd26539aa0bc652d62a174abdbfc"}*/
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