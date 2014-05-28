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
  window.conversations = data.Data.Messages if data.Data.Messages?
  window.oldestId = window.conversations[0].Id
  window.TotalSum = data.Data.TotalSum

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

  $(".loadMore").removeClass("hide").unbind("click").on "click", (event)->
    RequestAjax "GET", "/mj/people/conversation/#{window.conversationId}/message/#{window.oldestId}/before", {}, DidGetPastMessageData, null
    return

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

DidGetPastMessageData = (data, rawData)->
  mineMessageHTML = template "DirectMessage/MineMsg"
  theirMessageHTML = template "DirectMessage/TheirMsg"

  for msg in data.Data.reverse()
    if msg.IsMySelf
      msgToInsert = mineMessageHTML msg
    else
      msgToInsert = theirMessageHTML msg

    $(".messages").prepend msgToInsert

  if $(".message").length >= window.TotalSum
    $(".loadMore").addClass("hide")

  $('html, body').scrollTop $("##{window.oldestId}").offset().top - $(".actionbar").height()

  window.oldestId = $(".message").first().attr "id"
  return

