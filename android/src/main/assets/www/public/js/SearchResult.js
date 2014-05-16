// Generated by CoffeeScript 1.7.1
var DidGetSearchResultData, FailGetSearchResultData;

$(document).on("deviceready", function() {
  var actionbar;
  actionbar = template("public/ActionBar");
  $("body").html(actionbar());
  $(".actionbar .channel").addClass("hide");
  $(".actionbar .slide-menu").addClass("hide");
  window.query = unescape(getQueryString("q"));
  RequestAjax("GET", "/mj/search/result", {
    q: window.query
  }, DidGetSearchResultData, FailGetSearchResultData);
});

DidGetSearchResultData = function(data, rawData) {
  var sr;
  sr = template("Search/Result");
  $(".spinner").replaceWith(sr(data.Data));
  $(".actionbar .page-title").text("" + window.query + "的搜索结果");
  $(".actionbar").children(".center").css("left", ($(window).width() - $(".actionbar .center").children(".page-title").width()) / 2);
  $(".ratingStar").raty({
    score: function() {
      return $(this).data("score") / 2;
    },
    halfShow: false,
    starOff: 'http://shanpowbookcover.qiniudn.com/star-off-small.png',
    starOn: 'http://shanpowbookcover.qiniudn.com/star-on-small.png',
    hints: window.scoreHints,
    noRatedMsg: window.scoreNoRatedMsg,
    readOnly: true,
    size: 14
  });
  $(".rankingImage").each(function() {
    $(this).height($(this).width());
  });
  $(".booklist").each(function() {
    $(this).width(($(window).width() - 48) / 2);
    $(this).find(".bookCover").each(function() {
      $(this).height(parseInt($(".booklist .bookCover:first-child").width() * 4 / 3));
    });
  });
  $(".bls").masonry({
    gutter: 16,
    itemSelector: ".booklist"
  });
  $(".userAvatar").each(function() {
    $(this).height($(this).width());
  });
};

FailGetSearchResultData = function(data, rawData) {};
