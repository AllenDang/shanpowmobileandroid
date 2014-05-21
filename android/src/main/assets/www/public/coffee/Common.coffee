window.scoreHints = ['难看', '不好看', '一般', '好书', '神作'];
window.scoreNoRatedMsg = "尚无评分";

getQueryString = (name)->
  reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
  url = decodeURI(window.location.search, "UTF-8")
  r = url.substr(1).match(reg)
  if r != null
    return escape(r[2])
  return null

RequestAjax = (type, url, data, successCallback, failCallback, timeoutCallback, beforeAction, afterAction, dontAlertOnStatusCode, async, shouldSpin)->
  rawData = {
    Path: url,
    Data: data
  }
  options = {
    type: type,
    url: url,
    data: data,
    successCallback: successCallback,
    failCallback: failCallback,
    timeoutCallback: timeoutCallback,
    beforeAction: beforeAction,
    afterAction: afterAction,
    dontAlertOnStatusCode: dontAlertOnStatusCode,
    async: async,
    shouldSpin: shouldSpin
  }
  if window.localStorage.getItem("token")
    options.data.csrf_token = window.localStorage.getItem("token")
    RequestAjaxWithParam options
  else
    GetToken(options)
  
  return

GetToken = (options)->
  RequestAjaxWithParam {
      type: "GET",
      url: "/token",
      successCallback: ((resData)->
        window.localStorage.setItem "token", resData.Data
        options.data.csrf_token = resData.Data
        RequestAjaxWithParam options
        return
      ),
      failCallback: null
    }
  return

RequestAjaxWithParam = (options)->
  timeoutInterval = 10000
  shouldSpin = options.shouldSpin ? true
  rawData = {
    Path: options.url,
    Data: options.data
  }
  $.ajax {
    async: options.async ? true,
    type: options.type ? "GET",
    url: "http://www.shanpow.com#{encodeURI(options.url ? "/")}",
    cache: false,
    data: options.data,
    statusCode: {
      400: (()->navigator.notification.alert("400: 请求不正确") if not options.dontAlertOnStatusCode),
      404: (()->navigator.notification.alert("404: 该资源不存在") if not options.dontAlertOnStatusCode),
      500: (()->navigator.notification.alert("500: 服务器遇到一个内部错误，请稍等一会再试试") if not options.dontAlertOnStatusCode),
      403: (()->GetToken(options))
    },
    success: ((data)->
      ()->navigator.notification.activityStop()
      if data.Result is true
        if options.successCallback?
          options.successCallback(data, rawData)
        else
          location.reload()
      else
        if options.failCallback?
          options.failCallback(data, rawData)
        else
          navigator.notification.alert data.ErrorMsg ? "网络发生故障，请稍后重新尝试"
      return
    ),
    dataType: "json",
    timeout: timeoutInterval,
    error: ((jqXHR, textStatus, errorThrown)->
      navigator.notification.alert "加载失败，请重试", (()->
        RequestAjaxWithParam options
        return), "提示", "重试"
      return
    ),
    beforeSend: ((jqXHR, settings)->
      if shouldSpin
        navigator.notification.activityStart("", "正在加载...")
        setTimeout (()->
          navigator.notification.activityStop()
          return), timeoutInterval
      options.beforeAction?(jqXHR, settings)
      return),
    complete: ((jqXHR, textStatus)->
      setTimeout (()->navigator.notification.activityStop()), 200
      options.afterAction?(jqXHR, textStatus)
      return)
  }
  return

$(document).on "deviceready", ()->
  $(document).on("click tap", ".actionbar .back", null, ()->window.history.back(1))

  $(document).on "backbutton", ()->
    window.history.back(1)
    return

  $(document).on "click", ".left-button .slide-menu", null, (()->
    cordova.exec null, null, "ActivityLauncher", "toggleSlidingMenu", []
    return)

  PullToRefresh()
  return

IsUsernameMentioned = (content, username)->
  str = "@#{username}"
  return -1 if not content?
  return content.indexOf str

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
    window.startY = event.originalEvent.touches[0].screenY
    window.startYOffset = $("body").scrollTop()
    window.zeroY = null
    return

  $("body").unbind("touchmove").on "touchmove", (event)->
    event.preventDefault()
    window.lastY = event.originalEvent.touches[0].screenY

    if (window.lastY - window.startY) > 60
      window.needRefresh = true
    else
      window.needRefresh = false

    $("body").scrollTop window.startY - window.lastY + window.startYOffset
    if $("body").scrollTop() <= 0
      return if window.lastY - window.startY < 0
      if window.zeroY?
        $(".actionbar .pullbar").width $(window).width() * ($(window).width() / 60) * (window.lastY - window.zeroY) / $(window).height()
        $(".actionbar .pullbar").css "left", ($(window).width() - $(".actionbar .pullbar").width()) / 2
      else
        window.zeroY = window.lastY

    return

  $("body").unbind("touchend").on "touchend", (event)->
    if window.needRefresh is true and $(".actionbar .pullbar").width() >= $(window).width()
      location.reload()
    $(".actionbar .pullbar").width 0
    return

  return

# END OF FILE