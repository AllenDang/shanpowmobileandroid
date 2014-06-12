$(document).on "deviceready", ()->  
  $(".actionbar .page-title").text "消息中心"
  CenterTitle()

  main = template "MessageCenter/Index"
  $(".spinner").replaceWith main()

  $(".tab").each ()->
    $(this).unbind("click").on "click", (event)->
      if not $(this).hasClass "active"
        $(".active").removeClass "active"
        $(this).addClass "active"

        $(".payload").html ""

        switch $(this).attr("id")
          when "directmessage" then SwitchToDirectMessage()
          when "response" then SwitchToResponse()
          when "update" then SwitchToUpdate()

      return
    return

  InitRequest()
  return

$(document).on "click tap", "a", null, ()->
  MarkMsgAsRead($(this))
  return

InitRequest = ()->
  RequestAjax "GET", "/mj/people/conversations/tab", {}, DidGetInitData, null
  return

DidGetInitData = (data, rawData)->
  DidGetDirectMessageData {Data: data.Data.Conversations}, null
  $("#directmessage").find(".newMsgIndicator").removeClass("hide") if parseInt(data.Data.MessageUnreadSum) > 0
  $("#response").find(".newMsgIndicator").removeClass("hide") if parseInt(data.Data.ResponseUnreadSum) > 0
  $("#update").find(".newMsgIndicator").removeClass("hide") if parseInt(data.Data.UpdateUnreadSum) > 0
  return

SwitchToDirectMessage = ()->
  $(".payload").html ""
  GetMessages()
  return

GetMessages = ()->
  RequestAjax "GET", "/mj/people/conversations", {}, DidGetDirectMessageData, null
  return

DidGetDirectMessageData = (data, rawData)->
  $("#directmessage").find(".newMsgIndicator").removeClass("hide") if parseInt(data.Data?.MessagesUnreadSum ? 0) > 0
  directmessage = template "MessageCenter/DirectMessage"
  $(".payload").html directmessage data
  return

SwitchToResponse = ()->
  $(".payload").html ""
  GetResponses()
  return

GetResponses = ()->
  RequestAjax "GET", "/mj/msgcenter/response", {}, DidGetResponseData, null
  return

DidGetResponseData = (data, rawData)->
  $("#response").find(".newMsgIndicator").removeClass("hide") if parseInt(data.Data?.MessagesUnreadSum ? 0) > 0
  responses = template "MessageCenter/Response"
  $(".payload").html responses data.Data
  return

SwitchToUpdate = ()->
  $(".payload").html ""
  GetUpdates()
  return

GetUpdates = ()->
  RequestAjax "GET", "/mj/msgcenter/update", {}, DidGetUpdateData, null
  return

DidGetUpdateData = (data, rawData)->
  $("#update").find(".newMsgIndicator").removeClass("hide") if parseInt(data.Data?.MessagesUnreadSum ? 0) > 0
  update = template "MessageCenter/Update"
  $(".payload").html update data.Data
  return

MarkMsgAsRead = (target)->
  id = target.closest(".msg").attr "id"

  localStorage.setItem("unreadMsgCount", "#{parseInt(localStorage.getItem("unreadMsgCount")) - 1}")

  if target.closest(".msg").hasClass("dm")
    cordova.exec ((data)->dmData = data), null, "CachedIOHelper", "get", ["GET:/mj/people/conversations"]

    for msg in dmData.Data
      if msg.Id is id
        msg.IsNewMessages = false

    cordova.exec ((data)->), null, "CachedIOHelper", "set", ["GET:/mj/people/conversations", dmData]

  RequestAjax "POST", "/mj/msgcenter/markasread", {id: id}, DidMarkMsgAsRead, null, false
  return

DidMarkMsgAsRead = (data, rawData)->
  console.log "marked"
  return
