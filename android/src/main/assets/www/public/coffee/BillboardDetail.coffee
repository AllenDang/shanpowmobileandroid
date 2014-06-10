$(document).on "deviceready", ()->  
  title = getQueryString "title"
  ver = getQueryString "version"
  RequestAjax "GET", "/mj/billboard/detail", {title: unescape(title), version: ver}, DidGetBillboardDetailData, FailGetBillboardDetailData
  return

DidGetBillboardDetailData = (data, rawData)->
  billboardIndex = template "Billboard/Detail"
  $(".spinner").replaceWith billboardIndex data.Data

  $(".actionbar .page-title").text data.Data.Billboard.Title
  $(".actionbar").children(".center").css("left", ($(window).width() - $(".actionbar .center").children(".page-title").width()) / 2)

  $(".mega table td").each (index)->
    $(this).children("div").css {
      "left": ($(this).width() - $(this).children("div").width()) / 2
    }
    return
  return

FailGetBillboardDetailData = (data, rawData)->
  return
