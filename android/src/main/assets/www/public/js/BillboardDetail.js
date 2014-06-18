// Generated by CoffeeScript 1.7.1
var DidGetBillboardDetailData, FailGetBillboardDetailData;

$(document).on("deviceready", function() {
  var title;
  title = getQueryString("title");
  window.ver = getQueryString("version");
  RequestAjax("GET", "/mj/billboard/detail", {
    title: unescape(title),
    version: window.ver
  }, DidGetBillboardDetailData, FailGetBillboardDetailData);
});

DidGetBillboardDetailData = function(data, rawData) {
  var billboardDetail, htmlString, i, versionHTML, _i, _ref;
  billboardDetail = template("Billboard/Detail");
  htmlString = billboardDetail(data.Data);
  if (htmlString.search("Template Error") < 0) {
    $(".container").replaceWith(htmlString);
  } else {
    ShowLoadingError();
    return;
  }
  $(".actionbar .page-title").text(data.Data.Billboard.Title);
  $(".actionbar .versions").removeClass("hide").find(".dropdown-toggle").children("span").text("第" + window.ver + "期");
  CenterTitle();
  for (i = _i = _ref = data.Data.VersionsSum; _ref <= 1 ? _i <= 1 : _i >= 1; i = _ref <= 1 ? ++_i : --_i) {
    versionHTML = template("public/ActionBarVersion");
    $(".actionbar .versions").find(".dropdown-menu").append(versionHTML({
      Title: data.Data.Billboard.Title,
      Version: i
    }));
  }
  $(".mega table td").each(function(index) {
    $(this).children("div").css({
      "left": ($(this).width() - $(this).children("div").width()) / 2
    });
  });
};

FailGetBillboardDetailData = function(data, rawData) {};
