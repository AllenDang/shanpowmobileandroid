$(document).on "deviceready", ()->
  RequestAjax "GET", "/mj/article", {}, DidGetArticleListData, FailGetArticleListData
  return

DidGetArticleListData = (data, rawData)->
  articles = template "Article/List"
  for article in data.Data
    article.Content = $("<div>#{article.Content}</div>").text()
  
  $(".spinner").replaceWith articles(data)

  $(".actionbar .page-title").text "文章列表"
  CenterTitle()
  return

FailGetArticleListData = (data, rawData)->
  return