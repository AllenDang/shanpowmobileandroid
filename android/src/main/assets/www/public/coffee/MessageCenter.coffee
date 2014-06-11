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

  GetMessages()
  window.initClick = true
  return

$(document).on "click tap", "a", null, ()->
  MarkMsgAsRead($(this))
  return

GetMessages = ()->
  RequestAjax "GET", "/mj/people/conversations", {}, DidGetDirectMessageData, null
  RequestAjax "GET", "/mj/msgcenter/response", {}, DidGetResponseData, null, null, null, null, null, false
  RequestAjax "GET", "/mj/msgcenter/update", {}, DidGetUpdateData, null, null, null, null, null, false
  return

DidGetDirectMessageData = (data, rawData)->
  $("#directmessage").find(".newMsgIndicator").removeClass("hide") if parseInt(data.Data.MessagesUnreadSum) > 0
  window.directMessageData = data
  SwitchToDirectMessage() if window.initClick ? true
  return

SwitchToDirectMessage = ()->
  directmessage = template "MessageCenter/DirectMessage"
  $(".payload").html directmessage window.directMessageData
  return

DidGetResponseData = (data, rawData)->
  $("#response").find(".newMsgIndicator").removeClass("hide") if parseInt(data.Data.MessagesUnreadSum) > 0
  window.responseData = data.Data
  return

SwitchToResponse = ()->
  responses = template "MessageCenter/Response"
  $(".payload").html responses window.responseData
  return

DidGetUpdateData = (data, rawData)->
  $("#update").find(".newMsgIndicator").removeClass("hide") if parseInt(data.Data.MessagesUnreadSum) > 0
  window.updateData = data.Data
  return

SwitchToUpdate = ()->
  update = template "MessageCenter/Update"
  $(".payload").html update window.updateData
  return

MarkMsgAsRead = (target)->
  id = target.closest(".msg").attr "id"

  if target.closest(".msg").hasClass("dm")
    cordova.exec ((data)->dmData = data), null, "CachedIOHelper", "get", ["GET:/mj/people/conversations"]

    for msg in dmData.Data
      if msg.Id is id
        msg.IsNewMessages = false

    cordova.exec ((data)->), null, "CachedIOHelper", "set", ["GET:/mj/people/conversations", dmData]

  RequestAjax "POST", "/mj/msgcenter/markasread", {id: id}, DidMarkMsgAsRead, null, null, null, null, null, false
  return

DidMarkMsgAsRead = (data, rawData)->
  console.log "marked"
  return
