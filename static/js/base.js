//右侧漂浮导航
$("#li_tel").hover(function () {
  $("#tel").show(50);
  $("#li_tel").css("background", "#FF9000")
}, function () {
  $("#tel").hide();
  $("#li_tel").css("background", "#1164DF")
});
$("#li_wx").hover(function () {
  $("#wx").show(50);
  $("#li_wx").css("background", "#FF9000")
}, function () {
  $("#wx").hide();
  $("#li_wx").css("background", "#1164DF")
});
//返回顶部
$("#gobakTop").on("click", function () {
  $("body,html").animate({
    scrollTop: 0
  }, 500);
});