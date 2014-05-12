/*TMODJS:{"debug":true,"version":3,"md5":"73ae9d8353d3683dd45b7d0ff61df658"}*/
template("Index/Wizard", function($data, $id) {
    var $helpers = this, $line = 0, isLogin = $data.isLogin, $each = $helpers.$each, guessBooks = $data.guessBooks, $value = $data.$value, $index = $data.$index, $escape = $helpers.$escape, $out = "";
    try {
        $line = 1;
        if (isLogin === true) {
            $out += " ";
            $line = 2;
            $each(guessBooks, function($value, $index) {
                $out += ' <div class="wizardBook span3"> <a href="/m/book/';
                $line = 4;
                $out += $escape($value.Id);
                $out += '"> <div class="bookCover"> <div class="wrapper"><img src="';
                $line = 6;
                $out += $escape($value.ImageUrl);
                $out += '" alt=""></div> </div> <div class="bookTitle text-center">';
                $line = 8;
                $out += $escape($value.Title);
                $out += "</div> </a> </div> ";
                $line = 11;
            });
            $out += " ";
            $line = 12;
        } else {
            $out += ' <div class="span6 pull-left"> <div class="tip row-fluid">曲高不一定和寡，登录后发现您的专属推荐，还有志同道合的书友们</div> <div class="login pull-left row-fluid"><a href="http://action/showlogin">立即登录</a></div> </div> <div class="span6 pull-left"><img src="public/img/tagCloud.png" alt=""></div> ';
            $line = 18;
        }
    } catch (e) {
        throw {
            id: $id,
            name: "Render Error",
            message: e.message,
            line: $line,
            source: '{{if isLogin === true}}\n  {{each guessBooks}}\n  <div class="wizardBook span3">\n    <a href="/m/book/{{$value.Id}}">\n      <div class="bookCover">\n        <div class="wrapper"><img src="{{$value.ImageUrl}}" alt=""></div>\n      </div>\n      <div class="bookTitle text-center">{{$value.Title}}</div>\n    </a>\n  </div>\n  {{/each}}\n{{else}}\n  <div class="span6 pull-left">\n    <div class="tip row-fluid">曲高不一定和寡，登录后发现您的专属推荐，还有志同道合的书友们</div>\n    <div class="login pull-left row-fluid"><a href="http://action/showlogin">立即登录</a></div>\n  </div>\n  <div class="span6 pull-left"><img src="public/img/tagCloud.png" alt=""></div>\n{{/if}}'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
        };
    }
    return new String($out);
});