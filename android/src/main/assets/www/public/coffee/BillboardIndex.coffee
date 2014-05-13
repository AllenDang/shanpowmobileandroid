$(document).ready ()->
  actionbar = template "public/ActionBar"
  $("body").html actionbar()
  $(".actionbar .channel").addClass "hide"
  $(".actionbar .slide-menu").addClass "hide"

  RequestAjax "GET", "/mj/billboard", {}, DidGetBillboardIndexData, FailGetBillboardIndexData
  return

DidGetBillboardIndexData = (data, rawData)->
  billboardIndex = template "Billboard/Index"
  for billboard in data.Data
    billboard.array = new Array(billboard.Version)
  $(".spinner").replaceWith billboardIndex data

  $(".billboard").each ()->
    $(this).find(".ver").each (index)->
      $(this).addClass("hide") if index > 3 and not $(this).hasClass("more")
      return
    return

  $(".actionbar .page-title").text "热辣榜单"
  $(".actionbar").children(".center").css("left", ($(window).width() - $(".actionbar .center").children(".page-title").width()) / 2)

  $(".ver.more").unbind("click").on "click", (event)->
    if $(this).hasClass "nobkg"
      $(this).removeClass "nobkg"
      $(this).closest(".billboard").find(".ver").each (index)->
        if index > 3 and not $(this).hasClass "more"
          $(this).addClass "hide"
        return
      $(this).siblings(".clearfix").remove()
      $(this).html "更多<span class='halflings chevron-down'></span>"
    else
      $(this).addClass "nobkg"
      $(this).closest(".billboard").find(".ver").removeClass "hide"
      $(this).before "<div class='clearfix'></div>"
      $(this).html "收起<span class='halflings chevron-up'></span>"
    return

  return

FailGetBillboardIndexData = (data, rawData)->
  return
