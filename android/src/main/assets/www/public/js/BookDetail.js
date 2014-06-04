// Generated by CoffeeScript 1.7.1
var DidGetBookDetailData, DidMarkWantToRead, FailGetBookDetailData;

$(document).on("deviceready", function() {
  var actionbar, bookId;
  actionbar = template("public/ActionBar");
  $("body").html(actionbar());
  $(".actionbar .channel").addClass("hide");
  $(".actionbar .slide-menu").addClass("hide");
  bookId = getQueryString("id");
  RequestAjax("GET", "/mj/book/" + bookId, {}, DidGetBookDetailData, FailGetBookDetailData);
});

DidGetBookDetailData = function(data, rawData) {
  var bookDetail;
  bookDetail = template("Book/Detail");
  $(".spinner").replaceWith(bookDetail(data.Data));
  $(".actionbar .page-title").text(data.Data.Book.Title);
  $(".actionbar").children(".center").css("left", ($(window).width() - $(".actionbar .center").children(".page-title").width()) / 2);
  if ($(".summaryContent").height() <= 80) {
    $(".expand").hide();
  } else {
    window.fullSummary = $(".summaryContent").text();
    $(".summaryContent").text($(".summaryContent").text().substr(0, 80) + "...");
  }
  $(".expand").parent().unbind("click").on("click", function(event) {
    if ($(this).find(".expand").hasClass("expanded")) {
      $(this).find(".expand").removeClass("expanded");
      $(".summaryContent").text($(".summaryContent").text().substr(0, 80) + "...");
    } else {
      $(this).find(".expand").addClass("expanded");
      $(".summaryContent").text(window.fullSummary);
    }
  });
  $(".statusAction[data-statuscode='wanttoread']").unbind("tap").on("tap", function(event) {
    var bookId;
    if ($(this).hasClass("inactive")) {
      return;
    }
    bookId = $(".container").attr("id");
    data = {
      markType: "wanttoread",
      score: 0,
      content: "",
      isShareToQQ: false,
      isShareToWeibo: false
    };
    return RequestAjax("POST", "/book/" + bookId + "/mark", data, DidMarkWantToRead, null);
  });
  $(".ratingStar").raty({
    score: function() {
      return $(this).data("score") / 2;
    },
    halfShow: false,
    starOff: '../public/img/Star_Big_Off_Green.png',
    starOn: '../public/img/Star_Big_On_Green.png',
    hints: window.scoreHints,
    noRatedMsg: window.scoreNoRatedMsg,
    readOnly: true,
    size: 10,
    width: false
  });
  $(".cmtScore").raty({
    score: function() {
      return $(this).data("score");
    },
    halfShow: false,
    starOff: '../public/img/Star_Small_Off_White.png',
    starOn: '../public/img/Star_Small_On_White.png',
    hints: window.scoreHints,
    noRatedMsg: window.scoreNoRatedMsg,
    readOnly: true,
    size: 10,
    width: 70
  });
  $(".reviewScore").raty({
    score: function() {
      return $(this).data("score");
    },
    halfShow: false,
    starOff: '../public/img/Star_Small_Off_White.png',
    starOn: '../public/img/Star_Small_On_White.png',
    hints: window.scoreHints,
    noRatedMsg: window.scoreNoRatedMsg,
    readOnly: true,
    size: 10,
    width: 70
  });
};

FailGetBookDetailData = function(data, rawData) {};

DidMarkWantToRead = function(data, rawData) {
  location.reload();
};
