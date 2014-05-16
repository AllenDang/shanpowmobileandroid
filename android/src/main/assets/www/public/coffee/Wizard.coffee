$(document).on "deviceready", ()->
  actionbar = template "public/ActionBar"
  $(".actions").before actionbar()
  $(".actionbar .channel").addClass "hide"
  $(".actionbar .slide-menu").addClass "hide"
  $(".spinner").remove()
  $(".actionbar .page-title").text "一键治书荒"
  $(".actionbar").children(".center").css("left", ($(window).width() - $(".actionbar .center").children(".page-title").width()) / 2)

  $(".innerCircle").height $(".innerCircle").width()

  $(".innerCircle").unbind("click").on "click", (event)->
    if not $(".infoText").hasClass("hide")
      navigator.notification.alert "提示", "还需要标记更多书籍"
      return

    imgUrl = $(".circle").attr "src"
    imgUrl.replace "full", "half"
    $(".circle").attr "src", imgUrl

    $(".tip").text "正在为您努力的搜书..."
    $(".circle").addClass "rotate"
    $("hr").hide()
    $(".info").hide()

    RequestAjax "GET", "/book/recommendations", {}, DidGetRecommendBooks, null, null
    return

  RequestAjax "GET", "/mj/book/getuserneedmarkbookcnt", {}, DidGetMarkBookCnt, null, null
  return

DidGetMarkBookCnt = (data, rawData)->
  count = parseInt data.Data.needMarkCnt
  $(".infoText").children("div").children("span").text "#{count}"
  if count > 0
    $(".infoText").removeClass("hide")
  else
    $(".infoText").addClass("hide")

  return


DidGetRecommendBooks = (data)->
  $(".books").html ""

  htmlToInsert = ""

  if data.Data?
    for book in data.Data
      bookHTML = template "public/WizardBook"
      htmlToInsert += bookHTML(book)
  else
    htmlToInsert = "<div class='nosimilaruser'>没有找到可以推荐给你的书籍</div>"

  $(".actions").addClass "hide"
  $("body").append "<div class='container'></div>"
  $(".container").append htmlToInsert
  return
