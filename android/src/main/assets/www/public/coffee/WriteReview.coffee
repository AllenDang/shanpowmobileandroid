$(document).on "deviceready", ()->
  $(".spinner").remove()
  $(".actionbar .write").removeClass "hide"
  $(".actionbar .write .left").removeClass "active"
  $(".actionbar .write .right").addClass "active"
  $(".actionbar .page-title").text "写书评"
  CenterTitle()

  window.status = getQueryString "status"
  window.bookid = getQueryString "bookid"
  window.category = unescape(getQueryString("category"))
  window.bookcover = getQueryString "bookcover"
  window.isforman = getQueryString "isforman"
  window.booktitle = unescape(getQueryString("booktitle"))

  $("textarea").height $(window).height() - $("input").height() - $(".actionbar").height() - 128

  $(".button.post").unbind("tap").on "tap", (event)->
    return if $(this).attr("disabled")
    SaveReadingStatus window.status, event
    return

  RequestAjax "GET", "/mj/review/write/#{window.bookid}", {}, DidGetComment, null, null

  $(document).on "click tap", ".actionbar .back", null, ((event)->
    event.preventDefault()
    GetBack())

  $(document).on "backbutton", (event)->
    event.preventDefault()
    GetBack()
    return

  $(".button.cancel").unbind("click").on "click", (event)->
    GetBack()
    return
  return

DidGetComment = (data, rawData)->
  $("input.title").val data.Data.Title
  $("textarea").val data.Data.Content
  $(".ratingStar").data "score", data.Data.Score
  $(".ratingStar").raty {
    score: -> return $(this).data("score"),
    halfShow: false,
    starOff: '../public/img/Star_Big_Off_Green.png',
    starOn: '../public/img/Star_Big_On_Green.png',
    size: 16,
    click: ((score, evt)->
        $(this).data "score", score
        return)
  }
  return

SaveReadingStatus = (statusCode, event)->
  $(event?.target).text "正在发送..."
  $(event?.target).attr "disabled", true

  if $("input.title").val() is "" or $("input.title").val().length <= 0
    WriteComment statusCode
  else
    WriteReview statusCode
  
  return

WriteComment = (statusCode)->
  data = {
    markType: statusCode,
    score: parseInt($(".ratingStar").data("score") ? 0),
    content: $("textarea").val() ? ""
  }
  PostMarkAjaxRequest "mark", "POST", data, DidSaveReadingStatus, DidFailSaveReadingStatus
  return

WriteReview = (statusCode)->
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
  navigator.notification.alert "评论已经发布成功！", (->GetBack()), "成功", "好的"
  return

DidFailSaveReadingStatus = (data, rawData)->
  EnableButton()
  navigator.notification.alert data.ErrorMsg, null, "失败", "好的"
  return

PostMarkAjaxRequest = (command, type, data, successCallback, failCallback)->
  data.isShareToQQ = false
  data.isShareToWeibo = false
  RequestAjax type, "/book/#{window.bookid}/#{command}", data, successCallback, failCallback, null
  return

EnableButton = ()->
  $(".button.post").text "发送"
  $(".button.post").attr "disabled", false
  return
