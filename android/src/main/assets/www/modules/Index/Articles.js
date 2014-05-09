/*TMODJS:{"debug":true,"version":6,"md5":"ac724739b4cab6d6b9739de723f89929"}*/
template("Index/Articles", function($data, $id) {
    var $helpers = this, $line = 0, $each = $helpers.$each, articles = $data.articles, $value = $data.$value, $index = $data.$index, $escape = $helpers.$escape, $string = $helpers.$string, $substring = $helpers.$substring, $out = "";
    try {
        $line = 1;
        $each(articles, function($value, $index) {
            $out += ' <div class="articleItem slide"> <a href="/m/article/';
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
            source: '{{each articles}}\n<div class="articleItem slide">\n  <a href="/m/article/{{$value.Id}}"></a>\n  <img src="{{if $value.ImageUrl}}{{$value.ImageUrl}}{{else}}http://shanpowbookcover.qiniudn.com/%E5%B0%8F%E7%BC%96%E5%81%B7%E6%87%92%E6%B2%A1%E9%85%8D%E5%9B%BE.png{{/if}}" alt="">\n  <div class="titleWrapper"><div class="articleTitle">{{$substring $value.Title 0 50}}</div></div>\n</div>\n{{/each}}'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
        };
    }
    return new String($out);
});