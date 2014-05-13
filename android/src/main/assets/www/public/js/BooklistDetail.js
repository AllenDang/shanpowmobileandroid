// Generated by CoffeeScript 1.7.1
var DidGetBooklistDetailData, FailGetBooklistDetailData, HideMoreCategories;

$(document).ready(function() {
  var actionbar, booklistId;
  actionbar = template("public/ActionBar");
  $("body").html(actionbar());
  $(".actionbar .channel").addClass("hide");
  $(".actionbar .slide-menu").addClass("hide");
  booklistId = getQueryString("id");
  RequestAjax("GET", "/mj/booklist/" + booklistId, {}, DidGetBooklistDetailData, FailGetBooklistDetailData);
});

DidGetBooklistDetailData = function(data, rawData) {
  var bookDetail;
  bookDetail = template("Booklist/Detail");
  $(".spinner").replaceWith(bookDetail(data.Data));
  if ($(".cat").length <= 9) {
    $(".cat.more").addClass("hide");
  }
  $(".actionbar .page-title").text(data.Data.Title);
  $(".actionbar").children(".center").css("left", ($(window).width() - $(".actionbar .center").children(".page-title").width()) / 2);
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
    size: 10,
    width: 70
  });
  $(".cat").each(function(index) {
    $(this).unbind("tap").on("tap", function(event) {
      var cat;
      if ($(this).hasClass("active")) {
        return;
      }
      if ($(this).hasClass("more")) {
        return;
      }
      $(".cat.active").removeClass("active");
      $(this).addClass("active");
      cat = $(this).data("cat");
      if (cat === "all") {
        $(".book").show().attr("shown", "true");
      } else {
        $(".book").each(function() {
          if ($(this).data("cat") === cat) {
            $(this).show().attr("shown", "true");
          } else {
            $(this).hide().attr("shown", "false");
          }
        });
      }
    });
  });
  $(".cat.more.span3").unbind("click").on("click", function(event) {
    if ($(".cat.span3.hide").length <= 0) {
      HideMoreCategories();
      $(this).children("span").removeClass().addClass("halflings chevron-down");
    } else {
      $(".cat").removeClass("hide");
      $(this).children("span").removeClass().addClass("halflings chevron-up");
    }
  });
  $(".mega table td").each(function(index) {
    $(this).children("div").css({
      "left": ($(this).width() - $(this).children("div").width()) / 2
    });
  });
  HideMoreCategories();
};

FailGetBooklistDetailData = function(data, rawData) {};

HideMoreCategories = function() {
  $(".cat").each(function(index) {
    if (index > 6 && $(".cat.span3").length > 9) {
      $(this).addClass("hide");
      $(".cat.more.span3").removeClass("hide");
    }
  });
};
