$(document).on "deviceready", ()->
  $(".actionbar").remove()
  articleId = getQueryString "id"
  window.isArticleDetail = true
  RequestAjax "GET", "/mj/article/#{articleId}", {}, DidGetArticleDetailData, FailGetArticleDetailData
  return

DidGetArticleDetailData = (data, rawData)->
  articles = template "Article/Detail"
  htmlString = articles(data.Data)
  if htmlString.search("Template Error") < 0
    $(".container").replaceWith htmlString
  else
    ShowLoadingError()
    return

  $(".actionbar .page-title").text ""
  CenterTitle()
  return

FailGetArticleDetailData = (data, rawData)->
  return