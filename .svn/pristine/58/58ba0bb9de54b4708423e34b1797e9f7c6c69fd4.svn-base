//转换中文字符串
function toUtf8(str) {
  var out, i, len, c;
  out = "";
  len = str.length;
  for (i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if ((c >= 0x0001) && (c <= 0x007F)) {
          out += str.charAt(i);
      } else if (c > 0x07FF) {
          out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
          out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
          out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
      } else {
          out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
          out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
      }
  }
  return out;
}
//生成二维码
function outputQRCod(txt, width, height) {
  //先清空
  $("#qrcode").empty();
  //中文格式转换
  var str = toUtf8(txt);
  //生成二维码
  $("#qrcode").qrcode({
      render: "canvas",//canvas和table两种渲染方式
      width: width,
      height: height,
      text: str
  });
  //生成二维码
  $("#qrcode2").qrcode({
    render: "canvas",//canvas和table两种渲染方式
    width: width,
    height: height,
    text: str
  });
  //生成二维码
  $("#qrcode3").qrcode({
    render: "canvas",//canvas和table两种渲染方式
    width: width,
    height: height,
    text: str
  });
  //生成二维码
  $("#qrcode4").qrcode({
    render: "canvas",//canvas和table两种渲染方式
    width: width,
    height: height,
    text: str
  });
}