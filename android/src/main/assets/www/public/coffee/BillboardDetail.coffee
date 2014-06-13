$(document).on "deviceready", ()->  
  title = getQueryString "title"
  ver = getQueryString "version"
  RequestAjax "GET", "/mj/billboard/detail", {title: unescape(title), version: ver}, DidGetBillboardDetailData, FailGetBillboardDetailData
  return

DidGetBillboardDetailData = (data, rawData)->
  billboardDetail = template "Billboard/Detail"
  htmlString = billboardDetail data.Data
  if htmlString.search("Template Error") < 0
    $(".container").replaceWith htmlString
  else
    ShowLoadingError()
    return

  $(".actionbar .page-title").text data.Data.Billboard.Title
  CenterTitle()

  $(".mega table td").each (index)->
    $(this).children("div").css {
      "left": ($(this).width() - $(this).children("div").width()) / 2
    }
    return
  return

FailGetBillboardDetailData = (data, rawData)->
  return
