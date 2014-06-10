// Generated by CoffeeScript 1.7.1
var DidGetIndexData, FailGetIndexData;

$(document).on("deviceready", function() {
  var ch, node;
  $(".actionbar .page-title").text("首页");
  $(".actionbar .channel").removeClass("hide");
  $(".actionbar .slide-menu").removeClass("hide");
  $(".actionbar .back").addClass("hide");
  $(".actionbar .button.search").removeClass("hide");
  $(".actionbar").children(".center").css("left", ($(window).width() - $(".actionbar .center").children(".page-title").width()) / 2);
  ch = getQueryString("ch");
  if (ch === "f") {
    node = document.createElement('link');
    node.rel = 'stylesheet';
    node.type = 'text/css';
    node.href = 'public/css/Index_F.css';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
  RequestAjax("GET", "/mj", {
    ch: ch != null ? ch : "m"
  }, DidGetIndexData, FailGetIndexData);
});

DidGetIndexData = function(data, rawData) {
  var channel, main;
  main = template("Index/Main");
  $(".spinner").replaceWith(main(data.Data));
  channel = getQueryString("ch");
  if (channel === "f") {
    $(".actionbar .channel").find("img.current-channel").attr("src", "public/img/Crown_Woman.png");
  } else {
    $(".actionbar .channel").find("img.current-channel").attr("src", "public/img/Crown.png");
  }
  if (data.Data.IsLogin) {
    $(".wizard h4 .more").removeClass("hide");
  }
  $("ul.slidesjs-pagination").css({
    "right": "auto",
    "left": ($(".slides").width() - $("ul.slidesjs-pagination").width()) / 2
  });
  $(".ratingStar").raty({
    score: function() {
      return $(this).data("score");
    },
    halfShow: false,
    starOff: 'http://shanpowbookcover.qiniudn.com/star-off-small.png',
    starOn: 'http://shanpowbookcover.qiniudn.com/star-on-small.png',
    hints: window.scoreHints,
    noRatedMsg: window.scoreNoRatedMsg,
    readOnly: true,
    size: 10,
    width: 70
  });
};

FailGetIndexData = function(data, rawData) {};

$(document).on("backbutton", function(event) {
  event.preventDefault();
  navigator.app.exitApp();
});
