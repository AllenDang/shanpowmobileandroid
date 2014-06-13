// Generated by CoffeeScript 1.7.1
var DidGetBillboardIndexData, FailGetBillboardIndexData;

$(document).on("deviceready", function() {
  RequestAjax("GET", "/mj/billboard", {}, DidGetBillboardIndexData, FailGetBillboardIndexData);
});

DidGetBillboardIndexData = function(data, rawData) {
  var billboard, billboardIndex, htmlString, _i, _len, _ref;
  billboardIndex = template("Billboard/Index");
  if ((data != null ? data.Data : void 0) != null) {
    _ref = data.Data;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      billboard = _ref[_i];
      billboard.array = new Array(billboard.Version);
    }
    htmlString = billboardIndex(data);
    if (htmlString.search("Template Error") < 0) {
      $(".container").replaceWith(htmlString);
    }
  } else {
    ShowLoadingError();
    return;
  }
  $(".billboard").each(function() {
    $(this).find(".ver").each(function(index) {
      if (index > ($(this).closest(".billboard").find(".ver").length > 5 ? 3 : 4) && !$(this).hasClass("more")) {
        $(this).addClass("hide");
      }
    });
    $(this).find(".span8").height($(this).find(".span4 img").width());
  });
  $(".actionbar .page-title").text("热辣榜单");
  CenterTitle();
  $(".ver.more").unbind("click").on("click", function(event) {
    if ($(this).hasClass("nobkg")) {
      $(this).removeClass("nobkg");
      $(this).closest(".billboard").find(".ver").each(function(index) {
        if (index > 3 && !$(this).hasClass("more")) {
          $(this).addClass("hide");
        }
      });
      $(this).siblings(".clearfix").remove();
      $(this).html("更多<span class='halflings chevron-down'></span>");
    } else {
      $(this).addClass("nobkg");
      $(this).closest(".billboard").find(".ver").removeClass("hide");
      $(this).before("<div class='clearfix'></div>");
      $(this).html("收起<span class='halflings chevron-up'></span>");
    }
  });
};

FailGetBillboardIndexData = function(data, rawData) {};
