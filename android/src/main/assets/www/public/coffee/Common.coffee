window.scoreHints = ['难看', '不好看', '一般', '好书', '神作'];
window.scoreNoRatedMsg = "尚无评分";

getQueryString = (name)->
  reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
  url = decodeURI(window.location.search, "UTF-8")
  r = url.substr(1).match(reg)
  if r != null
    return escape(r[2])
  return null

RequestAjax = (type, url, data, successCallback, failCallback, shouldSpin)->
  rawData = {
    Path: url,
    Data: data
  }
  options = {
    type: type,
    url: url,
    data: data ? {},
    successCallback: successCallback,
    failCallback: failCallback,
    shouldSpin: shouldSpin
  }

  if localStorage.shouldFetchDataFromCache is "YES"
    cordova.exec ((data)->
      successCallback(data, rawData)
      localStorage.shouldFetchDataFromCache = "NO"), null, "CachedIOHelper", "get", ["#{type}:#{url}"]
  else
    if window.localStorage.getItem("token")
      options.data.csrf_token = window.localStorage.getItem("token")
      RequestDataWithParam options
    else
      GetToken(options)
  
  return

GetToken = (options)->
  RequestDataWithParam {
      type: "GET",
      url: "/token",
      successCallback: ((resData)->
        window.localStorage.setItem "token", resData.Data
        options.data.csrf_token = resData.Data
        RequestDataWithParam options
        return
      ),
      failCallback: null
    }
  return

RequestDataWithParam = (options)->
  timeoutInterval = 10000
  shouldShowSpinner = options.shouldSpin ? true

  rawData = {
    Path: options.url,
    Data: options.data
  }

  $.ajax {
    async: true,
    type: options.type ? "GET",
    url: "http://www.shanpow.com#{encodeURI(options.url ? "/")}",
    cache: false,
    data: options.data,
    statusCode: {
      403: (()->GetToken(options))
    },
    success: ((data)->
      setTimeout (()->navigator.notification.activityStop()), 200
      if window.shouldCache ? true
        cordova.exec ((data)->), null, "CachedIOHelper", "set", ["#{options.type}:#{options.url}", data]
      if data.Result is true
        if options.successCallback?
          options.successCallback(data, rawData)
        else
          location.reload()
      else
        if options.failCallback?
          options.failCallback(data, rawData)
        else
          ShowLoadingError "加载失败，请下拉刷新以重试"
      return
    ),
    dataType: "json",
    timeout: timeoutInterval,
    error: ((jqXHR, textStatus, errorThrown)->
      if options.type is "GET"
        # navigator.notification.alert "加载失败，请重试", (()->RequestDataWithParam options), "提示", "重试"
        ShowLoadingError "加载失败，请下拉刷新以重试"
      if options.failCallback?
        options.failCallback(null, rawData)
      return
    ),
    beforeSend: ((jqXHR, settings)->
      if shouldShowSpinner
        navigator.notification.activityStart("", "正在加载...")
        setTimeout (()->navigator.notification.activityStop()), timeoutInterval
      return),
    complete: ((jqXHR, textStatus)->
      setTimeout (()->navigator.notification.activityStop()), 200
      return)
  }
  return

IsUsernameMentioned = (content, username)->
  str = "@#{username}"
  return -1 if not content?
  return content.indexOf str

AddUrlToLocalStorage = (url)->
  urls = jQuery.parseJSON(localStorage.getItem("urls"))
  urls = new Array() if not urls?
  urls.push url
  localStorage.setItem "urls", JSON.stringify(urls)
  return

# 文本框根据输入内容自适应高度
# @author      tang bin
# @version     0.3
# @see         http://www.planeart.cn/?p=1489
# @param       {HTMLElement}   输入框元素
# @param       {Number}        设置光标与输入框保持的距离(默认20)
# @param       {Number}        设置最大高度(可选)
autoTextarea = (elem, extra, maxHeight)->
  extra = extra || 20;
  isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window
  isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera')
  addEvent = (type, callback)->
    if elem.addEventListener then elem.addEventListener(type, callback, false) else elem.attachEvent('on' + type, callback)
  getStyle = if elem.currentStyle then ((name)->
    val = elem.currentStyle[name]
     
    if (name is 'height' and val.search(/px/i) isnt 1)
      rect = elem.getBoundingClientRect()
      return rect.bottom - rect.top - parseFloat(getStyle('paddingTop')) - parseFloat(getStyle('paddingBottom')) + 'px'
     
    return val) else ((name)->return getComputedStyle(elem, null)[name])

  minHeight = parseFloat(getStyle('height'))
   
  elem.style.maxHeight = elem.style.resize = 'none'
   
  change = ()->
    padding = 0
    style = elem.style
     
    return if elem._length is elem.value.length
    elem._length = elem.value.length
     
    if (!isFirefox and !isOpera)
      padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'))
 
    scrollTop = document.body.scrollTop || document.documentElement.scrollTop
     
    elem.style.height = minHeight + 'px'
    if elem.scrollHeight > minHeight
      if maxHeight and elem.scrollHeight > maxHeight
        height = maxHeight - padding;
        style.overflowY = 'auto'
      else
        height = elem.scrollHeight - padding
        style.overflowY = 'hidden'
 
      style.height = height + extra + 'px'
      scrollTop += parseInt(style.height) - elem.currHeight
      document.body.scrollTop = scrollTop
      document.documentElement.scrollTop = scrollTop
      elem.currHeight = parseInt(style.height)
   
  addEvent('propertychange', change)
  addEvent('input', change)
  addEvent('focus', change)
  change()

