$(document).on "deviceready", ()->
  actionbar = template "public/ActionBar"
  $("body").html actionbar()
  $(".actionbar .channel").addClass "hide"
  $(".actionbar .slide-menu").addClass "hide"
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

        switch $(this).data("target")
          when "directmessage" then GetDirectMessages()
          when "response" then GetResponses()
          when "update" then GetUpdate()

      return
    return

  GetDirectMessages()
  return

GetDirectMessages = ()->
  RequestAjax "GET", "/mj/people/conversations", {}, DidGetDirectMessageData, null
  return

GetResponses = ()->
  RequestAjax "GET", "/mj/msgcenter/response", {}, DidGetResponseData, null
  return

GetUpdate = ()->
  RequestAjax "GET", "/mj/msgcenter/update", {}, DidGetUpdateData, null
  return

DidGetDirectMessageData = (data, rawData)->
  directmessage = template "MessageCenter/DirectMessage"
  $(".payload").html directmessage data
  PositionUnreadIndicator()
  return

DidGetResponseData = (data, rawData)->
  responses = template "MessageCenter/Response"
  $(".payload").html responses data
  return

DidGetUpdateData = (data, rawData)->
  update = template "MessageCenter/Update"
  $(".payload").html update data
  return

PositionUnreadIndicator = ()->
  $(".unread-indicator").each (index)->
    offsetTop = ($(this).closest(".msg").find("img").height() - $(this).height()) / 2
    $(this).css "top", "#{offsetTop}px"
    return
  return