/*TMODJS:{"debug":true,"version":2,"md5":"ece91f1cc0a749ee569d41ebb53871d9"}*/
template("public/BookWithComment", function($data, $id) {
    var $helpers = this, $line = 0, $escape = $helpers.$escape, Id = $data.Id, ImageUrl = $data.ImageUrl, Title = $data.Title, Author = $data.Author, $string = $helpers.$string, $substring = $helpers.$substring, Summary = $data.Summary, Comment = $data.Comment, $out = "";
    try {
        $out += '<li class="book row-fluid" id="';
        $line = 1;
        $out += $escape(Id);
        $out += '"> <a href="../Book/Detail.html?id=';
        $line = 2;
        $out += $escape(Id);
        $out += '"></a> <div class="megaInfo row-fluid"> <div class="bookCover span3"> <img src="';
        $line = 5;
        $out += $escape(ImageUrl);
        $out += '" alt=""> </div> <div class="bookMega span9"> <div class="row-fluid"> <div class="pull-left">';
        $line = 9;
        $out += $escape(Title);
        $out += '</div> <div class="pull-left author">';
        $line = 10;
        $out += $escape(Author);
        $out += '</div> </div> <div class="row-fluid">';
        $line = 12;
        $out += $string($substring(Summary, 0, 50));
        $out += "</div> </div> </div> ";
        $line = 15;
        if (Comment) {
            $out += ' <div class="comment row-fluid"> <div class="span3 text-right">看点</div> <div class="span9">';
            $line = 18;
            $out += $escape(Comment);
            $out += "</div> </div> ";
            $line = 20;
        }
        $out += " </li>";
    } catch (e) {
        throw {
            id: $id,
            name: "Render Error",
            message: e.message,
            line: $line,
            source: '<li class="book row-fluid" id="{{Id}}">\n  <a href="../Book/Detail.html?id={{Id}}"></a>\n  <div class="megaInfo row-fluid">\n    <div class="bookCover span3">\n      <img src="{{ImageUrl}}" alt="">\n    </div>\n    <div class="bookMega span9">\n      <div class="row-fluid">\n        <div class="pull-left">{{Title}}</div>\n        <div class="pull-left author">{{Author}}</div>\n      </div>\n      <div class="row-fluid">{{$substring Summary 0 50}}</div>\n    </div>\n  </div>\n  {{if Comment}}\n  <div class="comment row-fluid">\n    <div class="span3 text-right">看点</div>\n    <div class="span9">{{Comment}}</div>\n  </div>\n  {{/if}}\n</li>'.split(/\n/)[$line - 1].replace(/^[\s\t]+/, "")
        };
    }
    return new String($out);
});