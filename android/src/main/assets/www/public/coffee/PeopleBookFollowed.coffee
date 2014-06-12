$(document).on "deviceready", ()->
  nickname = unescape getQueryString "nickname"
  RequestAjax "GET", "/mj/people/#{nickname}/book/followed", {}, DidGetBooksData, FailGetBooksData
  return

DidGetBooksData = (data, rawData)->
  books = template "People/BookFollowed"
  $(".container").replaceWith books(data.Data)

  $(".actionbar .page-title").text "关注的书"
  CenterTitle()
  
  $(".book").each (index)->
    $(this).find(".time").next(".clearfix").remove()
    $(this).find(".time").remove()
    return

  $(".ratingStar").raty {
    score: (()->return $(this).data("score")),
    halfShow: false,
    starOff: 'http://shanpowbookcover.qiniudn.com/star-off-small.png',
    starOn: 'http://shanpowbookcover.qiniudn.com/star-on-small.png',
    hints: window.scoreHints,
    noRatedMsg: window.scoreNoRatedMsg,
    readOnly: true,
    size: 16,
    width: 110
  }
  return

FailGetBooksData = (data, rawData)->
  return