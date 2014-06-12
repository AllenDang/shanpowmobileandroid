// Generated by CoffeeScript 1.7.1
var AddUrlToLocalStorage, CenterTitle, DidGetUnreadCount, GetBack, GetToken, GetUnreadMessageCount, IsUsernameMentioned, PullToRefresh, RequestAjax, RequestDataWithParam, TimeStamp, autoTextarea, getQueryString,
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

RequestAjax = function(type, url, data, successCallback, failCallback, shouldSpin) {
  var options, rawData;
  rawData = {
    Path: url,
    Data: data
  };
  options = {
    type: type,
    url: url,
    data: data != null ? data : {},
    successCallback: successCallback,
    failCallback: failCallback,
    shouldSpin: shouldSpin
  };
  if (localStorage.shouldFetchDataFromCache === "YES") {
    cordova.exec((function(data) {
      successCallback(data, rawData);
      return localStorage.shouldFetchDataFromCache = "NO";
    }), null, "CachedIOHelper", "get", ["" + type + ":" + url]);
  } else {
    if (window.localStorage.getItem("token")) {
      options.data.csrf_token = window.localStorage.getItem("token");
      RequestDataWithParam(options);
    } else {
      GetToken(options);
    }
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
  var rawData, shouldShowSpinner, timeoutInterval, _ref, _ref1, _ref2;
  timeoutInterval = 10000;
  shouldShowSpinner = (_ref = options.shouldSpin) != null ? _ref : true;
  rawData = {
    Path: options.url,
    Data: options.data
  };
  $.ajax({
    async: true,
    type: (_ref1 = options.type) != null ? _ref1 : "GET",
    url: "http://www.shanpow.com" + (encodeURI((_ref2 = options.url) != null ? _ref2 : "/")),
    cache: false,
    data: options.data,
    statusCode: {
      403: (function() {
        return GetToken(options);
      })
    },
    success: (function(data) {
      var _ref3, _ref4;
      setTimeout((function() {
        return navigator.notification.activityStop();
      }), 200);
      if ((_ref3 = window.shouldCache) != null ? _ref3 : true) {
        cordova.exec((function(data) {}), null, "CachedIOHelper", "set", ["" + options.type + ":" + options.url, data]);
      }
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
          return RequestDataWithParam(options);
        }), "提示", "重试");
      }
      if (options.failCallback != null) {
        options.failCallback(null, rawData);
      }
    }),
    beforeSend: (function(jqXHR, settings) {
      if (shouldShowSpinner) {
        navigator.notification.activityStart("", "正在加载...");
        setTimeout((function() {
          return navigator.notification.activityStop();
        }), timeoutInterval);
      }
    }),
    complete: (function(jqXHR, textStatus) {
      setTimeout((function() {
        return navigator.notification.activityStop();
      }), 200);
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
        $(".actionbar .title-section").addClass("hide");
        $(".actionbar .loading").removeClass("hide");
        CenterTitle();
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
      window.pullToRefresh = true;
      $("body").children().not(".actionbar").remove();
      $(".actionbar").after("<div class='spinner'></div>");
      $(document).trigger("deviceready");
    }
    $(".actionbar .pullbar").width(0);
    $(".actionbar .title-section").removeClass("hide");
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

GetBack = function() {
  localStorage.shouldFetchDataFromCache = "YES";
  window.history.back();
};

CenterTitle = function() {
  var allWidth;
  allWidth = 0;
  $(".actionbar .actionbar-section").each(function(index) {
    if (!$(this).hasClass("hide")) {
      allWidth += $(this).width();
    }
  });
  $(".actionbar").children(".center").not(".hide").css("left", ($(".actionbar").width() - allWidth) / 2);
};

$(document).on("deviceready", function() {
  var actionbar, getUnreadCountTimer, _ref;
  if ((_ref = window.pullToRefresh) != null ? _ref : false) {
    window.pullToRefresh = false;
    return;
  }
  actionbar = template("public/ActionBar");
  $("body").prepend(actionbar());
  $(document).on("click tap", ".actionbar .back", (function() {
    GetBack();
  }));
  $(document).on("backbutton", function() {
    GetBack();
  });
  $(document).on("click", ".left-button .slide-menu", (function() {
    if ($(".actionbar .slide-menu").find(".badge").text() === "") {
      cordova.exec(null, null, "ActivityLauncher", "toggleSlidingMenu", []);
    } else {
      location.href = "file:///android_asset/www/MessageCenter/Index.html";
    }
  }));
  PullToRefresh();
  clearInterval(getUnreadCountTimer);
  getUnreadCountTimer = setInterval((function() {
    return GetUnreadMessageCount();
  }), 10000);
  GetUnreadMessageCount();
});
