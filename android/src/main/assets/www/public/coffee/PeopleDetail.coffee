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

  $(".actionbar .page-title").text unescape(window.nickname)
  $(".actionbar").children(".center").css("left", ($(window).width() - $(".actionbar .center").children(".page-title").width()) / 2)

  $(".book").each (index)->
    $(this).find(".bookCover").height $(this).find(".bookCover").width() * 4 / 3
    return
  return

FailGetPeopleDetailData = (data, rawData)->
  return