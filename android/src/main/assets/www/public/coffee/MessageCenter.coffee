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

        switch $(this).data("target")
          when "directmessage" then GetDirectMessages()
          when "response" then GetResponses()
          when "update" then GetUpdate()

      return
    return

  return

GetDirectMessages = ()->
  RequestAjax "GET", "/mj/msgcenter/response", {}, DidGetDirectMessageData, null
  return

GetResponses = ()->
  RequestAjax "GET", "/mj/msgcenter/response", {}, DidGetResponseData, null
  return

GetUpdate = ()->
  RequestAjax "GET", "/mj/msgcenter/update", {}, DidGetUpdateData, null
  return

DidGetDirectMessageData = (data, rawData)->
  responses = template "MessageCenter/DirectMessage"
  $(".payload").html responses data
  return

DidGetResponseData = (data, rawData)->
  responses = template "MessageCenter/Response"
  $(".payload").html responses data
  return

DidGetUpdateData = (data, rawData)->
  responses = template "MessageCenter/Update"
  $(".payload").html responses data
  return