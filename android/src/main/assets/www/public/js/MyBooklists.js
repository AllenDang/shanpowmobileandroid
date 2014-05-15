// Generated by CoffeeScript 1.7.1
var DidGetBooklistsData, FailGetBooklistsData, GetBooklist;

$(document).ready(function() {
  var actionbar, mybooklist;
  actionbar = template("public/ActionBar");
  $("body").html(actionbar());
  $(".actionbar .channel").addClass("hide");
  $(".actionbar .slide-menu").addClass("hide");
  window.nickname = unescape(getQueryString("nickname"));
  window.create = parseInt(getQueryString("create"));
  mybooklist = template("Booklist/My");
  $(".spinner").replaceWith(mybooklist());
  $(".active").removeClass("active");
  if (window.create === 1) {
    $(".tab[data-target='mine']").addClass("active");
  } else {
    $(".tab[data-target='subscribed']").addClass("active");
  }
  $(".tab").each(function() {
    $(this).unbind("click").on("click", function(event) {
      if ($(this).hasClass("active")) {
        return;
      }
      $(".active").removeClass("active");
      $(this).addClass("active");
      if ($(this).data("target") === "mine") {
        $(".mine").removeClass("hide");
        $(".subscribed").addClass("hide");
        window.create = 1;
      } else {
        $(".mine").addClass("hide");
        $(".subscribed").removeClass("hide");
        window.create = 0;
      }
      GetBooklist();
    });
  });
  GetBooklist();
});

GetBooklist = function() {
  $(".booklists").replaceWith("<div class='booklists'><div class='row-fluid text-center none'></div></div>");
  RequestAjax("GET", "/mj/people/" + window.nickname + "/booklists/" + (window.create === 1 ? "created" : "subscribed"), {}, DidGetBooklistsData, FailGetBooklistsData);
};

DidGetBooklistsData = function(data, rawData) {
  var booklist, booklistHTML, _i, _len, _ref;
  if (data.Data.booklists.length > 0) {
    $(".booklists .none").addClass("hide");
    _ref = data.Data.booklists;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      booklist = _ref[_i];
      booklistHTML = template("public/Booklist");
      $(".booklists").append(booklistHTML(booklist));
    }
  } else {
    $(".booklists .none").removeClass("hide");
  }
  if (data.Data.isMySelf) {
    $(".tab[data-target='mine']").text("我创建的");
    $(".tab[data-target='subscribed']").text("我收藏的");
    $(".booklists .none").text("还没有创建书单");
    $(".actionbar .page-title").text("我" + (window.create === 1 ? "创建" : "收藏") + "的书单");
  } else {
    $(".tab[data-target='mine']").text("Ta创建的");
    $(".tab[data-target='subscribed']").text("Ta收藏的");
    $(".booklists .none").text("Ta还没有创建书单");
    $(".actionbar .page-title").text("Ta" + (window.create === 1 ? "创建" : "收藏") + "的书单");
  }
  $(".actionbar").children(".center").css("left", ($(window).width() - $(".actionbar .center").children(".page-title").width()) / 2);
  $(".item").each(function() {
    $(this).width(($(window).width() - 48) / 2);
    $(this).find(".bookCover").each(function() {
      $(this).height(parseInt($(".item .bookCover:first-child").width() * 4 / 3));
    });
  });
  $(".booklists").masonry({
    gutter: 16,
    itemSelector: ".item"
  });
};

FailGetBooklistsData = function(data, rawData) {};