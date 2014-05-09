$(document).ready ()->
  RequestAjax "GET", "/mj", {ch:"m"}, DidGetIndexData, FailGetIndexData
  return

DidGetIndexData = (data, rawData)->
  articles = template "Index/Articles"
  $(".slides").html articles(data.Data)
  data.Data.articles = ""

  billboards = template "Index/Billboards"
  $(".rankinglist").html billboards(data.Data)
  data.Data.billboards = ""

  wizard = template "Index/Wizard"
  $(".bookRecommended").html wizard(data.Data)
  data.Data.guessBooks = ""
  if data.Data.isLogin
    $(".wizard h4 .more").removeClass "hide"

  recommendedReviews = template "public/Reviews"
  $(".reviews ul").html recommendedReviews(data.Data)

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