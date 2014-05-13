/*TMODJS:{"debug":true,"version":1,"md5":"12fb50957754f75fe02bfb21287ee8f5"}*/
template("public/Response", function($data, $id) {
    var $helpers = this, $line = 0, $escape = $helpers.$escape, Id = $data.Id, Author = $data.Author, Content = $data.Content, CreationTime = $data.CreationTime, $out = "";
    try {
        $out += '<div class="response row-fluid" id="';
        $line = 1;
        $out += $escape(Id);
        $out += '"> <div class="avatar pull-left span2"> <a href="../People/Detail.html?nickname=';
        $line = 3;
        $out += $escape(Author.Nickname);
        $out += '"><img src="';
        $line = 3;
        $out += $escape(Author.AvatarUrl);
        $out += '" alt="" class="img-circle"></a> </div> <div class="responseContent pull-left span10"> <div class="author row-fluid"> <a href="../People/Detail.html?nickname=';
        $line = 7;
        $out += $escape(Author.Nickname);
        $out += '" class="pull-left"><strong>';
        $line = 7;
        $out += $escape(Author.Nickname);
        $out += '</strong></a>说： <a href="#" class="responseBtn pull-right">回复</a> </div> <div class="mega row-fluid"> <div class="responseText">';
        $line = 11;
        $out += $escape(Content);
        $out += '</div> <div class="timestamp pull-right">';
        $line = 12;
        $out += $escape(CreationTime);
        $out += "前</div> </div> </div> </div>";
    } catch (e) {
        throw {
            id: $id,
            name: "Render Error",
            message: e.message,
            line: $line,
            source: '<div class="response row-fluid" id="{{Id}}">\n  <div class="avatar pull-left span2">\n    <a href="../People/Detail.html?nickname={{Author.Nickname}}"><img src="{{Author.AvatarUrl}}" alt="" class="img-circle"></a>\n  </div>\n  <div class="responseContent pull-left span10">\n    <div class="author row-fluid">\n      <a href="../People/Detail.html?nickname={{Author.Nickname}}" class="pull-left"><strong>{{Author.Nickname}}</strong></a>说：\n      <a href="#" class="responseBtn pull-right">回复</a>\n    </div>\n    <div class="mega row-fluid">\n      <div class="responseText">{{Content}}</div>\n      <div class="timestamp pull-right">{{CreationTime}}前</div>\n    </div>\n  </div>\n</div>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
        };
    }
    return new String($out);
});