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
  data.csrf_token = window.csrfToken;
  rawData = {
    Path: url,
    Data: data
  }
  
  $.ajax {
    async: async ? true,
    type: type,
    url: "http://test.shanpow.com#{encodeURI(url ? "/")}",
    cache: false,
    data: data,
    statusCode: {
      400: (()->alert("400: 请求不正确") if not dontAlertOnStatusCode),
      404: (()->alert("404: 该资源不存在") if not dontAlertOnStatusCode),
      500: (()->alert("500: 服务器遇到一个内部错误，请稍等一会再试试") if not dontAlertOnStatusCode)
    },
    success: ((data)->
      if data.Result is true
        if successCallback?
          successCallback(data, rawData)
        else
          location.reload()
      else
        if failCallback?
          failCallback(data, rawData)
        else
          alert data.ErrorMsg ? "网络发生故障，请稍后重新尝试"
      return
    ),
    dataType: "json",
    timeout: 4000,
    error: ((jqXHR, textStatus, errorThrown)->
      if textStatus is "timeout"
        if timeoutCallback?
          timeoutCallback(errorThrown)
        else
          failCallback?(data, rawData)
      if textStatus is "error"
        failCallback?(errorThrown)
      return
    ),
    beforeSend: ((jqXHR, settings)->
      beforeAction?(jqXHR, settings)
      return),
    complete: ((jqXHR, textStatus)->
      afterAction?(jqXHR, textStatus)
      return)
  }
  return

RequestAjaxWithParam = (options)->
  if options.data?
    options.data.csrf_token = window.csrfToken;
  else
    options.data = {
      csrf_token: window.csrfToken
    }
  rawData = {
    Path: options.url ? "/",
    Data: options.data
  }
  
  $.ajax {
    async: options.async ? true,
    type: options.type ? "GET",
    url: "http://www.shanpow.com#{encodeURI(options.url ? "/")}",
    cache: false,
    data: options.data,
    statusCode: {
      400: (()->alert("400: 请求不正确") if not options.dontAlertOnStatusCode),
      404: (()->alert("404: 该资源不存在") if not options.dontAlertOnStatusCode),
      500: (()->alert("500: 服务器遇到一个内部错误，请稍等一会再试试") if not options.dontAlertOnStatusCode)
    },
    success: ((data)->
      if data.Result is true
        if options.successCallback?
          options.successCallback(data, rawData)
        else
          location.reload()
      else
        if options.failCallback?
          options.failCallback(data, rawData)
        else
          alert data.ErrorMsg ? "网络发生故障，请稍后重新尝试"
      return
    ),
    dataType: "json",
    timeout: 4000,
    error: ((jqXHR, textStatus, errorThrown)->
      if textStatus is "timeout"
        if options.timeoutCallback?
          options.timeoutCallback(errorThrown)
        else
          options.failCallback?(data, rawData)
      if textStatus is "error"
        options.failCallback?(errorThrown)
      return
    ),
    beforeSend: ((jqXHR, settings)->
      options.beforeAction?(jqXHR, settings)
      return),
    complete: ((jqXHR, textStatus)->
      options.afterAction?(jqXHR, textStatus)
      return)
  }
  return

$(document).ready ()->
  $(document).on("click tap", ".actionbar .back", null, ()->window.history.back(1))
  return

# END OF FILE