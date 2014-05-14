// Generated by CoffeeScript 1.7.1
var IsUsernameMentioned, RequestAjax, RequestAjaxWithParam, getQueryString;

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

RequestAjax = function(type, url, data, successCallback, failCallback, timeoutCallback, beforeAction, afterAction, dontAlertOnStatusCode, async) {
  var options, rawData;
  rawData = {
    Path: url,
    Data: data
  };
  if (window.localStorage.getItem("token")) {
    data.csrf_token = window.localStorage.getItem("token");
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
    };
    RequestAjaxWithParam(options);
  } else {
    RequestAjaxWithParam({
      type: "GET",
      url: "http://www.shanpow.com/token",
      successCallback: (function(resData) {
        window.localStorage.setItem("token", resData.Data);
        data.csrf_token = resData.Data;
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
        };
        RequestAjaxWithParam(options);
      }),
      failCallback: failCallback
    });
  }
};

RequestAjaxWithParam = function(options) {
  var rawData, _ref, _ref1, _ref2;
  rawData = {
    Path: options.url,
    Data: options.data
  };
  $.ajax({
    async: (_ref = options.async) != null ? _ref : true,
    type: (_ref1 = options.type) != null ? _ref1 : "GET",
    url: "http://www.shanpow.com" + (encodeURI((_ref2 = options.url) != null ? _ref2 : "/")),
    cache: false,
    data: options.data,
    statusCode: {
      400: (function() {
        if (!options.dontAlertOnStatusCode) {
          return alert("400: 请求不正确");
        }
      }),
      404: (function() {
        if (!options.dontAlertOnStatusCode) {
          return alert("404: 该资源不存在");
        }
      }),
      500: (function() {
        if (!options.dontAlertOnStatusCode) {
          return alert("500: 服务器遇到一个内部错误，请稍等一会再试试");
        }
      })
    },
    success: (function(data) {
      var _ref3;
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
          alert((_ref3 = data.ErrorMsg) != null ? _ref3 : "网络发生故障，请稍后重新尝试");
        }
      }
    }),
    dataType: "json",
    timeout: 4000,
    error: (function(jqXHR, textStatus, errorThrown) {
      if (textStatus === "timeout") {
        if (options.timeoutCallback != null) {
          options.timeoutCallback(errorThrown);
        } else {
          if (typeof options.failCallback === "function") {
            options.failCallback(data, rawData);
          }
        }
      }
      if (textStatus === "error") {
        if (typeof options.failCallback === "function") {
          options.failCallback(errorThrown);
        }
      }
    }),
    beforeSend: (function(jqXHR, settings) {
      if (typeof options.beforeAction === "function") {
        options.beforeAction(jqXHR, settings);
      }
    }),
    complete: (function(jqXHR, textStatus) {
      if (typeof options.afterAction === "function") {
        options.afterAction(jqXHR, textStatus);
      }
    })
  });
};

$(document).ready(function() {
  $(document).on("click tap", ".actionbar .back", null, function() {
    return window.history.back(1);
  });
});

IsUsernameMentioned = function(content, username) {
  var str;
  str = "@" + username;
  if (content == null) {
    return -1;
  }
  return content.indexOf(str);
};
