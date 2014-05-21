// Generated by CoffeeScript 1.7.1
var GetToken, IsUsernameMentioned, PullToRefresh, RequestAjax, RequestAjaxWithParam, autoTextarea, getQueryString,
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

RequestAjax = function(type, url, data, successCallback, failCallback, timeoutCallback, beforeAction, afterAction, dontAlertOnStatusCode, async, shouldSpin) {
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
    timeoutCallback: timeoutCallback,
    beforeAction: beforeAction,
    afterAction: afterAction,
    dontAlertOnStatusCode: dontAlertOnStatusCode,
    async: async,
    shouldSpin: shouldSpin
  };
  if (window.localStorage.getItem("token")) {
    options.data.csrf_token = window.localStorage.getItem("token");
    RequestAjaxWithParam(options);
  } else {
    GetToken(options);
  }
};

GetToken = function(options) {
  RequestAjaxWithParam({
    type: "GET",
    url: "/token",
    successCallback: (function(resData) {
      window.localStorage.setItem("token", resData.Data);
      options.data.csrf_token = resData.Data;
      RequestAjaxWithParam(options);
    }),
    failCallback: null
  });
};

RequestAjaxWithParam = function(options) {
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
          navigator.notification.alert((_ref4 = data.ErrorMsg) != null ? _ref4 : "网络发生故障，请稍后重新尝试");
        }
      }
    }),
    dataType: "json",
    timeout: timeoutInterval,
    error: (function(jqXHR, textStatus, errorThrown) {
      navigator.notification.alert("加载失败，请重试", (function() {
        RequestAjaxWithParam(options);
      }), "提示", "重试");
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

$(document).on("deviceready", function() {
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
});

IsUsernameMentioned = function(content, username) {
  var str;
  str = "@" + username;
  if (content == null) {
    return -1;
  }
  return content.indexOf(str);
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
    window.zeroY = null;
  });
  $("body").unbind("touchmove").on("touchmove", function(event) {
    event.preventDefault();
    window.lastY = event.originalEvent.touches[0].screenY;
    if ((window.lastY - window.startY) > 60) {
      window.needRefresh = true;
    } else {
      window.needRefresh = false;
    }
    $("body").scrollTop(window.startY - window.lastY + window.startYOffset);
    if ($("body").scrollTop() <= 0) {
      if (window.lastY - window.startY < 0) {
        return;
      }
      if (window.zeroY != null) {
        $(".actionbar .pullbar").width($(window).width() * ($(window).width() / 60) * (window.lastY - window.zeroY) / $(window).height());
        $(".actionbar .pullbar").css("left", ($(window).width() - $(".actionbar .pullbar").width()) / 2);
      } else {
        window.zeroY = window.lastY;
      }
    }
  });
  $("body").unbind("touchend").on("touchend", function(event) {
    if (window.needRefresh === true && $(".actionbar .pullbar").width() >= $(window).width()) {
      location.reload();
    }
    $(".actionbar .pullbar").width(0);
  });
};
