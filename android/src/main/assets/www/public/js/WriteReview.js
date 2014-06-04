// Generated by CoffeeScript 1.7.1
var DidFailSaveReadingStatus, DidGetComment, DidSaveReadingStatus, EnableButton, PostMarkAjaxRequest, SaveReadingStatus, WriteComment, WriteReview;

$(document).on("deviceready", function() {
  var actionbar;
  actionbar = template("public/ActionBar");
  $(".container").before(actionbar());
  $(".spinner").remove();
  $(".actionbar .channel").addClass("hide");
  $(".actionbar .slide-menu").addClass("hide");
  $(".actionbar .write").removeClass("hide");
  $(".actionbar .write .left").removeClass("active");
  $(".actionbar .write .right").addClass("active");
  $(".actionbar .page-title").text("写书评");
  $(".actionbar").children(".center").css("left", ($(window).width() - $(".actionbar .center").children(".page-title").width()) / 2);
  window.status = getQueryString("status");
  window.bookid = getQueryString("bookid");
  window.category = unescape(getQueryString("category"));
  window.bookcover = getQueryString("bookcover");
  window.isforman = getQueryString("isforman");
  window.booktitle = unescape(getQueryString("booktitle"));
  $("textarea").height($(window).height() - $("input").height() - $(".actionbar").height() - 128);
  $(".button.post").unbind("tap").on("tap", function(event) {
    if ($(this).attr("disabled")) {
      return;
    }
    SaveReadingStatus(window.status, event);
  });
  RequestAjax("GET", "/mj/review/write/" + window.bookid, {}, DidGetComment, null, null);
  $(document).on("click tap", ".actionbar .back", null, (function(event) {
    event.preventDefault();
    return window.history.go(-2);
  }));
  $(document).on("backbutton", function(event) {
    event.preventDefault();
    window.history.go(-2);
  });
  $(".button.cancel").unbind("click").on("click", function(event) {
    window.history.go(-2);
  });
});

DidGetComment = function(data, rawData) {
  $("input.title").val(data.Data.Title);
  $("textarea").val(data.Data.Content);
  $(".ratingStar").data("score", data.Data.Score);
  $(".ratingStar").raty({
    score: function() {
      return $(this).data("score");
    },
    halfShow: false,
    starOff: '../public/img/Star_Big_Off_Green.png',
    starOn: '../public/img/Star_Big_On_Green.png',
    size: 16,
    click: (function(score, evt) {
      $(this).data("score", score);
    })
  });
};

SaveReadingStatus = function(statusCode, event) {
  $(event != null ? event.target : void 0).text("正在发送...");
  $(event != null ? event.target : void 0).attr("disabled", true);
  if ($("input.title").val() === "" || $("input.title").val().length <= 0) {
    WriteComment(statusCode);
  } else {
    WriteReview(statusCode);
  }
};

WriteComment = function(statusCode) {
  var data, _ref, _ref1;
  data = {
    markType: statusCode,
    score: parseInt((_ref = $(".ratingStar").data("score")) != null ? _ref : 0),
    content: (_ref1 = $("textarea").val()) != null ? _ref1 : ""
  };
  PostMarkAjaxRequest("mark", "POST", data, (function() {
    DidSaveReadingStatus(statusCode);
  }), (function() {
    EnableButton();
    DidFailSaveReadingStatus();
  }));
};

WriteReview = function(statusCode) {
  var data, _ref, _ref1, _ref2;
  data = {
    reviewTitle: (_ref = $("input.title").val()) != null ? _ref : "",
    reviewContent: (_ref1 = $("textarea").val()) != null ? _ref1 : "",
    bookTitle: window.booktitle,
    score: parseInt((_ref2 = $(".ratingStar").data("score")) != null ? _ref2 : 0),
    markType: statusCode,
    bookImageUrl: window.bookcover,
    bookCategory: window.category,
    bookForMan: window.isforman,
    isShareToQQ: false,
    isShareToWeibo: false
  };
  RequestAjax("POST", "/book/" + window.bookid + "/addreview", data, DidSaveReadingStatus, DidFailSaveReadingStatus, null);
};

DidSaveReadingStatus = function(data, rawData) {
  EnableButton();
  navigator.notification.alert("评论已经发布成功！", (function() {
    return window.history.back();
  }), "", "好的");
};

DidFailSaveReadingStatus = function(data, rawData) {
  EnableButton();
};

PostMarkAjaxRequest = function(command, type, data, successCallback, failCallback) {
  data.isShareToQQ = false;
  data.isShareToWeibo = false;
  RequestAjax(type, "/book/" + window.bookid + "/" + command, data, successCallback, failCallback, null);
};

EnableButton = function() {
  $(".button.post").text("发送");
  $(".button.post").attr("disabled", false);
};
