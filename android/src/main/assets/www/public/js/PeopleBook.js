// Generated by CoffeeScript 1.7.1
var DidGetPeopleBookData, DidGetPeopleReadBookData, DidGetPeopleWantBookData, FailGetPeopleBookData, RequestReadBooks, RequestReadingBooks, RequestWantBooks;

$(document).on("deviceready", function() {
  var actionbar, peopleWantBook;
  actionbar = template("public/ActionBar");
  $("body").html(actionbar());
  $(".actionbar .channel").addClass("hide");
  $(".actionbar .slide-menu").addClass("hide");
  $(".actionbar .page-title").text("读书记录和书评");
  $(".actionbar").children(".center").css("left", ($(window).width() - $(".actionbar .center").children(".page-title").width()) / 2);
  window.nickname = unescape(getQueryString("nickname"));
  window.pageNum = 1;
  $(document).on("click", "#readTab", null, function() {
    RequestReadBooks();
  });
  $(document).on("click", "#wantTab", null, function() {
    RequestWantBooks();
  });
  peopleWantBook = template("People/Books");
  $(".spinner").replaceWith(peopleWantBook());
  RequestReadingBooks();
});

RequestReadingBooks = function() {
  RequestAjax("GET", "/mj/people/" + window.nickname + "/book/reading", {}, DidGetPeopleBookData, FailGetPeopleBookData);
};

DidGetPeopleBookData = function(data, rawData) {
  var peopleWantBook;
  peopleWantBook = template("People/BooksReading");
  $("#reading").html(peopleWantBook(data.Data));
  if (data.Data.isMySelf) {
    $("#readTab").text("我读过的");
    $("#wantTab").text("我想读的");
  } else {
    $("#readTab").text("Ta读过的");
    $("#wantTab").text("Ta想读的");
  }
  $(".readingBook").each(function(index) {
    $(this).find(".bookCover").height($(this).find(".bookCover").width() * 4 / 3);
  });
};

FailGetPeopleBookData = function(data, rawData) {};

RequestReadBooks = function() {
  var data;
  data = {
    name: window.nickname,
    pageNum: window.pageNum,
    numPerPage: 10
  };
  RequestAjax("GET", "/mj/people/" + window.nickname + "/book/read", data, DidGetPeopleReadBookData, FailGetPeopleBookData, null, null, null);
};

DidGetPeopleReadBookData = function(data, rawData) {
  var book, htmlToInsert, peopleReadBook, _i, _len, _ref;
  window.pageNum++;
  peopleReadBook = template("People/BooksRead");
  $("#read").html(peopleReadBook(data.Data));
  $(".loadMore").unbind("click").on("click", function(event) {
    RequestReadBooks();
  });
  _ref = data.Data.readBooks;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    book = _ref[_i];
    htmlToInsert = template("public/Book");
    $(".loadMore").before(htmlToInsert(book));
  }
  $(".loadMore").appendTo($(".loadMore").parent());
  if ($(".book.read").length >= parseInt($("#read .sum").data("sum"))) {
    $(".loadMore").addClass("hide");
  }
  $(".ratingStar").raty({
    score: function() {
      return $(this).data("score");
    },
    halfShow: false,
    starOff: 'http://shanpowbookcover.qiniudn.com/star-off-small.png',
    starOn: 'http://shanpowbookcover.qiniudn.com/star-on-small.png',
    hints: window.scoreHints,
    noRatedMsg: window.scoreNoRatedMsg,
    readOnly: true,
    size: 16,
    width: 110
  });
};

RequestWantBooks = function() {
  var data;
  data = {
    name: window.nickname,
    pageNum: window.pageNum,
    numPerPage: 10
  };
  RequestAjax("GET", "/mj/people/" + window.nickname + "/book/want", data, DidGetPeopleWantBookData, FailGetPeopleBookData, null, null, null);
};

DidGetPeopleWantBookData = function(data, rawData) {
  var peopleReadBook;
  window.pageNum++;
  peopleReadBook = template("People/BooksWant");
  $("#wanttoread").html(peopleReadBook(data.Data));
};
