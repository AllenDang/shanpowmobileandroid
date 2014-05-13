/*TMODJS:{"debug":true,"version":5,"md5":"0a72c1730507e7855f7c50a57dd92334"}*/
template("Booklist/Response", function($data, $id) {
    var $helpers = this, $line = 0, $escape = $helpers.$escape, booklistAuthorId = $data.booklistAuthorId, id = $data.id, avatarUrl = $data.avatarUrl, nickname = $data.nickname, $each = $helpers.$each, responses = $data.responses, $value = $data.$value, $index = $data.$index, include = function(id, data) {
        data = data || $data;
        var $text = $helpers.$include(id, data, $id);
        $out += $text;
        return $text;
    }, isLogin = $data.isLogin, $out = "";
    try {
        $out += '<div class="container" data-authorid="';
        $line = 1;
        $out += $escape(booklistAuthorId);
        $out += '" data-id="';
        $line = 1;
        $out += $escape(id);
        $out += '" data-avatar="';
        $line = 1;
        $out += $escape(avatarUrl);
        $out += '" data-nickname="';
        $line = 1;
        $out += $escape(nickname);
        $out += '"> ';
        $line = 2;
        $each(responses, function($value, $index) {
            $out += " ";
            $line = 3;
            include("../public/Response", $value);
            $out += " ";
            $line = 4;
        });
        $out += " </div> ";
        $line = 6;
        if (isLogin === true) {
            $out += ' <div class="postResponse row-fluid"> <div class="replyInput span10"> <input type="text" class="input-block-level" name="q"> <div class="cancelInput hide">x</div> </div> <button class="btn button text-center span2" type="submit" disabled="disabled">回复</button> </div> ';
            $line = 14;
        }
    } catch (e) {
        throw {
            id: $id,
            name: "Render Error",
            message: e.message,
            line: $line,
            source: '<div class="container" data-authorid="{{booklistAuthorId}}" data-id="{{id}}" data-avatar="{{avatarUrl}}" data-nickname="{{nickname}}">\n  {{each responses}}\n  {{include "../public/Response" $value}}\n  {{/each}}\n</div>\n{{if isLogin === true}}\n<div class="postResponse row-fluid">\n  <div class="replyInput span10">\n    <input type="text" class="input-block-level" name="q">\n    <div class="cancelInput hide">x</div>\n  </div>\n  <button class="btn button text-center span2" type="submit" disabled="disabled">回复</button>\n</div>\n{{/if}}'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
        };
    }
    return new String($out);
});