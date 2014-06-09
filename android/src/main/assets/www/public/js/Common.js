// Generated by CoffeeScript 1.7.1
var AddUrlToLocalStorage, DidGetUnreadCount, GetToken, GetUnreadMessageCount, IsUsernameMentioned, PullToRefresh, RequestAjax, RequestDataWithParam, TimeStamp, autoTextarea, getQueryString,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

window.scoreHints = ['难看', '不好看', '一般', '好书', '神作'];

window.scoreNoRatedMsg = "尚无评分";

getQueryString = function(name) {
  var r, reg, url;
  reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  url = decodeURI(window.location.search, "UTF-8");
  r = url.substr(1).match(reg);
  if (r !== null) {
    return escape(r[2]);
  }
  return null;
};

RequestAjax = function(type, url, data, successCallback, failCallback, beforeAction, afterAction, dontAlertOnStatusCode, async, shouldSpin) {
  var options, rawData;
  rawData = {
    Path: url,
    Data: data
  };
  options = {
    type: type,
    url: url,
    data: data,
    successCallback: successCallback,
    failCallback: failCallback,
    beforeAction: beforeAction,
    afterAction: afterAction,
    dontAlertOnStatusCode: dontAlertOnStatusCode,
    async: async,
    shouldSpin: shouldSpin
  };
  if (window.localStorage.getItem("token")) {
    options.data.csrf_token = window.localStorage.getItem("token");
    RequestDataWithParam(options);
  } else {
    GetToken(options);
  }
};

GetToken = function(options) {
  RequestDataWithParam({
    type: "GET",
    url: "/token",
    successCallback: (function(resData) {
      window.localStorage.setItem("token", resData.Data);
      options.data.csrf_token = resData.Data;
      RequestDataWithParam(options);
    }),
    failCallback: null
  });
};

RequestDataWithParam = function(options) {
  var rawData, shouldSpin, timeoutInterval, _ref, _ref1, _ref2, _ref3;
  timeoutInterval = 10000;
  shouldSpin = (_ref = options.shouldSpin) != null ? _ref : true;
  rawData = {
    Path: options.url,
    Data: options.data
  };
  $.ajax({
    async: (_ref1 = options.async) != null ? _ref1 : true,
    type: (_ref2 = options.type) != null ? _ref2 : "GET",
    url: "http://www.shanpow.com" + (encodeURI((_ref3 = options.url) != null ? _ref3 : "/")),
    cache: false,
    data: options.data,
    statusCode: {
      400: (function() {
        if (!options.dontAlertOnStatusCode) {
          return navigator.notification.alert("400: 请求不正确");
        }
      }),
      404: (function() {
        if (!options.dontAlertOnStatusCode) {
          return navigator.notification.alert("404: 该资源不存在");
        }
      }),
      500: (function() {
        if (!options.dontAlertOnStatusCode) {
          return navigator.notification.alert("500: 服务器遇到一个内部错误，请稍等一会再试试");
        }
      }),
      403: (function() {
        return GetToken(options);
      })
    },
    success: (function(data) {
      var _ref4;
      (function() {
        return navigator.notification.activityStop();
      });
      cordova.exec((function(data) {
        return console.log(data);
      }), null, "CachedIOHelper", "set", [options.url, data]);
      if (data.Result === true) {
        if (options.successCallback != null) {
          options.successCallback(data, rawData);
        } else {
          location.reload();
        }
      } else {
        if (options.failCallback != null) {
          options.failCallback(data, rawData);
        } else {
          navigator.notification.alert((_ref4 = data.ErrorMsg) != null ? _ref4 : "网络发生故障，您可以下拉刷新页面以重试", null, "错误");
        }
      }
    }),
    dataType: "json",
    timeout: timeoutInterval,
    error: (function(jqXHR, textStatus, errorThrown) {
      if (options.type === "GET") {
        navigator.notification.alert("加载失败，请重试", (function() {
          RequestDataWithParam(options);
        }), "提示", "重试");
      }
      if (options.failCallback != null) {
        options.failCallback(null, rawData);
      }
    }),
    beforeSend: (function(jqXHR, settings) {
      if (shouldSpin) {
        navigator.notification.activityStart("", "正在加载...");
        setTimeout((function() {
          navigator.notification.activityStop();
        }), timeoutInterval);
      }
      if (typeof options.beforeAction === "function") {
        options.beforeAction(jqXHR, settings);
      }
    }),
    complete: (function(jqXHR, textStatus) {
      setTimeout((function() {
        return navigator.notification.activityStop();
      }), 200);
      if (typeof options.afterAction === "function") {
        options.afterAction(jqXHR, textStatus);
      }
    })
  });
};

IsUsernameMentioned = function(content, username) {
  var str;
  str = "@" + username;
  if (content == null) {
    return -1;
  }
  return content.indexOf(str);
};

AddUrlToLocalStorage = function(url) {
  var urls;
  urls = jQuery.parseJSON(localStorage.getItem("urls"));
  if (urls == null) {
    urls = new Array();
  }
  urls.push(url);
  localStorage.setItem("urls", JSON.stringify(urls));
};

