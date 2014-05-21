$(document).on "deviceready", ()->
  actionbar = template "public/ActionBar"
  $("body").html actionbar()
  $(".actionbar .channel").addClass "hide"
  $(".actionbar .slide-menu").addClass "hide"

  booklistId = getQueryString "booklistid"
  RequestAjax "GET", "/mj/booklist/#{booklistId}/response", {}, DidGetBooklistResponseData, FailGetBooklistResponseData
  return

DidGetBooklistResponseData = (data, rawData)->
  booklistResponse = template "public/Responses"
  $(".spinner").replaceWith booklistResponse data.Data
  
  $(".actionbar .page-title").text "回复"
  $(".actionbar").children(".center").css("left", ($(window).width() - $(".actionbar .center").children(".page-title").width()) / 2)

  $("#submit").unbind("click").on "click", (event)->
    event.preventDefault()
    event.stopPropagation()
    if $(".sendResponseContent").val()?.length <= 0
      alert "请输入回复内容"
    else
      $(this).prop "disabled", true
      window.responseContent = $("#replyInput").val()
      data = {
        content: $("#replyInput").val() ? "",
        authorId: $(".container").data("authorid")
      }
      RequestAjax "POST", "/booklist/#{$(".container").data('id')}/addresponse", data, DidPostResponse, DidFailPostResponse, DidFailPostResponse
    return

  RegisterResponseBtn()
  return

FailGetBooklistResponseData = (data, rawData)->
  return

DidPostResponse = (data)->
  $("#replyInput").val("").blur().focus()
  $("button").prop("disabled", true)
  nickname = $(".container").data "nickname"
  
  responseData = {
    Id: "",
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
  return

DidFailPostResponse = (data)->
  $("button").prop("disabled", false)
  alert data.ErrorMsg
  return

RegisterResponseBtn = ()->
  $("a.responseBtn").each (index)->
    $(this).unbind("click").click (event)->
      event.preventDefault()
      event.stopPropagation()
      username = $(this).closest(".response").find(".author a strong").text()
      content = $("#replyInput").val()
      if IsUsernameMentioned(content, username) < 0
        $("#replyInput").val("@#{username} #{content}")
      $("#replyInput").focus().MoveToEnd()
      return
    return
  return