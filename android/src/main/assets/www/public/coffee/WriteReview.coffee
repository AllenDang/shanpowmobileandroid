$(document).on "deviceready", ()->
  actionbar = template "public/ActionBar"
  $(".container").before actionbar()
  $(".spinner").remove()
  $(".actionbar .channel").addClass "hide"
  $(".actionbar .slide-menu").addClass "hide"
  $(".actionbar .write").removeClass "hide"
  $(".actionbar .write .left").removeClass "active"
  $(".actionbar .write .right").addClass "active"
  $(".actionbar .page-title").text ""
  $(".actionbar").children(".center").css("left", ($(window).width() - $(".actionbar .center").children(".page-title").width()) / 2)

  window.status = getQueryString "status"
  window.bookid = getQueryString "bookid"
  window.category = unescape(getQueryString("category"))
  window.bookcover = getQueryString "bookcover"
  window.isforman = getQueryString "isforman"
  window.booktitle = unescape(getQueryString("booktitle"))

  $("textarea").height $(window).height() - 310

  $(".button.post").unbind("tap").on "tap", (event)->
    return if $(this).attr("disabled")
    if $("input.title").val() is "" or $("input.title").val().length <= 0
      navigator.notification.alert "请输入评论标题", null
    else
      SaveReadingStatus window.status, event
    return

  $(".actionbar .write").unbind("click").on "click", (event)->
    longLocation = location.href
    location.href = longLocation.replace "Review", "Comment"
    return

  RequestAjax "GET", "/mj/review/write/#{window.bookid}", {}, DidGetComment, null, null

  $(document).on "click tap", ".actionbar .back", null, ((event)->
    event.preventDefault()
    window.history.go(-2))

  $(document).on "backbutton", (event)->
    event.preventDefault()
    window.history.go(-2)
    return

  $(".button.cancel").unbind("click").on "click", (event)->
    window.history.go(-2)
    return
  return

DidGetComment = (data, rawData)->
  $("input.title").val data.Data.Title
  $("textarea").val data.Data.Content
  $(".ratingStar").data "score", data.Data.Score
  $(".ratingStar").raty {
    score: -> return $(this).data("score"),
    halfShow: false,
    starOff: 'http://shanpowbookcover.qiniudn.com/star-off.png',
    starOn: 'http://shanpowbookcover.qiniudn.com/star-on.png',
    size: 16,
    click: ((score, evt)->
        $(this).data "score", score
        return)
  }
  return

SaveReadingStatus = (statusCode, event)->
  $(event?.target).text "正在发布..."
  $(event?.target).attr "disabled", true
  data = {
    reviewTitle: $("input.title").val() ? "",
    reviewContent: $("textarea").val() ? "",
    bookTitle: window.booktitle,
    score: parseInt($(".ratingStar").data("score") ? 0),
    markType: statusCode,
    bookImageUrl: window.bookcover,
    bookCategory: window.category,
    bookForMan: window.isforman,
    isShareToQQ: false,
    isShareToWeibo: false
  }
  RequestAjax "POST", "/book/#{window.bookid}/addreview", data, DidSaveReadingStatus, DidFailSaveReadingStatus, null
  return

DidSaveReadingStatus = (data, rawData)->
  EnableButton()
  navigator.notification.alert "评论已经发布成功！", (->window.history.go(-2)), "", "好的"
  return

DidFailSaveReadingStatus = (data, rawData)->
  EnableButton()
  return

EnableButton = ()->
  $(".button.post").text "发布"
  $(".button.post").attr "disabled", false
  return
