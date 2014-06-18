$(document).on "deviceready", ()->
  nickname = unescape getQueryString "nickname"
  type = getQueryString "type"
  if type.toLowerCase() is "comment"
    $(".actionbar .page-title").text "#{nickname}发表的短评"
    RequestAjax "GET", "/mj/people/#{unescape(nickname)}/comments", {}, DidGetUserCommentsData, null
  else
    $(".actionbar .page-title").text "#{nickname}发表的书评"
    RequestAjax "GET", "/mj/people/#{unescape(nickname)}/reviews", {}, DidGetUserCommentsData, null

  CenterTitle()
  return

DidGetUserCommentsData = (data, rawData)->
  usersHTML = template "People/Comments"
  htmlString = usersHTML {Comments: data.Data}
  if htmlString.search("Template Error") < 0
    $(".container").replaceWith htmlString
  else
    ShowLoadingError()
    return

  return