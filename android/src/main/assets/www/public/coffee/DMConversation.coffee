$(document).on "deviceready", ()->
  actionbar = template "public/ActionBar"
  $("body").html actionbar()
  $(".actionbar .channel").addClass "hide"
  $(".actionbar .slide-menu").addClass "hide"

  conversationId = getQueryString "id"
  RequestAjax "GET", "/mj/people/conversation/#{conversationId}/message/newest", {}, DidGetNewestMessageData, null
  return

DidGetNewestMessageData = (data, rawData)->
  newestId = data.Data.Id
  RequestAjax "GET", "/mj/people/conversation/#{conversationId}/message/#{newestId}/before", {}, DidGetOlderMessageData, null

  articles = template "Article/Detail"
  $(".spinner").replaceWith articles(data.Data)

  $(".actionbar .page-title").text data.Data.Poster.Nickname
  $(".actionbar").children(".center").css("left", ($(window).width() - $(".actionbar .center").children(".page-title").width()) / 2)
  return
