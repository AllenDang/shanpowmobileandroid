$(document).on "deviceready", ()->
  actionbar = template "public/ActionBar"
  $("body").html actionbar()
  $(".actionbar .channel").addClass "hide"
  $(".actionbar .slide-menu").addClass "hide"

  window.nickname = getQueryString "nickname"
  RequestAjax "GET", "/mj/people/#{unescape(window.nickname)}", {}, DidGetPeopleDetailData, FailGetPeopleDetailData
  return

DidGetPeopleDetailData = (data, rawData)->
  peopledetail = template "People/Detail"
  $(".spinner").replaceWith peopledetail(data.Data)

  $(".actionbar .message-center").removeClass "hide" if data.Data.IsMySelf

  $(".actionbar .page-title").text unescape(window.nickname)
  $(".actionbar").children(".center").css("left", ($(window).width() - $(".actionbar .center").children(".page-title").width()) / 2)

  $(".book").each (index)->
    $(this).find(".bookCover").height $(this).find(".bookCover").width() * 4 / 3
    return

  $(".sendDirectMessage").unbind("click").on "click", (event)->
    RequestAjax "POST", "/mj/people/conversation/create", {name: unescape(window.nickname)}, DidCreateConversation, null
    
    return
  return

FailGetPeopleDetailData = (data, rawData)->
  return

DidCreateConversation = (data, rawData)->
  location.href = "file:///android_asset/www/DirectMessage/Conversation.html?id=#{data.Data}&other=#{unescape(window.nickname)}"
  return