// Generated by CoffeeScript 1.7.1
var DidGetDirectMessageData, DidGetResponseData, DidGetUpdateData, GetMessages, PositionUnreadIndicator, SwitchToDirectMessage, SwitchToResponse, SwitchToUpdate;

$(document).on("deviceready", function() {
  var main;
  $(".actionbar .page-title").text("消息中心");
  $(".actionbar").children(".center").css("left", ($(window).width() - $(".actionbar .center").children(".page-title").width()) / 2);
  main = template("MessageCenter/Index");
  $(".spinner").replaceWith(main());
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
  GetMessages();
  window.initClick = true;
});

GetMessages = function() {
  RequestAjax("GET", "/mj/people/conversations", {}, DidGetDirectMessageData, null);
  RequestAjax("GET", "/mj/msgcenter/response", {}, DidGetResponseData, null, null, null, null, null, false);
  RequestAjax("GET", "/mj/msgcenter/update", {}, DidGetUpdateData, null, null, null, null, null, false);
};

DidGetDirectMessageData = function(data, rawData) {
  if (parseInt(data.Data.MessagesUnreadSum) > 0) {
    $("#directmessage").find(".newMsgIndicator").removeClass("hide");
  }
  window.directMessageData = data;
  if (window.initClick) {
    SwitchToDirectMessage();
  }
};

SwitchToDirectMessage = function() {
  var directmessage;
  directmessage = template("MessageCenter/DirectMessage");
  $(".payload").html(directmessage(window.directMessageData));
  setTimeout(PositionUnreadIndicator, 10);
};

DidGetResponseData = function(data, rawData) {
  if (parseInt(data.Data.MessagesUnreadSum) > 0) {
    $("#response").find(".newMsgIndicator").removeClass("hide");
  }
  window.responseData = data.Data;
};

SwitchToResponse = function() {
  var responses;
  responses = template("MessageCenter/Response");
  $(".payload").html(responses(window.responseData));
};

DidGetUpdateData = function(data, rawData) {
  if (parseInt(data.Data.MessagesUnreadSum) > 0) {
    $("#update").find(".newMsgIndicator").removeClass("hide");
  }
  window.updateData = data.Data;
};

SwitchToUpdate = function() {
  var update;
  update = template("MessageCenter/Update");
  $(".payload").html(update(window.updateData));
};

PositionUnreadIndicator = function() {
  $(".unread-indicator").each(function(index) {
    var offsetTop;
    offsetTop = ($(this).closest(".msg").find("img").height() - $(this).height()) / 2;
    $(this).css("top", "" + offsetTop + "px");
  });
};
