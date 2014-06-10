// Generated by CoffeeScript 1.7.1
var DidFailLikeReview, DidGetReviewDetailData, DidLikeReview, FailGetReviewDetailData, PostReviewAjaxRequest;

$(document).on("deviceready", function() {
  var reviewId;
  reviewId = getQueryString("id");
  RequestAjax("GET", "/mj/review/" + reviewId, {}, DidGetReviewDetailData, FailGetReviewDetailData);
});

DidGetReviewDetailData = function(data, rawData) {
  var articles;
  articles = template("Review/Detail");
  $(".spinner").replaceWith(articles(data.Data));
  $(".actionbar .page-title").text("评论");
  $(".actionbar").children(".center").css("left", ($(window).width() - $(".actionbar .center").children(".page-title").width()) / 2);
  $(".ratingStar").raty({
    score: (function() {
      return $(this).data("score");
    }),
    halfShow: false,
    starOff: 'http://shanpowbookcover.qiniudn.com/star-off.png',
    starOn: 'http://shanpowbookcover.qiniudn.com/star-on.png',
    readOnly: true,
    size: 16
  });
  $(".thumbsUp").unbind("click").on("click", function(event) {
    var bookId, reviewId;
    if (window.logined) {
      reviewId = $(".container").data("reviewid");
      bookId = $(".container").data("bookid");
      PostReviewAjaxRequest(reviewId, "like", "POST", {
        bookId: bookId
      }, DidLikeReview, DidFailLikeReview);
      return;
    } else {
      alert("请登录后再试");
    }
  });
};

FailGetReviewDetailData = function(data, rawData) {};

DidLikeReview = function(data) {
  var likeSum, likeSumBefore;
  likeSumBefore = parseInt($(".thumbs_up").text());
  likeSum = likeSumBefore + 1;
  $(".thumbs_up").text(likeSum);
};

DidFailLikeReview = function(data) {
  var _ref;
  alert((_ref = data.ErrorMsg) != null ? _ref : "网络发生故障，请稍后重新尝试");
};

PostReviewAjaxRequest = function(reviewId, command, type, data, successCallback, failCallback) {
  RequestAjax(type, "/review/" + reviewId + "/" + command, data, successCallback, failCallback, null);
};
