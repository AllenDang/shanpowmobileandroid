// Generated by CoffeeScript 1.7.1
var DidFailPostResponse, DidGetResponseData, DidPostResponse, FailGetResponseData, RegisterResponseBtn;

$(document).on("deviceready", function() {
  var actionbar, articleId;
  actionbar = template("public/ActionBar");
  $("body").html(actionbar());
  $(".actionbar .channel").addClass("hide");
  $(".actionbar .slide-menu").addClass("hide");
  articleId = getQueryString("id");
  RequestAjax("GET", "/mj/article/" + articleId + "/response", {}, DidGetResponseData, FailGetResponseData);
});

DidGetResponseData = function(data, rawData) {
  var articleResponseMain;
  articleResponseMain = template("public/Responses");
  $(".spinner").replaceWith(articleResponseMain(data.Data));
  $(".actionbar .page-title").text("回复");
  $(".actionbar").children(".center").css("left", ($(window).width() - $(".actionbar .center").children(".page-title").width()) / 2);
  $("#submit").unbind("click").on("click", function(event) {
    var articleId, _ref, _ref1;
    event.preventDefault();
    event.stopPropagation();
    if (((_ref = $(".sendResponseContent").val()) != null ? _ref.length : void 0) <= 0) {
      alert("请输入回复内容");
    } else {
      $(this).prop("disabled", true);
      window.responseContent = $("#replyInput").val();
      data = {
        content: (_ref1 = $("#replyInput").val()) != null ? _ref1 : "",
        authorId: $(".container").data("authorid")
      };
      articleId = getQueryString("id");
      RequestAjax("POST", "/article/" + articleId + "/addresponse", data, DidPostResponse, DidFailPostResponse, DidFailPostResponse);
    }
  });
  RegisterResponseBtn();
};

FailGetResponseData = function(data, rawData) {};

DidPostResponse = function(data) {
  var nickname, response, responseData;
  $("#replyInput").val("").blur().focus();
  $("#submit").prop("disabled", true);
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
  $("#submit").prop("disabled", false);
};

RegisterResponseBtn = function() {
  $("a.responseBtn").each(function(index) {
    $(this).unbind("click").click(function(event) {
      var content, username;
      event.preventDefault();
      event.stopPropagation();
      username = $(this).closest(".response").find(".author a strong").text();
      content = $("#replyInput").val();
      if (IsUsernameMentioned(content, username) < 0) {
        $("#replyInput").val("@" + username + " " + content);
      }
      $("#replyInput").focus().MoveToEnd();
    });
  });
};
