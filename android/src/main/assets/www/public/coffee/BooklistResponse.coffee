$(document).ready ()->
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

  $("input").unbind("keyup").on "keyup", (event)->
    if $("input").val()?.length > 0
      $(".button").prop "disabled", false
      $(".cancelInput").removeClass "hide"
    else
      $(".button").prop "disabled", true
      $(".cancelInput").addClass "hide"
    return

  $(".cancelInput").unbind("click").on "click", (event)->
    $("input").val ""
    $(this).addClass("hide")
    return

  $("button.submit").unbind("click").on "click", (event)->
    event.preventDefault()
    event.stopPropagation()
    if $(".sendResponseContent").val()?.length <= 0
      alert "请输入回复内容"
    else
      $(this).prop "disabled", true
      window.responseContent = $("input").val()
      data = {
        content: $("input").val() ? "",
        authorId: $(".container").data("authorid")
      }
      RequestAjax "POST", "/booklist/#{$(".container").data('id')}/addresponse", data, DidPostResponse, DidFailPostResponse, DidFailPostResponse
    return

  RegisterResponseBtn()
  return

FailGetBooklistResponseData = (data, rawData)->
  return

DidPostResponse = (data)->
  $("button").prop("disabled", false)
  $("input").val ""
  $(".cancelInput").addClass("hide")
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
      content = $("input").val()
      if IsUsernameMentioned(content, username) < 0
        $("input").val("@#{username} #{content}")
      $("input").focus().MoveToEnd()
      return
    return
  return