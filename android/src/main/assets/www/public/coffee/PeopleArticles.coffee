$(document).on "deviceready", ()->
  $(".actionbar .page-title").text "专栏文章"
  CenterTitle()

  BindScrollToBottom()

  window.nickname = unescape getQueryString "nickname"
  GetArticles()
  return

BindScrollToBottom = ()->
  $(window).unbind("scroll").on "scroll", (event)->
    if $(document).scrollTop() + $(window).height() >= $(document).height() - 10
      GetArticles() if not window.stopFetch
    return
  return

GetArticles = ()->
  RequestAjax "GET", "/mj/people/#{window.nickname}/articles?numPerPage=10&pageNum=#{(window.currentPageNum ? 0) + 1}", {}, DidGetArticlesData, null, false
  return

DidGetArticlesData = (data, rawData)->
  if window.currentPageNum?
    window.currentPageNum++
  else
    window.currentPageNum = 1

  if $(".articleItem").length <= 0
    articles = template "People/Articles"
    htmlString = articles(data.Data)
    if htmlString.search("Template Error") < 0
      $(".container").replaceWith htmlString
    else
      ShowLoadingError()
      return
  else
    htmlString = ""
    for article in data.Data.Articles
      articleHTML = template "public/ArticleItem"
      htmlString += articleHTML article
    $(".container").append htmlString

  if window.currentPageNum >= parseInt data.Data.PageSum
    window.stopFetch = true

  return
