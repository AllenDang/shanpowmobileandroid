$(document).on "deviceready", ()->
  window.query = unescape getQueryString "q"
  RequestAjax "GET", "/mj/search/result", {q: window.query}, DidGetSearchResultData, FailGetSearchResultData
  return

DidGetSearchResultData = (data, rawData)->
  sr = template "Search/Result"
  htmlString = sr(data.Data)
  if htmlString.search("Template Error") < 0
    $(".container").replaceWith htmlString
  else
    ShowLoadingError()
    return

  $(".actionbar .page-title").text "#{window.query}的搜索结果"
  CenterTitle()

  $(".ratingStar").raty {
    score: -> return $(this).data("score") / 2,
    halfShow: false,
    starOff: 'http://shanpowbookcover.qiniudn.com/star-off-small.png',
    starOn: 'http://shanpowbookcover.qiniudn.com/star-on-small.png',
    hints: window.scoreHints,
    noRatedMsg: window.scoreNoRatedMsg,
    readOnly: true,
    size: 14
  }

  $(".rankingImage").each ()->
    $(this).height $(this).width()
    return

  $(".booklist").each ()->
    $(this).width ($(window).width() - 48) / 2
    $(this).find(".bookCover").each ()->
      $(this).height parseInt $(".booklist .bookCover:first-child").width() * 4 / 3
      return
    return

  $(".bls").masonry {
    gutter: 16,
    itemSelector: ".booklist"
  }

  $(".userAvatar").each ()->
    $(this).height $(this).width()
    return

  return

FailGetSearchResultData = (data, rawData)->
  return