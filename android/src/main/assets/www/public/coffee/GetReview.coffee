$(document).ready ()->
  actionbar = template "public/ActionBar"
  $("body").html actionbar()
  $(".actionbar .channel").addClass "hide"
  $(".actionbar .slide-menu").addClass "hide"

  reviewId = getQueryString "id"
  RequestAjax "GET", "/mj/review/#{reviewId}", {}, DidGetReviewDetailData, FailGetReviewDetailData
  return

DidGetReviewDetailData = (data, rawData)->
  articles = template "Review/Detail"
  $(".spinner").replaceWith articles(data.Data)

  $(".actionbar .page-title").text "评论"
  $(".actionbar").children(".center").css("left", ($(window).width() - $(".actionbar .center").children(".page-title").width()) / 2)

  $(".ratingStar").raty {
    score: (()->$(this).data("score")),
    halfShow: false,
    starOff: 'http://shanpowbookcover.qiniudn.com/star-off.png',
    starOn: 'http://shanpowbookcover.qiniudn.com/star-on.png',
    readOnly: true,
    size: 16
  }

  $(".thumbsUp").unbind("click").on "click", (event)->
    if window.logined
      reviewId = $(".container").data "reviewid"
      bookId = $(".container").data "bookid"
      PostReviewAjaxRequest reviewId, "like", "POST", {bookId: bookId}, DidLikeReview, DidFailLikeReview
      return
    else
      alert "请登录后再试"
    return
  return

FailGetReviewDetailData = (data, rawData)->
  return

DidLikeReview = (data)->
  likeSumBefore = parseInt $(".thumbs_up").text()
  likeSum = likeSumBefore + 1
  $(".thumbs_up").text likeSum
  return

DidFailLikeReview = (data)->
  alert data.ErrorMsg ? "网络发生故障，请稍后重新尝试"
  return

PostReviewAjaxRequest = (reviewId, command, type, data, successCallback, failCallback)->
  RequestAjax type, "/review/#{reviewId}/#{command}", data, successCallback, failCallback, null
  return
