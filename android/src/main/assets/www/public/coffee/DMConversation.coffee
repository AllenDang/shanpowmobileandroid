$(document).on "deviceready", ()->  
  window.conversations = new Array()

  otherName = getQueryString "other"
  $(".actionbar .page-title").text unescape otherName
  CenterTitle()
  
  window.conversationId = getQueryString "id"
  RequestAjax "GET", "/mj/people/conversation/#{window.conversationId}/message/newest", {}, DidGetNewestMessageData, null
  return

DidGetNewestMessageData = (data, rawData)->
  window.conversations = data.Data.Messages if data.Data.Messages?
  window.oldestId = window.conversations[0].Id if window.conversations.length > 0
  window.TotalSum = data.Data.TotalSum

  messagesHTML = template "DirectMessage/Messages"
  htmlString = messagesHTML({Messages: window.conversations, IsLogin: if localStorage.IsLogin is "YES" then true else false})
  if htmlString.search("Template Error") < 0
    $(".container").replaceWith htmlString
  else
    ShowLoadingError()
    return

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
        id: TimeStamp(),
        content: window.responseContent
      }
      PostMessage data

  $(".loadMore").removeClass("hide").unbind("click").on "click", (event)->
    RequestAjax "GET", "/mj/people/conversation/#{window.conversationId}/message/#{window.oldestId}/before", {}, DidGetPastMessageData, null
    return

  $(".loadMore").addClass("hide") if $(".message").length >= window.TotalSum

  return

PostMessage = (data)->
  $("#replyInput").val("").blur().focus()
  $("button").prop("disabled", true)

  messageHTML = template "DirectMessage/MineMsg"
  msgData = {
      Id: data.id,
      Poster: {
        Nickname: localStorage.SelfNickname ? "",
        AvatarUrl: localStorage.SelfAvatarUrl ? "http://shanpowbookcover.qiniudn.com/user-normal.jpg"
      },
      CreationTime: "1秒",
      Content: window.responseContent,
      IsMySelf: true
    }
  $(".messages").append messageHTML(msgData)

  $("##{data.id}").find(".status").removeClass("hide")

  window.scrollTo(0, document.body.scrollHeight);

  RequestAjax "POST", "/mj/people/conversation/#{window.conversationId}/message/post", data, DidPostMessage, FailPostMessage, false
  return

DidPostMessage = (data, rawData)->
  $("##{rawData.Data.id}").find(".status").removeClass().addClass("status glyphicons circle_ok")
  $("##{rawData.Data.id}").find(".status").animate {opacity: 0}, 1000, (()->
    $(this).css "opacity", 1
    $(this).addClass("hide")
    )
  return

FailPostMessage = (data, rawData)->
  $("##{rawData.Data.id}").find(".status").removeClass().addClass("status glyphicons circle_exclamation_mark")
  $("##{rawData.Data.id}").find(".status").unbind("click").on "click", (event)->
    $("##{rawData.Data.id}").remove()
    PostMessage rawData.Data
    return
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

