// Generated by CoffeeScript 1.7.1
var DidGetDirectMessageData, DidGetInitData, DidGetResponseData, DidGetUpdateData, DidMarkAllResponseAsRead, DidMarkAllUpdateAsRead, GetMessages, GetResponses, GetUpdates, InitRequest, MarkMsgAsRead, SwitchToDirectMessage, SwitchToResponse, SwitchToUpdate;

$(document).on("deviceready", function() {
  var main;
  $(".actionbar .page-title").text("消息中心");
  CenterTitle();
  main = template("MessageCenter/Index");
  $(".container").replaceWith(main());
  $(".tab").each(function() {
    $(this).unbind("click").on("click", function(event) {
      if (!$(this).hasClass("active")) {
        $(".active").removeClass("active");
        $(this).addClass("active");
        $(".payload").html("");
        switch ($(this).attr("id")) {
          case "directmessage":
            SwitchToDirectMessage();
            break;
          case "response":
            SwitchToResponse();
            break;
          case "update":
            SwitchToUpdate();
        }
      }
    });
  });
  InitRequest();
});

$(document).on("click tap", "a", function() {
  MarkMsgAsRead($(this));
});

InitRequest = function() {
  RequestAjax("GET", "/mj/people/conversations/tab", {}, DidGetInitData, null);
};

DidGetInitData = function(data, rawData) {
  DidGetDirectMessageData({
    Data: data.Data.Conversations
  }, null);
  if (parseInt(data.Data.MessageUnreadSum) > 0) {
    $("#directmessage").find(".newMsgIndicator").removeClass("hide");
  }
  if (parseInt(data.Data.ResponseUnreadSum) > 0) {
    $("#response").find(".newMsgIndicator").removeClass("hide");
  }
  if (parseInt(data.Data.UpdateUnreadSum) > 0) {
    $("#update").find(".newMsgIndicator").removeClass("hide");
  }
  window.responseUnreadSum = data.Data.ResponseUnreadSum;
  window.updateUnreadSum = data.Data.UpdateUnreadSum;
};

SwitchToDirectMessage = function() {
  $(".payload").html("");
  GetMessages();
};

GetMessages = function() {
  RequestAjax("GET", "/mj/people/conversations", {}, DidGetDirectMessageData, null);
};

DidGetDirectMessageData = function(data, rawData) {
  var directmessage, _ref, _ref1;
  if (parseInt((_ref = (_ref1 = data.Data) != null ? _ref1.MessagesUnreadSum : void 0) != null ? _ref : 0) > 0) {
    $("#directmessage").find(".newMsgIndicator").removeClass("hide");
  }
  directmessage = template("MessageCenter/DirectMessage");
  $(".payload").html(directmessage(data));
};

SwitchToResponse = function() {
  $(".payload").html("");
  GetResponses();
  if (!$("#response").find(".newMsgIndicator").hasClass("hide")) {
    RequestAjax("POST", "/mj/msgcenter/markasread/response/all", {}, DidMarkAllResponseAsRead, null, false);
  }
};

GetResponses = function() {
  RequestAjax("GET", "/mj/msgcenter/response", {}, DidGetResponseData, null);
};

DidGetResponseData = function(data, rawData) {
  var responses, _ref, _ref1;
  if (parseInt((_ref = (_ref1 = data.Data) != null ? _ref1.MessagesUnreadSum : void 0) != null ? _ref : 0) > 0) {
    $("#response").find(".newMsgIndicator").removeClass("hide");
  }
  responses = template("MessageCenter/Response");
  $(".payload").html(responses(data.Data));
};

DidMarkAllResponseAsRead = function(data, rawData) {
  var newUnreadCount;
  newUnreadCount = parseInt(localStorage.getItem("unreadMsgCount")) - parseInt(window.responseUnreadSum);
  UpdateUnreadMessageCount(newUnreadCount);
  $("#response").find(".newMsgIndicator").addClass("hide");
};

SwitchToUpdate = function() {
  $(".payload").html("");
  GetUpdates();
  if (!$("#update").find(".newMsgIndicator").hasClass("hide")) {
    RequestAjax("POST", "/mj/msgcenter/markasread/update/all", {}, DidMarkAllUpdateAsRead, null, false);
  }
};

GetUpdates = function() {
  RequestAjax("GET", "/mj/msgcenter/update", {}, DidGetUpdateData, null);
};

DidGetUpdateData = function(data, rawData) {
  var update, _ref, _ref1;
  if (parseInt((_ref = (_ref1 = data.Data) != null ? _ref1.MessagesUnreadSum : void 0) != null ? _ref : 0) > 0) {
    $("#update").find(".newMsgIndicator").removeClass("hide");
  }
  update = template("MessageCenter/Update");
  $(".payload").html(update(data.Data));
};

DidMarkAllUpdateAsRead = function(data, rawData) {
  var newUnreadCount;
  newUnreadCount = parseInt(localStorage.getItem("unreadMsgCount")) - parseInt(window.updateUnreadSum);
  UpdateUnreadMessageCount(newUnreadCount);
  $("#update").find(".newMsgIndicator").addClass("hide");
};

MarkMsgAsRead = function(target) {
  var id, msg, _i, _len, _ref;
  id = target.closest(".msg").attr("id");
  if (target.closest(".msg").hasClass("dm")) {
    UpdateUnreadMessageCount(parseInt(localStorage.getItem("unreadMsgCount")) - 1);
    cordova.exec((function(data) {
      var dmData;
      return dmData = data;
    }), null, "CachedIOHelper", "get", ["GET:/mj/people/conversations"]);
    _ref = dmData.Data;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      msg = _ref[_i];
      if (msg.Id === id) {
        msg.IsNewMessages = false;
      }
    }
    cordova.exec((function(data) {}), null, "CachedIOHelper", "set", ["GET:/mj/people/conversations", dmData]);
  }
};
