/*TMODJS:{"debug":true,"version":8,"md5":"770adbf1b3ccf8bce141533dc69a0676"}*/
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