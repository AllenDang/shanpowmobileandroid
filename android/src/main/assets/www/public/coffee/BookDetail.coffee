$(document).ready ()->
  actionbar = template "public/ActionBar"
  $("body").html actionbar()
  $(".actionbar .channel").addClass "hide"
  $(".actionbar .slide-menu").addClass "hide"
  $(".actionbar .button.search").removeClass "hide"

  bookId = getQueryString "id"
  RequestAjax "GET", "/mj/book/#{bookId}", {}, DidGetBookDetailData, FailGetBookDetailData
  return

DidGetBookDetailData = (data, rawData)->
  bookDetail = template "Book/Main"
  $(".spinner").replaceWith bookDetail data.Data

  $(".actionbar .page-title").text data.Data.book.Title
  $(".actionbar").children(".center").css("left", ($(window).width() - $(".actionbar .center").children(".page-title").width()) / 2)

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

  $(".statusAction[data-statuscode='wanttoread']").unbind("tap").on "tap", (event)->
    return if $(this).hasClass "inactive"
    if !window.isLogin
      alert "尚未登录山坡账号，请登录后再试"
      return
    bookId = $(".container").attr "id"
    data = {
      markType: "wanttoread",
      score: 0,
      content: "",
      isShareToQQ: false,
      isShareToWeibo: false
    }
    RequestAjax "POST", "/book/#{bookId}/mark", data, DidMarkWantToRead, null
    
  $(".ratingStar").raty {
    score: -> return $(this).data("score") / 2,
    halfShow: false,
    starOff: 'http://shanpowbookcover.qiniudn.com/star-off-small.png',
    starOn: 'http://shanpowbookcover.qiniudn.com/star-on-small.png',
    hints: window.scoreHints,
    noRatedMsg: window.scoreNoRatedMsg,
    readOnly: true,
    size: 10,
    width: 70
  }

  $(".cmtScore").raty {
    score: -> return $(this).data("score"),
    halfShow: false,
    starOff: 'http://shanpowbookcover.qiniudn.com/star-off-small.png',
    starOn: 'http://shanpowbookcover.qiniudn.com/star-on-small.png',
    hints: window.scoreHints,
    noRatedMsg: window.scoreNoRatedMsg,
    readOnly: true,
    size: 10,
    width: 70
  }

  $(".reviewScore").raty {
    score: -> return $(this).data("score"),
    halfShow: false,
    starOff: 'http://shanpowbookcover.qiniudn.com/star-off-small.png',
    starOn: 'http://shanpowbookcover.qiniudn.com/star-on-small.png',
    hints: window.scoreHints,
    noRatedMsg: window.scoreNoRatedMsg,
    readOnly: true,
    size: 10,
    width: 70
  }

  return

FailGetBookDetailData = (data, rawData)->
  return

DidMarkWantToRead = (data, rawData)->
  $(".inactive").removeClass "inactive"
  $(".statusAction[data-statuscode='1']").addClass "inactive"
  return
