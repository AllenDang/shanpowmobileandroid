$(document).ready ()->
  actionbar = template "public/ActionBar"
  $("body").html actionbar()
  $(".actionbar .page-title").text "首页"
  $(".actionbar .back").addClass "hide"

  $(".actionbar").children(".center").css("margin-left", ($(window).width() - $(".actionbar").children(".center").width() - $(".actionbar").children(".left-button").width() - $(".actionbar").children(".right-button").width()) / 2)

  ch = getQueryString "ch"
  RequestAjax "GET", "/mj", {ch: ch ? "m"}, DidGetIndexData, FailGetIndexData
  return

DidGetIndexData = (data, rawData)->
  main = template "Index/Main"
  $(".spinner").replaceWith main data.Data

  channel = getQueryString "ch"
  if channel is "f"
    $(".actionbar .channel").find("img.current-channel").attr "src", "public/img/Crown_Woman.png"
  else
    $(".actionbar .channel").find("img.current-channel").attr "src", "public/img/Crown.png"

  if data.Data.isLogin
    $(".wizard h4 .more").removeClass "hide"

  $(".slides").slidesjs {
    width: $(".container").width() - 16,
    height: ($(".container").width() - 16) * 270 / 790 + 52,
    navigation: false,
    pagination: {
      active: true,
      effect: "slide"
    }
  }

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