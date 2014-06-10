$(document).on "deviceready", ()->  
  articleId = getQueryString "id"
  RequestAjax "GET", "/mj/article/#{articleId}/response", {}, DidGetResponseData, FailGetResponseData
  return

DidGetResponseData = (data, rawData)->
  articleResponseMain = template "public/Responses"
  $(".spinner").replaceWith articleResponseMain data.Data
  
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
        id: TimeStamp(),
        content: $("#replyInput").val() ? "",
        authorId: $(".container").data("authorid")
      }
      PostResponse data
      
    return

  RegisterResponseBtn()
  return

FailGetResponseData = (data, rawData)->
  return

PostResponse = (data)->
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

  articleId = getQueryString "id"
  RequestAjax "POST", "/article/#{articleId}/addresponse", data, DidPostResponse, DidFailPostResponse, null, null, null, null, false
  return

DidPostResponse = (data, rawData)->
  $("#replyInput").val("").blur().focus()
  $("#submit").prop("disabled", true)
  $("##{rawData.Data.id}").find(".status").removeClass().addClass("status pull-right glyphicons circle_ok")
  $("##{rawData.Data.id}").find(".status").animate {opacity: 0}, 1000, (()->
    $(this).css "opacity", 1
    $(this).addClass("hide")
    $("##{rawData.Data.id}").find(".timestamp").removeClass("hide")
    )
  return

DidFailPostResponse = (data, rawData)->
  $("#submit").prop("disabled", false)
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
