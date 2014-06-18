$(document).on "deviceready", ()->  
  title = getQueryString "title"
  window.ver = getQueryString "version"
  RequestAjax "GET", "/mj/billboard/detail", {title: unescape(title), version: window.ver}, DidGetBillboardDetailData, FailGetBillboardDetailData
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
  $(".actionbar .versions").removeClass("hide").find(".dropdown-toggle").children("span").text "第#{window.ver}期"
  CenterTitle()

  for i in [data.Data.VersionsSum..1]
    versionHTML = template "public/ActionBarVersion"
    $(".actionbar .versions").find(".dropdown-menu").append versionHTML {Title: data.Data.Billboard.Title, Version: i}

  $(".mega table td").each (index)->
    $(this).children("div").css {
      "left": ($(this).width() - $(this).children("div").width()) / 2
    }
    return
  return

FailGetBillboardDetailData = (data, rawData)->
  return
