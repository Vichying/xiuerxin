// 信用体检查询框
$(".tabBox ul li").click(function(){
  console.log($(this).index() == 0 ? '个人信用体检' : '企业信用体检')
  $(this).addClass('tabActive');
  $(this).siblings().removeClass('tabActive');
})
$(".formControl").focus(function(){
  console.log("获取焦点")
  console.log(swiper)
})
$(".formControl").blur(function(){
  console.log("失去焦点")
})
// 点击查询
function searchBtn(){
  console.log("身份证号码为===>",$(".formControl").val())
}