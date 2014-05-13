// Generated by CoffeeScript 1.7.1
var DidFailPostResponse, DidGetBooklistResponseData, DidPostResponse, FailGetBooklistResponseData, RegisterResponseBtn;

$(document).ready(function() {
  var actionbar, booklistId;
  actionbar = template("public/ActionBar");
  $("body").html(actionbar());
  $(".actionbar .channel").addClass("hide");
  $(".actionbar .slide-menu").addClass("hide");
  booklistId = getQueryString("booklistid");
  RequestAjax("GET", "/mj/booklist/" + booklistId + "/response", {}, DidGetBooklistResponseData, FailGetBooklistResponseData);
});

DidGetBooklistResponseData = function(data, rawData) {
  var bookDetail;
  bookDetail = template("Booklist/Response");
  $(".spinner").replaceWith(bookDetail(data.Data));
  $(".actionbar .page-title").text("回复");
  $(".actionbar").children(".center").css("left", ($(window).width() - $(".actionbar .center").children(".page-title").width()) / 2);
  $("input").unbind("keyup").on("keyup", function(event) {
    var _ref;
    if (((_ref = $("input").val()) != null ? _ref.length : void 0) > 0) {
      $(".button").prop("disabled", false);
      $(".cancelInput").removeClass("hide");
    } else {
      $(".button").prop("disabled", true);
      $(".cancelInput").addClass("hide");
    }
  });
  $("button[type='submit']").unbind("click").on("click", function(event) {
    var _ref, _ref1;
    event.preventDefault();
    event.stopPropagation();
    if (((_ref = $(".sendResponseContent").val()) != null ? _ref.length : void 0) <= 0) {
      alert("请输入回复内容");
    } else {
      $(this).prop("disabled", true);
      window.responseContent = $("input").val();
      data = {
        content: (_ref1 = $("input").val()) != null ? _ref1 : "",
        authorId: $(".container").data("authorid")
      };
      RequestAjax("POST", "/booklist/" + ($(".container").data('id')) + "/addresponse", data, DidPostResponse, DidFailPostResponse, DidFailPostResponse);
    }
  });
  RegisterResponseBtn();
};

FailGetBooklistResponseData = function(data, rawData) {};

DidPostResponse = function(data) {
  var nickname, response, responseData;
  $("button").prop("disabled", false);
  $("input").val("");
  nickname = $(".container").data("nickname");
  responseData = {
    Id: "",
    Author: {
      Nickname: nickname,
      AvatarUrl: $(".container").data("avatar")
    },
    Content: window.responseContent,
    CreationTime: "1秒"
  };
  response = template("public/Response");
  $(".container").append(response(responseData));
  window.scrollTo(0, document.body.scrollHeight);
  RegisterResponseBtn();
};

DidFailPostResponse = function(data) {
  $("button").prop("disabled", false);
  alert(data.ErrorMsg);
};

RegisterResponseBtn = function() {
  $("a.responseBtn").each(function(index) {
    $(this).unbind("click").click(function(event) {
      var content, username;
      event.preventDefault();
      event.stopPropagation();
      username = $(this).closest(".response").find(".author a strong").text();
      content = $("input").val();
      if (IsUsernameMentioned(content, username) < 0) {
        $("input").val("@" + username + " " + content);
      }
      $("input").focus().MoveToEnd();
    });
  });
};
