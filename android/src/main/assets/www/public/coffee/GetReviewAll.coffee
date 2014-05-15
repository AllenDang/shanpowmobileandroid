LoadReview = ()->
  data = {
    pageNum: window.pageNum,
    numPerPage: 10,
    ch: getQueryString("ch") ? "m"
  }
  RequestAjax "GET", "/mj/review/morerecommendedreviews", data, DidGetReviews, FailGetReviews
  return

$(document).on "deviceready", ()->
  window.pageNum = 1
  $(".loadMore").removeClass "hide"
  actionbar = template "public/ActionBar"
  $("body").html actionbar()
  $(".actionbar .channel").addClass "hide"
  $(".actionbar .slide-menu").addClass "hide"

  LoadReview()
  return

DidGetReviews = (data, rawData)->
  reviews = template "Review/All"
  $(".spinner").replaceWith reviews data

  for review in data.Data
    singleReview = template "public/Review"
    $(".loadMore").before singleReview review

  $(".loadMore").appendTo $(".container")
  $(".loadMore").removeClass("hide")

  $(".actionbar .page-title").text "所有评论"
  $(".actionbar").children(".center").css("left", ($(window).width() - $(".actionbar .center").children(".page-title").width()) / 2)

  $(".ratingStar").raty {
    score: -> return $(this).data("score"),
    halfShow: false,
    starOff: 'http://shanpowbookcover.qiniudn.com/star-off-small.png',
    starOn: 'http://shanpowbookcover.qiniudn.com/star-on-small.png',
    readOnly: true,
    size: 10
  }

  window.pageNum++

  $(".loadMore").unbind("click").on "click", (event)->
    return if not $(event.target).hasClass "loadMore"
    LoadReview()
    event.stopPropagation()
    event.preventDefault()
    return
  return

FailGetReviews = (data, rawData)->
  alert "获取更多书评出错，请重试"
  return
