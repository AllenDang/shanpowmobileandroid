$(document).on "deviceready", ()->
  actionbar = template "public/ActionBar"
  $("body").html actionbar()
  $(".actionbar .channel").addClass "hide"
  $(".actionbar .slide-menu").addClass "hide"

  RequestAjax "GET", "/mj/article", {}, DidGetArticleListData, FailGetArticleListData
  return

DidGetArticleListData = (data, rawData)->
  articles = template "Article/List"
  for article in data.Data
    article.Content = $("<div>#{article.Content}</div>").text()
  
  $(".spinner").replaceWith articles(data)

  $(".actionbar .page-title").text "文章列表"
  $(".actionbar").children(".center").css("left", ($(window).width() - $(".actionbar .center").children(".page-title").width()) / 2)
  return

FailGetArticleListData = (data, rawData)->
  return