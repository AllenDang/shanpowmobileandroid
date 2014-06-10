// Generated by CoffeeScript 1.7.1
var DidGetReviews, FailGetReviews, LoadReview;

LoadReview = function() {
  var data, _ref;
  data = {
    pageNum: window.pageNum,
    numPerPage: 10,
    ch: (_ref = getQueryString("ch")) != null ? _ref : "m"
  };
  RequestAjax("GET", "/mj/review/morerecommendedreviews", data, DidGetReviews, FailGetReviews);
};

$(document).on("deviceready", function() {
  window.pageNum = 1;
  $(".loadMore").removeClass("hide");
  LoadReview();
});

DidGetReviews = function(data, rawData) {
  var review, reviews, singleReview, _i, _len, _ref;
  reviews = template("Review/All");
  $(".spinner").replaceWith(reviews(data));
  _ref = data.Data;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    review = _ref[_i];
    singleReview = template("public/Review");
    $(".loadMore").before(singleReview(review));
  }
  $(".loadMore").appendTo($(".container"));
  $(".loadMore").removeClass("hide");
  $(".actionbar .page-title").text("所有评论");
  $(".actionbar").children(".center").css("left", ($(window).width() - $(".actionbar .center").children(".page-title").width()) / 2);
  $(".ratingStar").raty({
    score: function() {
      return $(this).data("score");
    },
    halfShow: false,
    starOff: 'http://shanpowbookcover.qiniudn.com/star-off-small.png',
    starOn: 'http://shanpowbookcover.qiniudn.com/star-on-small.png',
    readOnly: true,
    size: 10
  });
  window.pageNum++;
  $(".loadMore").unbind("click").on("click", function(event) {
    if (!$(event.target).hasClass("loadMore")) {
      return;
    }
    LoadReview();
    event.stopPropagation();
    event.preventDefault();
  });
};

FailGetReviews = function(data, rawData) {
  alert("获取更多书评出错，请重试");
};
