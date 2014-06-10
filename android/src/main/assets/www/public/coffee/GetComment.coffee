$(document).on "deviceready", ()->  
  commentId = getQueryString "id"
  RequestAjax "GET", "/mj/comment/#{commentId}", {}, DidGetCommentDetailData, FailGetCommentDetailData
  return

DidGetCommentDetailData = (data, rawData)->
  articles = template "Comment/Detail"
  $(".spinner").replaceWith articles(data.Data)

  $(".actionbar .page-title").text "评论"
  $(".actionbar").children(".center").css("left", ($(window).width() - $(".actionbar .center").children(".page-title").width()) / 2)

  $(".ratingStar").raty {
    score: (()->$(this).data("score")),
    halfShow: false,
    starOff: 'http://shanpowbookcover.qiniudn.com/star-off.png',
    starOn: 'http://shanpowbookcover.qiniudn.com/star-on.png',
    readOnly: true
  }

  $(".thumbsUp").unbind("tap").on "tap", (event)->
    if window.logined
      authorId = $(".user").attr "id"
      data = {
        authorId: authorId
      }
      bookId = $(".container").data "bookid"
      RequestAjax "POST", "/book/#{bookId}/likecomment", data, DidLikeComment, DidFailLikeComment, null
    else
      alert "请登录后再试"
    return

  return

FailGetCommentDetailData = (data, rawData)->
  return

DidLikeComment = (data)->
  likeSumBefore = parseInt $(".thumbs_up").text()
  likeSum = likeSumBefore + 1
  $(".thumbs_up").text likeSum
  return

DidFailLikeComment = (data)->
  alert data.ErrorMsg ? "网络发生故障，请稍后重新尝试"
  return
