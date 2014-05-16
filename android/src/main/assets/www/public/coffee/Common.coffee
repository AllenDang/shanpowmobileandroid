window.scoreHints = ['难看', '不好看', '一般', '好书', '神作'];
window.scoreNoRatedMsg = "尚无评分";

getQueryString = (name)->
  reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
  url = decodeURI(window.location.search, "UTF-8")
  r = url.substr(1).match(reg)
  if r != null
    return escape(r[2])
  return null

RequestAjax = (type, url, data, successCallback, failCallback, timeoutCallback, beforeAction, afterAction, dontAlertOnStatusCode, async)->
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
    async: async
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
    timeout: 10000,
    error: ((jqXHR, textStatus, errorThrown)->
      navigator.notification.alert "加载失败，请重试", (()->
        RequestAjaxWithParam options
        return), "提示", "重试"
      return
    ),
    beforeSend: ((jqXHR, settings)->
      navigator.notification.activityStart("", "正在加载...")
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
  return

IsUsernameMentioned = (content, username)->
  str = "@#{username}"
  return -1 if not content?
  return content.indexOf str


# END OF FILE