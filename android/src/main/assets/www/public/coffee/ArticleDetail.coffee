$(document).ready ()->
  articleId = getQueryString "id"
  RequestAjax "GET", "/mj/article/#{articleId}", {}, DidGetArticleDetailData, FailGetArticleDetailData
  return

DidGetArticleDetailData = (data, rawData)->
  articles = template "Article/Detail"
  $("body").append articles(data.Data)
  return

FailGetArticleDetailData = (data, rawData)->
  return