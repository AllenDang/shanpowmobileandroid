/*TMODJS:{"debug":true,"version":6,"md5":"31d9165dc4d54b853a0d1b29c27a94b4"}*/
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