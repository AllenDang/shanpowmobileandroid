$(document).on "deviceready", ()->
  articleId = getQueryString "id"
  RequestAjax "GET", "/mj/article/#{articleId}", {}, DidGetArticleDetailData, FailGetArticleDetailData
  return

DidGetArticleDetailData = (data, rawData)->
  articles = template "Article/Detail"
  $(".spinner").replaceWith articles(data.Data)

  $(".actionbar .page-title").text data.Data.Article.Title
  $(".actionbar").children(".center").css("left", ($(window).width() - $(".actionbar .center").children(".page-title").width()) / 2)
  return

FailGetArticleDetailData = (data, rawData)->
  return