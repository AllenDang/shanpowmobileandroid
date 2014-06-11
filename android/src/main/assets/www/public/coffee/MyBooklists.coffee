$(document).on "deviceready", ()->  
  window.nickname = unescape getQueryString "nickname"
  window.create = parseInt getQueryString "create"

  mybooklist = template "Booklist/My"
  $(".spinner").replaceWith mybooklist()

  $(".active").removeClass("active")
  if window.create is 1
    $(".tab[data-target='mine']").addClass("active")
  else
    $(".tab[data-target='subscribed']").addClass("active")

  $(".tab").each ()->
    $(this).unbind("click").on "click", (event)->
      return if $(this).hasClass "active"
      $(".active").removeClass "active"
      $(this).addClass "active"

      if $(this).data("target") is "mine"
        $(".mine").removeClass "hide"
        $(".subscribed").addClass "hide"
        window.create = 1
      else
        $(".mine").addClass "hide"
        $(".subscribed").removeClass "hide"
        window.create = 0

      GetBooklist()
      return
    return

  GetBooklist()
  return

GetBooklist = ()->
  $(".booklists").replaceWith "<div class='booklists'><div class='row-fluid text-center none'></div></div>"
  RequestAjax "GET", "/mj/people/#{window.nickname}/booklists/#{if window.create is 1 then "created" else "subscribed"}", {}, DidGetBooklistsData, FailGetBooklistsData
  return

DidGetBooklistsData = (data, rawData)->
  if data.Data.Booklists?.length > 0
    $(".booklists .none").addClass("hide")

    for booklist in data.Data.Booklists
      booklistHTML = template "public/Booklist"
      $(".booklists").append booklistHTML(booklist)
  else
    $(".booklists .none").removeClass("hide")

  if data.Data.IsMySelf
    $(".tab[data-target='mine']").text "我创建的"
    $(".tab[data-target='subscribed']").text "我收藏的"
    $(".booklists .none").text "还没有#{if window.create is 1 then "创建" else "收藏"}书单"
    $(".actionbar .page-title").text "我#{if window.create is 1 then "创建" else "收藏"}的书单"
  else
    $(".tab[data-target='mine']").text "Ta创建的"
    $(".tab[data-target='subscribed']").text "Ta收藏的"
    $(".booklists .none").text "Ta还没有#{if window.create is 1 then "创建" else "收藏"}书单"
    $(".actionbar .page-title").text "Ta#{if window.create is 1 then "创建" else "收藏"}的书单"

  CenterTitle()

  $(".item").each ()->
    $(this).width ($(window).width() - 48) / 2
    $(this).find(".bookCover").each ()->
      $(this).height parseInt $(".item .bookCover:first-child").width() * 4 / 3
      return
    return

  $(".booklists").masonry {
    gutter: 16,
    itemSelector: ".item"
  }

  return

FailGetBooklistsData = (data, rawData)->
  return