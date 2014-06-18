$(document).on "deviceready", ()->
  nickname = unescape getQueryString "nickname"
  type = getQueryString "type"
  if type.toLowerCase() is "follower"
    $(".actionbar .page-title").text "粉丝"
    RequestAjax "GET", "/mj/people/#{nickname}/fans", {}, DidGetUsersData, null
  else
    $(".actionbar .page-title").text "关注"
    RequestAjax "GET", "/mj/people/#{nickname}/concerned", {}, DidGetUsersData, null

  CenterTitle()
  return

DidGetUsersData = (data, rawData)->
  usersHTML = template "People/Follows"
  htmlString = usersHTML {Users: data.Data}
  if htmlString.search("Template Error") < 0
    $(".container").replaceWith htmlString
  else
    ShowLoadingError()
    return

  $(".user").each ()->
    $(this).find(".nickname").css "line-height", $(this).find("img").width() + "px"
    return

  return