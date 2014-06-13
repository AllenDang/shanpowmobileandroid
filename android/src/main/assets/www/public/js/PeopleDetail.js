// Generated by CoffeeScript 1.7.1
var DidCreateConversation, DidGetPeopleDetailData, FailGetPeopleDetailData;

$(document).on("deviceready", function() {
  window.nickname = getQueryString("nickname");
  RequestAjax("GET", "/mj/people/" + (unescape(window.nickname)), {}, DidGetPeopleDetailData, FailGetPeopleDetailData);
});

DidGetPeopleDetailData = function(data, rawData) {
  var htmlString, peopledetail;
  peopledetail = template("People/Detail");
  htmlString = peopledetail(data.Data);
  if (htmlString.search("Template Error") < 0) {
    $(".container").replaceWith(htmlString);
  } else {
    ShowLoadingError();
    return;
  }
  if (data.Data.IsMySelf) {
    $(".actionbar .message-center").removeClass("hide");
    $(".actionbar .side-menu").removeClass("hide");
    localStorage.SelfAvatarUrl = data.Data.UserAvatarUrl;
    localStorage.SelfNickname = data.Data.Nickname;
  } else {
    $(".actionbar .follow").removeClass("hide");
  }
  $(".actionbar .page-title").text(unescape(window.nickname));
  CenterTitle();
  $(".book").each(function(index) {
    $(this).find(".bookCover").height($(this).find(".bookCover").width() * 4 / 3);
  });
  $(".sendDirectMessage").unbind("click").on("click", function(event) {
    RequestAjax("POST", "/mj/people/conversation/create", {
      name: unescape(window.nickname)
    }, DidCreateConversation, null);
  });
  $(".actionbar .follow").unbind("click").click(function(event) {
    RequestAjax("POST", "/people/" + data.Data.Nickname + "/follow", {}, null, null);
  });
  $("#logout").unbind("click").click(function(event) {
    cordova.exec(null, null, "ActivityLauncher", "logout", []);
  });
  $(document).unbind("didGetUnreadCount").on("didGetUnreadCount", function() {
    if (parseInt(localStorage.getItem("unreadMsgCount")) > 0) {
      $(".actionbar .message-center").find("span.badge").text(localStorage.getItem("unreadMsgCount"));
    } else {
      $(".actionbar .message-center").find("span.badge").text("");
    }
  });
};

FailGetPeopleDetailData = function(data, rawData) {};

DidCreateConversation = function(data, rawData) {
  location.href = "file:///android_asset/www/DirectMessage/Conversation.html?id=" + data.Data + "&other=" + (unescape(window.nickname));
};
