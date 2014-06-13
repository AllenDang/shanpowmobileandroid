$(document).on "deviceready", ()->
  $(".actionbar .page-title").text "首页"
  $(".actionbar .channel").removeClass "hide"
  $(".actionbar .slide-menu").removeClass "hide"
  $(".actionbar .back").addClass "hide"
  $(".actionbar .button.search").removeClass "hide"

  CenterTitle()

  ch = getQueryString "ch"

  if ch is "f"
    node = document.createElement('link')
    node.rel = 'stylesheet'
    node.type = 'text/css'
    node.href = 'public/css/Index_F.css'
    document.getElementsByTagName('head')[0].appendChild(node)

  if parseInt(localStorage.getItem("unreadMsgCount")) > 0
    $(".actionbar .slide-menu").find(".badge").text "#{localStorage.getItem("unreadMsgCount")}"
  else
    $(".actionbar .slide-menu").find(".badge").text ""

  RequestAjax "GET", "/mj", {ch: ch ? "m"}, DidGetIndexData, FailGetIndexData
  return

DidGetIndexData = (data, rawData)->
  main = template "Index/Main"
  $(".container").replaceWith main data.Data

  channel = getQueryString "ch"
  if channel is "f"
    $(".actionbar .channel").find("img.current-channel").attr "src", "public/img/Crown_Woman.png"
  else
    $(".actionbar .channel").find("img.current-channel").attr "src", "public/img/Crown.png"

  if data?.Data?.IsLogin
    $(".wizard h4 .more").removeClass "hide"

  $("ul.slidesjs-pagination").css {
    "right": "auto",
    "left": ($(".slides").width() - $("ul.slidesjs-pagination").width()) / 2
  }

  $(".ratingStar").raty {
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

FailGetIndexData = (data, rawData)->
  return

$(document).on "backbutton", (event)->
  event.preventDefault()
  navigator.app.exitApp()
  return
