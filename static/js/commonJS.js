document.writeln('<scri' + 'pt src="https://cdn.bootcss.com/jquery/2.1.1/jquery.min.js"></s' + 'cript>');
document.writeln('<scri' + 'pt src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js" type="text/javascript"></s' + 'cript>');

// //右侧漂浮导航（ie下无效）
// var li_tel = document.getElementById("li_tel")
// var tel = document.getElementById("tel")
// var li_wx = document.getElementById("li_wx")
// var wx = document.getElementById("wx")
// li_tel.onmouseover = function () {
//   setTimeout(() => {
//     tel.style.display = "block"
//     li_tel.style.background = "#FF9000"
//   }, 50)
// }
// li_tel.onmouseout = function () {
//   setTimeout(() => {
//     tel.style.display = "none"
//     li_tel.style.background = "#1164DF"
//   }, 50)
// }
// li_wx.onmouseover = function () {
//   setTimeout(() => {
//     wx.style.display = "block"
//     li_wx.style.background = "#FF9000"
//   }, 50)
// }
// li_wx.onmouseout = function () {
//   setTimeout(() => {
//     wx.style.display = "none"
//     li_wx.style.background = "#1164DF"
//   }, 50)
// }
// //返回顶部
// var gobakTop = document.getElementById("gobakTop")
// gobakTop.onclick = function () {
//   ScrollTop(0, 500);
// }
// const ScrollTop = (number = 0, time) => {
//   if (!time) {
//     document.body.scrollTop = document.documentElement.scrollTop = number;
//     return number;
//   }
//   const spacingTime = 20; // 设置循环的间隔时间  值越小消耗性能越高
//   let spacingInex = time / spacingTime; // 计算循环的次数
//   let nowTop = document.body.scrollTop + document.documentElement.scrollTop; // 获取当前滚动条位置
//   let everTop = (number - nowTop) / spacingInex; // 计算每次滑动的距离
//   let scrollTimer = setInterval(() => {
//     if (spacingInex > 0) {
//       spacingInex--;
//       ScrollTop(nowTop += everTop);
//     } else {
//       clearInterval(scrollTimer); // 清除计时器
//     }
//   }, spacingTime);
// }