PullToRefresh = ()->
  $("body").unbind("touchstart").on "touchstart", (event)->
    if $(".actionbar").length > 0
      $(".actionbar").append "<div class='pullbar' id='pullIndicator'></div>"
    else
      $("body").prepend "<div class='pullbar' id='pullIndicator'></div>"
    window.startY = event.originalEvent.touches[0].screenY
    window.startYOffset = $("body").scrollTop()
    window.zeroY = null

  $("body").unbind("touchmove").on "touchmove", (event)->
    window.lastY = event.originalEvent.touches[0].screenY

    if $("body").scrollTop() <= 0
      return if window.lastY - window.startY < 0
      event.preventDefault()
      if window.zeroY?
        $("#pullIndicator").width $(window).width() * (window.lastY - window.zeroY) / ($(window).height() * 0.4)
        $("#pullIndicator").css "left", ($(window).width() - $("#pullIndicator").width()) / 2
        $(".actionbar .title-section").addClass "hide"
        $(".actionbar .loading").removeClass "hide"
        CenterTitle()
        if $("#pullIndicator").width() >= $(window).width()
          $(".actionbar .loading .pullingText").text "松开以刷新"
        else
          $(".actionbar .loading .pullingText").text "下拉刷新..."
      else
        window.zeroY = window.lastY

  $("body").unbind("touchend").on "touchend", (event)->
    if $("#pullIndicator").width() >= $(window).width()
      window.pullToRefresh = true

      $(document).trigger("deviceready")
    $("#pullIndicator").width 0
    $(".actionbar .title-section").removeClass "hide"
    $(".actionbar .loading").addClass "hide"

TimeStamp = ()->
  date = new Date()
  return Number(date)

$.fn.MoveToEnd = ()->
  obj = $(this)[0]
  obj.focus()
  len = 0
  if obj.value?
    len = obj.value.length
  else
    len = obj.textContent.length
  if document.selection
    sel = obj.createTextRange()
    sel.moveStart('character',len)
    sel.collapse()
    sel.select()
  else if typeof obj.selectionStart is 'number' and typeof obj.selectionEnd is 'number'
    obj.selectionStart = obj.selectionEnd = len
  return

GetUnreadMessageCount = ()->
  cordova.exec DidGetUnreadCount, null, "CachedIOHelper", "get", ["MK_UNREAD_NOTIFICATION_COUNT"]
  return

DidGetUnreadCount = (data)->
  localStorage.setItem("unreadMsgCount", "#{data.MK_UNREAD_NOTIFICATION_COUNT}")
  $(document).trigger "didGetUnreadCount"
  return

GetBack = ()->
  localStorage.shouldFetchDataFromCache = "YES"
  window.history.back()
  return

CenterTitle = ()->
  allWidth = 0
  $(".actionbar .actionbar-section").each (index)->
    allWidth += $(this).width() if not $(this).hasClass("hide")
    return
  $(".actionbar").children(".center").not(".hide").css("left", ($(".actionbar").width() - allWidth) / 2)
  return

ShowLoadingError = (tipString)->
  if $(".container").html().length <= 0
    $(".error-msg").remove()
    errMsg = template "public/ErrorMsg"
    $("body").prepend errMsg {
      tip: tipString,
      onBlank: true
    }
    $(".container").height $(window).height() - 32
  else
    cordova.exec null, null, "ToastHelper", "show", ["加载失败，请下拉刷新以重试"]
  return

$(document).on "deviceready", ()->
  if window.pullToRefresh ? false
    window.pullToRefresh = false
    return
  
  try
    actionbar = template "public/ActionBar"
    $("body").prepend actionbar()
  catch err
    console.log err.description
  
  PullToRefresh()

  $(document).on("click tap", ".actionbar .back", (()->
    GetBack()
    return))

  $(document).on "backbutton", ()->
    GetBack()
    return

  $(document).on "click", ".left-button .slide-menu", (()->
    if $(".actionbar .slide-menu").find(".badge").text() is ""
      cordova.exec null, null, "ActivityLauncher", "toggleSlidingMenu", []
    else
      location.href = "file:///android_asset/www/MessageCenter/Index.html"
    return)

  clearInterval getUnreadCountTimer
  getUnreadCountTimer = setInterval (()->GetUnreadMessageCount()), 10000
  GetUnreadMessageCount()
  return

# END OF FILE