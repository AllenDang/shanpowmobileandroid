$(document).on "deviceready", ()->
  actionbar = template "public/ActionBar"
  $(".container").before actionbar()
  $(".spinner").remove()
  $(".actionbar .channel").addClass "hide"
  $(".actionbar .slide-menu").addClass "hide"
  $(".actionbar .write").removeClass "hide"
  $(".actionbar .page-title").text ""
  $(".actionbar").children(".center").css("left", ($(window).width() - $(".actionbar .center").children(".page-title").width()) / 2)

  window.status = getQueryString "status"
  window.bookid = getQueryString "bookid"

  $("textarea").height $(window).height() - 260

  $(".button.post").unbind("tap").on "tap", (event)->
    return if $(this).attr("disabled")
    SaveReadingStatus window.status, event
    return

  $(".button.cancel").unbind("click").on "click", (event)->
    window.history.back()
    return

  $(".actionbar .write").unbind("click").on "click", (event)->
    shortLocation = location.href
    location.href = shortLocation.replace "Comment", "Review"
    return

  RequestAjax "GET", "/mj/comment/write/#{window.bookid}", {}, DidGetComment, null, null
  return

DidGetComment = (data, rawData)->
  $("textarea").val data.Data.content
  $(".ratingStar").data "score", data.Data.score
  $(".ratingStar").raty {
    score: data.Data.score,
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
    markType: statusCode,
    score: parseInt($(".ratingStar").data("score") ? 0),
    content: $("textarea").val() ? ""
  }
  PostMarkAjaxRequest "mark", "POST", data, (()->
    DidSaveReadingStatus(statusCode)
    return), (()->
      DidFailSaveReadingStatus()
      return)
  return

DidSaveReadingStatus = (data, rawData)->
  $(".button.post").text "发布"
  $(".button.post").attr "disabled", false
  navigator.notification.alert "评论已经发布成功！", (->window.history.back()), "", "好的"
  return

DidFailSaveReadingStatus = (data, rawData)->
  return

PostMarkAjaxRequest = (command, type, data, successCallback, failCallback)->
  data.isShareToQQ = false
  data.isShareToWeibo = false
  RequestAjax type, "/book/#{window.bookid}/#{command}", data, DidSaveReadingStatus, DidFailSaveReadingStatus, null
  return

