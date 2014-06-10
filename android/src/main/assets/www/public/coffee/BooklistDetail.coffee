$(document).on "deviceready", ()->  
  booklistId = getQueryString "id"
  RequestAjax "GET", "/mj/booklist/#{booklistId}", {}, DidGetBooklistDetailData, FailGetBooklistDetailData
  return

DidGetBooklistDetailData = (data, rawData)->
  bookDetail = template "Booklist/Detail"
  $(".spinner").replaceWith bookDetail data.Data
  
  if $(".cat").length <= 9
    $(".cat.more").addClass("hide")
  

  $(".actionbar .page-title").text data.Data.Title
  $(".actionbar").children(".center").css("left", ($(window).width() - $(".actionbar .center").children(".page-title").width()) / 2)

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

  $(".cat").each (index)->
    $(this).unbind("tap").on "tap", (event)->
      return if $(this).hasClass "active"
      return if $(this).hasClass "more"
      $(".cat.active").removeClass "active"
      $(this).addClass "active"

      cat = $(this).data "cat"
      if cat is "all"
        $(".book").show().attr "shown", "true"
      else
        $(".book").each ()->
          if $(this).data("cat") is cat
            $(this).show().attr "shown", "true"
          else
            $(this).hide().attr "shown", "false"
          return
      return
    return

  $(".cat.more.span3").unbind("click").on "click", (event)->
    if $(".cat.span3.hide").length <= 0
      HideMoreCategories()
      $(this).children("span").removeClass().addClass "halflings chevron-down"
    else
      $(".cat").removeClass "hide"
      $(this).children("span").removeClass().addClass "halflings chevron-up"
    return

  $(".mega table td").each (index)->
    $(this).children("div").css {
      "left": ($(this).width() - $(this).children("div").width()) / 2
    }
    return

  HideMoreCategories()
  return

FailGetBooklistDetailData = (data, rawData)->
  return

HideMoreCategories = ()->
  $(".cat").each (index)->
    if index > 6 and $(".cat.span3").length > 9
      $(this).addClass "hide"
      $(".cat.more.span3").removeClass "hide"
    return
  return
