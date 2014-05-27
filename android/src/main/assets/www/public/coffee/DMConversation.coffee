$(document).on "deviceready", ()->
  actionbar = template "public/ActionBar"
  $("body").html actionbar()
  $(".actionbar .channel").addClass "hide"
  $(".actionbar .slide-menu").addClass "hide"

  window.conversations = new Array()

  otherName = getQueryString "other"
  $(".actionbar .page-title").text unescape otherName
  $(".actionbar").children(".center").css("left", ($(window).width() - $(".actionbar .center").children(".page-title").width()) / 2)
  
  window.conversationId = getQueryString "id"
  RequestAjax "GET", "/mj/people/conversation/#{window.conversationId}/message/newest", {}, DidGetNewestMessageData, null
  return

DidGetNewestMessageData = (data, rawData)->
  window.conversations = data.Data
  newestId = data.Data.Id

  RequestAjax "GET", "/mj/people/conversation/#{window.conversationId}/message/#{data.Data[0].Id}/before", {}, DidGetOlderMessageData, null
  return

DidGetOlderMessageData = (data, rawData)->
  window.conversations = data.Data.concat window.conversations if data.Data?

  messagesHTML = template "DirectMessage/Messages"
  $(".spinner").replaceWith messagesHTML({Messages: window.conversations})

  window.scrollTo(0, document.body.scrollHeight);

  $("#submit").unbind("click").on "click", (event)->
    event.preventDefault()
    event.stopPropagation()
    if $(".sendResponseContent").val()?.length <= 0
      alert "请输入回复内容"
    else
      $(this).prop "disabled", true
      window.responseContent = $("#replyInput").val()
      data = {
        content: window.responseContent
      }
      RequestAjax "POST", "/mj/people/conversation/#{window.conversationId}/message/post", data, DidPostMessage, null
  return

DidPostMessage = (data, rawData)->
  $("#replyInput").val("").blur().focus()
  $("button").prop("disabled", true)

  messageHTML = template "DirectMessage/MineMsg"
  msgData = {
      Poster: {
        Nickname: "木一",
        AvatarUrl: data.Data.AvatarUrl
      },
      CreationTime: "1秒",
      Content: window.responseContent,
      IsMySelf: true
    }
  $(".messages").append messageHTML(msgData)

  window.scrollTo(0, document.body.scrollHeight);
  return

