// Generated by CoffeeScript 1.7.1
var DidFailPostResponse, DidGetBooklistResponseData, DidPostResponse, FailGetBooklistResponseData, PostResponse, RegisterResponseBtn;

$(document).on("deviceready", function() {
  var booklistId;
  booklistId = getQueryString("id");
  RequestAjax("GET", "/mj/booklist/" + booklistId + "/response", {}, DidGetBooklistResponseData, FailGetBooklistResponseData);
});

DidGetBooklistResponseData = function(data, rawData) {
  var booklistResponse;
  booklistResponse = template("public/Responses");
  $(".container").replaceWith(booklistResponse(data.Data));
  $(".actionbar .page-title").text("回复");
  CenterTitle();
  $("#submit").unbind("click").on("click", function(event) {
    var _ref, _ref1;
    event.preventDefault();
    event.stopPropagation();
    if (((_ref = $(".sendResponseContent").val()) != null ? _ref.length : void 0) <= 0) {
      alert("请输入回复内容");
    } else {
      $(this).prop("disabled", true);
      window.responseContent = $("#replyInput").val();
      data = {
        id: TimeStamp(),
        content: (_ref1 = $("#replyInput").val()) != null ? _ref1 : "",
        authorId: $(".container").data("authorid")
      };
      PostResponse(data);
    }
  });
  RegisterResponseBtn();
};

FailGetBooklistResponseData = function(data, rawData) {};

PostResponse = function(data) {
  var nickname, response, responseData;
  $("#replyInput").val("").blur().focus();
  nickname = $(".container").data("nickname");
  responseData = {
    Id: data.id,
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
  $("#" + data.id).find(".timestamp").addClass("hide");
  $("#" + data.id).find(".status").removeClass("hide");
  RequestAjax("POST", "/booklist/" + ($(".container").data('id')) + "/addresponse", data, DidPostResponse, DidFailPostResponse, false);
};

DidPostResponse = function(data, rawData) {
  $("button").prop("disabled", true);
  $("#" + rawData.Data.id).find(".status").removeClass().addClass("status pull-right glyphicons circle_ok");
  $("#" + rawData.Data.id).find(".status").animate({
    opacity: 0
  }, 1000, (function() {
    $(this).css("opacity", 1);
    $(this).addClass("hide");
    return $("#" + rawData.Data.id).find(".timestamp").removeClass("hide");
  }));
};

DidFailPostResponse = function(data, rawData) {
  $("button").prop("disabled", false);
  $("#" + rawData.Data.id).find(".status").removeClass().addClass("status pull-right glyphicons circle_exclamation_mark");
  $("#" + rawData.Data.id).find(".status").unbind("click").on("click", function(event) {
    $("#" + rawData.Data.id).remove();
    PostResponse(rawData.Data);
  });
};

RegisterResponseBtn = function() {
  $("a.responseBtn").each(function(index) {
    $(this).unbind("click").click(function(event) {
      var content, username;
      event.preventDefault();
      event.stopPropagation();
      username = $(this).closest(".responseItem").find(".name a").first().text();
      content = $("#replyInput").val();
      if (IsUsernameMentioned(content, username) < 0) {
        $("#replyInput").val("@" + username + " " + content);
      }
      $("#replyInput").focus().MoveToEnd();
    });
  });
};
