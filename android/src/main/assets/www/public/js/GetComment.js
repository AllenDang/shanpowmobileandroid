// Generated by CoffeeScript 1.7.1
var DidFailLikeComment, DidGetCommentDetailData, DidLikeComment, FailGetCommentDetailData;

$(document).on("deviceready", function() {
  var commentId;
  commentId = getQueryString("id");
  RequestAjax("GET", "/mj/comment/" + commentId, {}, DidGetCommentDetailData, FailGetCommentDetailData);
});

DidGetCommentDetailData = function(data, rawData) {
  var articles;
  articles = template("Comment/Detail");
  $(".container").replaceWith(articles(data.Data));
  $(".actionbar .page-title").text("评论");
  CenterTitle();
  $(".ratingStar").raty({
    score: (function() {
      return $(this).data("score");
    }),
    halfShow: false,
    starOff: 'http://shanpowbookcover.qiniudn.com/star-off.png',
    starOn: 'http://shanpowbookcover.qiniudn.com/star-on.png',
    readOnly: true
  });
  $(".thumbsUp").unbind("tap").on("tap", function(event) {
    var authorId, bookId;
    if (window.logined) {
      authorId = $(".user").attr("id");
      data = {
        authorId: authorId
      };
      bookId = $(".container").data("bookid");
      RequestAjax("POST", "/book/" + bookId + "/likecomment", data, DidLikeComment, DidFailLikeComment, null);
    } else {
      alert("请登录后再试");
    }
  });
};

FailGetCommentDetailData = function(data, rawData) {};

DidLikeComment = function(data) {
  var likeSum, likeSumBefore;
  likeSumBefore = parseInt($(".thumbs_up").text());
  likeSum = likeSumBefore + 1;
  $(".thumbs_up").text(likeSum);
};

DidFailLikeComment = function(data) {
  var _ref;
  alert((_ref = data.ErrorMsg) != null ? _ref : "网络发生故障，请稍后重新尝试");
};
