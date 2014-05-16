// Generated by CoffeeScript 1.7.1
var DidFailSaveReadingStatus, DidGetComment, DidSaveReadingStatus, PostMarkAjaxRequest, SaveReadingStatus;

$(document).on("deviceready", function() {
  var actionbar;
  actionbar = template("public/ActionBar");
  $(".container").before(actionbar());
  $(".spinner").remove();
  $(".actionbar .channel").addClass("hide");
  $(".actionbar .slide-menu").addClass("hide");
  $(".actionbar .write").removeClass("hide");
  $(".actionbar .page-title").text("");
  $(".actionbar").children(".center").css("left", ($(window).width() - $(".actionbar .center").children(".page-title").width()) / 2);
  window.status = getQueryString("status");
  window.bookid = getQueryString("bookid");
  $("textarea").height($(window).height() - 260);
  $(".button.post").unbind("tap").on("tap", function(event) {
    if ($(this).attr("disabled")) {
      return;
    }
    SaveReadingStatus(window.status, event);
  });
  $(".button.cancel").unbind("click").on("click", function(event) {
    window.history.back();
  });
  $(".actionbar .write").unbind("click").on("click", function(event) {
    var shortLocation;
    shortLocation = location.href;
    location.href = shortLocation.replace("Comment", "Review");
  });
  RequestAjax("GET", "/mj/comment/write/" + window.bookid, {}, DidGetComment, null, null);
});

DidGetComment = function(data, rawData) {
  $("textarea").val(data.Data.content);
  $(".ratingStar").data("score", data.Data.score);
  $(".ratingStar").raty({
    score: data.Data.score,
    halfShow: false,
    starOff: 'http://shanpowbookcover.qiniudn.com/star-off.png',
    starOn: 'http://shanpowbookcover.qiniudn.com/star-on.png',
    size: 16,
    click: (function(score, evt) {
      $(this).data("score", score);
    })
  });
};

SaveReadingStatus = function(statusCode, event) {
  var data, _ref, _ref1;
  $(event != null ? event.target : void 0).text("正在发布...");
  $(event != null ? event.target : void 0).attr("disabled", true);
  data = {
    markType: statusCode,
    score: parseInt((_ref = $(".ratingStar").data("score")) != null ? _ref : 0),
    content: (_ref1 = $("textarea").val()) != null ? _ref1 : ""
  };
  PostMarkAjaxRequest("mark", "POST", data, (function() {
    DidSaveReadingStatus(statusCode);
  }), (function() {
    DidFailSaveReadingStatus();
  }));
};

DidSaveReadingStatus = function(data, rawData) {
  $(".button.post").text("发布");
  $(".button.post").attr("disabled", false);
  navigator.notification.alert("评论已经发布成功！", (function() {
    return window.history.back();
  }), "", "好的");
};

DidFailSaveReadingStatus = function(data, rawData) {};

PostMarkAjaxRequest = function(command, type, data, successCallback, failCallback) {
  data.isShareToQQ = false;
  data.isShareToWeibo = false;
  RequestAjax(type, "/book/" + window.bookid + "/" + command, data, DidSaveReadingStatus, DidFailSaveReadingStatus, null);
};
