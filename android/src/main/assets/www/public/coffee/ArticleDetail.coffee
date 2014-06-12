$(document).on "deviceready", ()->
  articleId = getQueryString "id"
  RequestAjax "GET", "/mj/article/#{articleId}", {}, DidGetArticleDetailData, FailGetArticleDetailData
  return

DidGetArticleDetailData = (data, rawData)->
  articles = template "Article/Detail"
  $(".container").replaceWith articles(data.Data)

  $(".actionbar .page-title").text "文章"
  CenterTitle()
  return

FailGetArticleDetailData = (data, rawData)->
  return