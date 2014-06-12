$(document).on "deviceready", ()->
  window.reviewId = getQueryString "id"
  RequestAjax "GET", "/mj/review/#{window.reviewId}/response", {}, DidGetResponseData, FailGetResponseData
  return

DidGetResponseData = (data, rawData)->
  articleResponseMain = template "public/Responses"
  $(".container").replaceWith articleResponseMain data.Data
  
  $(".actionbar .page-title").text "回复"
  CenterTitle()

  $("#submit").unbind("click").on "click", (event)->
    event.preventDefault()
    event.stopPropagation()
    if $(".sendResponseContent").val()?.length <= 0
      alert "请输入回复内容"
    else
      $(this).prop "disabled", true
      window.responseContent = $("#replyInput").val()
      data = {
        id: TimeStamp(),
        bookId: $(".container").data("bookid"),
        reviewId: window.reviewId,
        content: window.responseContent
      }
      PostResponse data
    return

  RegisterResponseBtn()
  return

FailGetResponseData = (data, rawData)->
  return

PostResponse = (data)->
  $("#replyInput").val("").blur().focus()
  nickname = $(".container").data "nickname"
  
  responseData = {
    Id: data.id,
    Author: {
      Nickname: nickname,
      AvatarUrl: $(".container").data("avatar")
    },
    Content: window.responseContent,
    CreationTime: "1秒"
  }

  response = template "public/Response"
  $(".container").append response(responseData)

  window.scrollTo(0, document.body.scrollHeight);

  RegisterResponseBtn()

  $("##{data.id}").find(".timestamp").addClass("hide")
  $("##{data.id}").find(".status").removeClass("hide")

  PostReviewAjaxRequest window.reviewId, "response", "POST", data, DidPostResponse, DidFailPostResponse, false
  return

PostReviewAjaxRequest = (reviewId, command, type, data, successCallBack, failCallBack)->
  RequestAjax type, "/review/#{reviewId}/#{command}", data, successCallBack, failCallBack, (()->
    $("button").prop("disabled", false)
    return)
  return

DidPostResponse = (data, rawData)->
  $("button").prop("disabled", true)
  $("##{rawData.Data.id}").find(".status").removeClass().addClass("status pull-right glyphicons circle_ok")
  $("##{rawData.Data.id}").find(".status").animate {opacity: 0}, 1000, (()->
    $(this).css "opacity", 1
    $(this).addClass("hide")
    $("##{rawData.Data.id}").find(".timestamp").removeClass("hide")
    )
  return

DidFailPostResponse = (data, rawData)->
  $("button").prop("disabled", false)
  $("##{rawData.Data.id}").find(".status").removeClass().addClass("status pull-right glyphicons circle_exclamation_mark")
  $("##{rawData.Data.id}").find(".status").unbind("click").on "click", (event)->
    $("##{rawData.Data.id}").remove()
    PostResponse rawData.Data
    return
  return

RegisterResponseBtn = ()->
  $("a.responseBtn").each (index)->
    $(this).unbind("click").click (event)->
      event.preventDefault()
      event.stopPropagation()
      username = $(this).closest(".responseItem").find(".name a").first().text()
      content = $("#replyInput").val()
      if IsUsernameMentioned(content, username) < 0
        $("#replyInput").val("@#{username} #{content}")
      $("#replyInput").focus().MoveToEnd()
      return
    return
  return
