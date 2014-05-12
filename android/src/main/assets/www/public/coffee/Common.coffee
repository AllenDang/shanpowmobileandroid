window.scoreHints = ['难看', '不好看', '一般', '好书', '神作'];
window.scoreNoRatedMsg = "尚无评分";

getQueryString = (name)->
  reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
  url = decodeURI(window.location.search, "UTF-8")
  r = url.substr(1).match(reg)
  if r != null
    return escape(r[2])
  return null

getAvatarUrl = (url, size)->
  return url.replace("%d", size)

RequestAjax = (type, url, data, successCallback, failCallback, timeoutCallback, beforeAction, afterAction, dontAlertOnStatusCode, async)->
  data.csrf_token = window.csrfToken;
  rawData = {
    Path: url,
    Data: data
  }
  
  $.ajax {
    async: async ? true,
    type: type,
    url: "http://www.shanpow.com#{encodeURI(url ? "/")}",
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

ConfirmDelete = (sender, okAction, cancelAction, actionString)->
  if actionString?.length > 0
    $("h4.label_Title").text "确认#{actionString}"
    $(".modal-body").children("div").text "确定要#{actionString}吗？"
    $(".btn_confirm").text actionString

  $("#modal_confirm").modal()

  $(".btn_cancel").unbind("click").click (event)->
    cancelAction?(sender)
    return
  
  $(".btn_confirm").unbind("click").click (event)->
    okAction?(sender)
    return
  return

FindElementInArray = (array, element)->
  returnValue = -1
  for e, i in array
    if e is element
      returnValue = i
  return returnValue

RemoveElementInArray = (array, element)->
  array.splice i, 1 for ser, i in array when ser is element
  return array

GenerateShareContent = (options)->
  content = ""
  star = ""
  star += "★" for i in [1..options.score]
  switch options.type
    when "cmt"
      shareStringPrefix = "#{options.user}给《#{options.bookTitle}》#{star}："
      if options.user isnt "我"
        shareStringPrefix = "喜欢#{options.user}为《#{options.bookTitle}》写的书评："
      content = shareStringPrefix + options.content.substr(0, 120 - shareStringPrefix.length)
    when "review"
      shareStringPrefix = "#{options.user}读过《#{options.bookTitle}》给#{star}，并写了书评“"
      if options.user isnt "我"
        shareStringPrefix = "喜欢#{options.user}为《#{options.bookTitle}》写的书评“"
      content = shareStringPrefix + options.reviewTitle.substr(0, 120 - shareStringPrefix.length - 9) + "”"
  return content

AppendUrlToShareContent = (options)->
  fullContent = ""
  switch options.type
    when "cmt"
      fullContent = options.content + location.href
    when "review"
      fullContent = options.content + "查看全文( http://www.shanpow.com#{options.relatedUrl} )"
  return fullContent

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

$.fn.InsertTextOnCursor = (str)->
  obj = $(this)[0]
  if document.selection
    sel = document.selection.createRange()
    sel.text = str
  else if typeof obj.selectionStart is 'number' and typeof obj.selectionEnd is 'number'
    startPos = obj.selectionStart
    endPos = obj.selectionEnd
    cursorPos = startPos
    tmpStr = obj.value
    obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length)
    cursorPos += str.length
    obj.selectionStart = obj.selectionEnd = cursorPos
  else
    obj.value += str
  return

String.prototype.InsertStringAtIndex = (str, index)->
  array = this.split ""
  for s, i in array
    if i is index
      array[i] = "#{str}#{s}"
  return array.join("")

String.prototype.Trim = ()->
  return this.replace(/(^\s+)|(\s+$)/g, "")

String.prototype.RemoveHtmlTag = ()->
  return this.replace(/<[^<>]+?>/g, "")

String.prototype.RemoveScriptTag = ()->
  str = this.replace(/<script>/g, "")
  return str.replace(/<\/script>/g, "")

String.prototype.Escape2Html = ()->
 arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
 return this.replace /&(lt|gt|nbsp|amp|quot);/ig, ((all,t)->return arrEntities[t])

Array.prototype.RemoveDuplicateElement = ()->
  oldArray = this || []
  newArray = {}
  keyArray = []
  for e in oldArray
    if typeof newArray[e] is "undefined"
      newArray[e] = 1
      keyArray.push e

  oldArray.length = 0

  for k in keyArray
    oldArray[oldArray.length] = k
  return oldArray