autoTextarea = function(elem, extra, maxHeight) {
  var addEvent, change, getStyle, isFirefox, isOpera, minHeight;
  extra = extra || 20;
  isFirefox = !!document.getBoxObjectFor || __indexOf.call(window, 'mozInnerScreenX') >= 0;
  isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera');
  addEvent = function(type, callback) {
    if (elem.addEventListener) {
      return elem.addEventListener(type, callback, false);
    } else {
      return elem.attachEvent('on' + type, callback);
    }
  };
  getStyle = elem.currentStyle ? (function(name) {
    var rect, val;
    val = elem.currentStyle[name];
    if (name === 'height' && val.search(/px/i) !== 1) {
      rect = elem.getBoundingClientRect();
      return rect.bottom - rect.top - parseFloat(getStyle('paddingTop')) - parseFloat(getStyle('paddingBottom')) + 'px';
    }
    return val;
  }) : (function(name) {
    return getComputedStyle(elem, null)[name];
  });
  minHeight = parseFloat(getStyle('height'));
  elem.style.maxHeight = elem.style.resize = 'none';
  change = function() {
    var height, padding, scrollTop, style;
    padding = 0;
    style = elem.style;
    if (elem._length === elem.value.length) {
      return;
    }
    elem._length = elem.value.length;
    if (!isFirefox && !isOpera) {
      padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
    }
    scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    elem.style.height = minHeight + 'px';
    if (elem.scrollHeight > minHeight) {
      if (maxHeight && elem.scrollHeight > maxHeight) {
        height = maxHeight - padding;
        style.overflowY = 'auto';
      } else {
        height = elem.scrollHeight - padding;
        style.overflowY = 'hidden';
      }
      style.height = height + extra + 'px';
      scrollTop += parseInt(style.height) - elem.currHeight;
      document.body.scrollTop = scrollTop;
      document.documentElement.scrollTop = scrollTop;
      return elem.currHeight = parseInt(style.height);
    }
  };
  addEvent('propertychange', change);
  addEvent('input', change);
  addEvent('focus', change);
  return change();
};

PullToRefresh = function() {
  $("body").unbind("touchstart").on("touchstart", function(event) {
    window.startY = event.originalEvent.touches[0].screenY;
    window.startYOffset = $("body").scrollTop();
    return window.zeroY = null;
  });
  $("body").unbind("touchmove").on("touchmove", function(event) {
    window.lastY = event.originalEvent.touches[0].screenY;
    if ($("body").scrollTop() <= 0) {
      if (window.lastY - window.startY < 0) {
        return;
      }
      event.preventDefault();
      if (window.zeroY != null) {
        $(".actionbar .pullbar").width($(window).width() * (window.lastY - window.zeroY) / ($(window).height() * 0.4));
        $(".actionbar .pullbar").css("left", ($(window).width() - $(".actionbar .pullbar").width()) / 2);
        $(".actionbar .center").addClass("hide");
        $(".actionbar .loading").removeClass("hide");
        $(".actionbar").find(".loading").css("left", ($(window).width() - $(".actionbar .center").find(".pullingText").width()) / 2);
        if ($(".actionbar .pullbar").width() >= $(window).width()) {
          return $(".actionbar .loading .pullingText").text("松开以刷新");
        } else {
          return $(".actionbar .loading .pullingText").text("下拉刷新...");
        }
      } else {
        return window.zeroY = window.lastY;
      }
    }
  });
  return $("body").unbind("touchend").on("touchend", function(event) {
    if ($(".actionbar .pullbar").width() >= $(window).width()) {
      $("body").html("");
      $(document).trigger("deviceready");
    }
    $(".actionbar .pullbar").width(0);
    $(".actionbar .center").removeClass("hide");
    return $(".actionbar .loading").addClass("hide");
  });
};

TimeStamp = function() {
  var date;
  date = new Date();
  return Number(date);
};

$.fn.MoveToEnd = function() {
  var len, obj, sel;
  obj = $(this)[0];
  obj.focus();
  len = 0;
  if (obj.value != null) {
    len = obj.value.length;
  } else {
    len = obj.textContent.length;
  }
  if (document.selection) {
    sel = obj.createTextRange();
    sel.moveStart('character', len);
    sel.collapse();
    sel.select();
  } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
    obj.selectionStart = obj.selectionEnd = len;
  }
};

GetUnreadMessageCount = function() {
  cordova.exec(DidGetUnreadCount, null, "CachedIOHelper", "get", ["MK_UNREAD_NOTIFICATION_COUNT"]);
};

DidGetUnreadCount = function(data) {
  localStorage.setItem("unreadMsgCount", "" + data.MK_UNREAD_NOTIFICATION_COUNT);
  $(document).trigger("didGetUnreadCount");
};

$(document).on("deviceready", function() {
  var getUnreadCountTimer;
  $(document).on("click tap", ".actionbar .back", null, function() {
    return window.history.back(1);
  });
  $(document).on("backbutton", function() {
    window.history.back(1);
  });
  $(document).on("click", ".left-button .slide-menu", null, (function() {
    cordova.exec(null, null, "ActivityLauncher", "toggleSlidingMenu", []);
  }));
  PullToRefresh();
  clearInterval(getUnreadCountTimer);
  getUnreadCountTimer = setInterval((function() {
    return GetUnreadMessageCount();
  }), 10000);
  GetUnreadMessageCount();
});
