$(document).on "deviceready", ()->  
  bookId = getQueryString "id"
  RequestAjax "GET", "/mj/book/#{bookId}", {}, DidGetBookDetailData, FailGetBookDetailData
  return

DidGetBookDetailData = (data, rawData)->
  bookDetail = template "Book/Detail"
  htmlString = bookDetail data.Data
  if htmlString.search("Template Error") < 0
    $(".container").replaceWith bookDetail data.Data
  else
    ShowLoadingError()
    return

  $(".actionbar .page-title").text data.Data.Book.Title
  CenterTitle()

  if $(".summaryContent").height() <= 80
    $(".expand").hide()
  else
    window.fullSummary = $(".summaryContent").text()
    $(".summaryContent").text $(".summaryContent").text().substr(0, 80) + "..."

  $(".expand").parent().unbind("click").on "click", (event)->
    if $(this).find(".expand").hasClass "expanded"
      $(this).find(".expand").removeClass "expanded"
      $(".summaryContent").text $(".summaryContent").text().substr(0, 80) + "..."
    else
      $(this).find(".expand").addClass "expanded"
      $(".summaryContent").text window.fullSummary
    return

  $(".statusAction[data-statuscode='wanttoread']").unbind("click").on "click", (event)->
    return if $(this).hasClass "inactive"
    $(this).find(".wanttoread").addClass("active")
    bookId = $(".container").attr "id"
    data = {
      markType: "wanttoread",
      score: 0,
      content: "",
      isShareToQQ: false,
      isShareToWeibo: false
    }
    RequestAjax "POST", "/book/#{bookId}/mark", data, DidMarkWantToRead, FailMarkWantToRead, false
    
  $(".ratingStar").raty {
    score: -> return $(this).data("score") / 2,
    halfShow: false,
    starOff: '../public/img/Star_Big_Off_Green.png',
    starOn: '../public/img/Star_Big_On_Green.png',
    hints: window.scoreHints,
    noRatedMsg: window.scoreNoRatedMsg,
    readOnly: true,
    size: 10,
    width: false
  }

  $(".cmtScore").raty {
    score: -> return $(this).data("score"),
    halfShow: false,
    starOff: '../public/img/Star_Small_Off_White.png',
    starOn: '../public/img/Star_Small_On_White.png',
    hints: window.scoreHints,
    noRatedMsg: window.scoreNoRatedMsg,
    readOnly: true,
    size: 10,
    width: 70
  }

  $(".reviewScore").raty {
    score: -> return $(this).data("score"),
    halfShow: false,
    starOff: '../public/img/Star_Small_Off_White.png',
    starOn: '../public/img/Star_Small_On_White.png',
    hints: window.scoreHints,
    noRatedMsg: window.scoreNoRatedMsg,
    readOnly: true,
    size: 10,
    width: 70
  }

  $(".readButton").unbind("click").click (event)->
    url = $(this).data "url"
    cordova.exec null, null, "ActivityLauncher", "openWebView", [url]
    return

  return

FailGetBookDetailData = (data, rawData)->
  return

DidMarkWantToRead = (data, rawData)->
  $(".statusAction").each ()->
    $(this).find(".active").removeClass "active" if not $(this).find(".active").hasClass("wanttoread")
    return
  $(".selfComment .arrow").removeClass().addClass("offset1 text-center arrow")
  return

FailMarkWantToRead = (data, rawData)->
  cordova.exec null, null, "ToastHelper", "show", ["标记失败，请点击重试"]
  return
