// 信用体检查询框
$(".tabBox ul li").click(function(){
  console.log($(this).index() == 0 ? '个人信用体检' : '企业信用体检')
  $(this).addClass('tabActive');
  $(this).siblings().removeClass('tabActive');
  if($(this).index() == 0){
    $("#creTipLeftText").show()
    $("#creInput").show()
    $("#creInput2").hide()
  }else{
    $("#creTipLeftText").hide()
    $("#creInput").hide()
    $("#creInput2").show()
  }
})
$(".formControl").focus(function(){
  console.log("获取焦点")
})
$(".formControl").blur(function(){
  console.log("失去焦点")
})
// 点击查询
function searchBtn(){
  
}

// 查看更多
function seeMoreFn(){
  $(".companyMore").show()
}

//成功案例弹窗
/*$('.bt-border').on('click',function (){
       alert("看更多");
});*/

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').focus()
})

//列表折叠效果
$(".list-class li.list-item").each(function(i) {

  $(".list-class li.list-item span").on('click',function (){
    $(".list-class li.list-item ul").hide();
    $('.list-class li.list-item span i').removeClass('ico-shang');
    if($(this).children('i').hasClass('ico-xia')== true){
      $('.list-class li.list-item span i').addClass('ico-xia');
      $(this).children('i').addClass('ico-shang');
      console.log("00");

      $(this).next("ul").show();

    }else{
      $('.list-class li.list-item span i').removeClass('ico-xia');
      $(this).children('i').addClass('ico-shang');
      $(this).next("ul").show();
      console.log($(this).eq(i).text());

    }

  });
});

//案件全选或取消
$('#allCheck').on('click',function () {
  if($('.bottomListBox input[type="checkbox"]').prop("checked")==false){
    $('.bottomListBox input[type="checkbox"]').prop("checked",'true');
  }else {
    $('.bottomListBox input[type="checkbox"]').prop("checked", '');
  }
});
//不可修复弹窗