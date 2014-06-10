$(document).on "deviceready", ()->  
  $(".actionbar .page-title").text "消息中心"
  $(".actionbar").children(".center").css("left", ($(window).width() - $(".actionbar .center").children(".page-title").width()) / 2)

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