ReplaceReferToLink = (str, refers)->
  str = "<p>#{str}</p>" if str.indexOf("<p>") isnt 0
  referindexes = str.match(/#(\d+)/g)
  if referindexes?
    for indexStr in referindexes
      preA = "</p><a href='#' class='referindex' data-index='#{indexStr.replace('#', '')}'>"
      
      divToInsert = ""
      for refer in refers
        if parseInt(refer.Index) is parseInt(indexStr.replace("#", ""))
          referContent = "#{refer.Author.Nickname}：#{refer.Content}"
          if refer.Content.length > 200
            referContent = refer.Content.substr(0, 200) + "..."
          divToInsert += "<div class='refercontent' data-refercontent='#{referContent}'></div>"
      str = str.replace "#{indexStr}", "#{preA}#{indexStr}</a>#{divToInsert}<p>"
  return str

ReplaceMentionToLink = (str)->
  str = "<p>#{str}</p>" if str.indexOf("<p>") isnt 0
  mentionindexes = str.match(/@(.*?)[\s|\n|\r]/g)
  if mentionindexes?
    for mentionStr in mentionindexes
      nickname = mentionStr.replace "@", ""
      str = str.replace "@#{nickname}", "</p><p>@</p><a href='/people/#{nickname}' class='mentionindex' target='blank'>#{nickname}</a><p>"
  return str

ReplaceLinkString = (str)->
  str = "<p>#{str}</p>"
  links = str.match(/(http:\/\/\S*)\s/g)
  links = links?.RemoveDuplicateElement()
  if links?
    for link in links
      reg = new RegExp link, "gi"
      str = str.replace reg, "</p><a href='#{link.Trim()}' target='blank'>#{link.Trim()}</a>#{link.charAt(link.length-1)}<p>"
  return str

ReplaceBookTitleToString = (str)->
  str = "<p>#{str}</p>" if str.indexOf("<p>") isnt 0
  booktitles = str.match(/《(.*?)》/g)
  if booktitles?
    for booktitle in booktitles
      bookname = booktitle.replace("《", "").replace("》", "")
      str = str.replace "《#{bookname}》", "</p>《<a href='/search?q=#{bookname}' class='booktitle' target='blank'>#{bookname}</a>》<p>"
  return str

$.fn.InsertLinkIntoElement = (refers)->
  element = $(this)
  textStr = element.text().replace(/</g, "&lt;").replace(/>/g, "&gt;")
  str = ReplaceLinkString textStr
  str = ReplaceMentionToLink str
  str = ReplaceBookTitleToString str
  str = ReplaceReferToLink str, refers

  element.html str

  element.children("p").each (index)->
    $(this).text $(this).html().Escape2Html()
    $(this).contents().unwrap()
    return 

  if str is textStr
    element.text element.html()

  element.find(".refercontent").each (index)->
    $(this).text $(this).data "refercontent"
    return 
  return

$.fn.TextWithoutReferContent = ()->
  element = $(this)
  str = element.text()
  element.find(".refercontent").each (index)->
    str = str.replace $(this).text(), ""
    return
  return str

IsUsernameMentioned = (content, username)->
  str = "@#{username}"
  return -1 if not content?
  return content.indexOf str

FormatNowTime = ()->
  now = new Date()
  return "#{now.getFullYear()}-#{now.getMonth()+1}-#{now.getDate()}&nbsp;#{now.getHours()}:#{now.getMinutes()}:#{now.getSeconds()}"

ScrollToElement = (element)->
  y = element.offset().top
  $(document).scrollTop y - 50
  return

$(document).ready (event)->
  sys = {}
  ua = navigator.userAgent.toLowerCase();
  if (window.ActiveXObject)
    sys.ie = ua.match(/msie ([\d.]+)/)[1]

  if parseFloat(sys.ie) < 8.0
    location.href = "/upgradebrowser"

  $(window).scroll (event)->
    if $(window).scrollTop() > 0
      $(".backToTop").fadeIn()
    else
      $(".backToTop").fadeOut()
    return

  $(".backToTop").unbind("click").click (event)->
    $(window).scrollTop 0
    return
  return

# END OF FILE