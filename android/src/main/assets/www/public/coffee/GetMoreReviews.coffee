$(document).on "deviceready", ()->  
  window.bookId = getQueryString "bookid"
  RequestAjax "GET", "/mj/book/#{window.bookId}/morereviews", {}, DidGetMoreComments, FailGetMoreComments
  return

DidGetMoreComments = (data, rawData)->
  bookDetail = template "Book/MoreReviews"
  $(".spinner").replaceWith bookDetail data

  $(".actionbar .page-title").text "书评"
  CenterTitle()

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

FailGetMoreComments = (data, rawData)->
  return

