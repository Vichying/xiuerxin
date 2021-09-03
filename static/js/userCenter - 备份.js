let str = ""
str = `<div class="topInfoBox">
          <div class="topBox"></div>
          <div class="userAvatarBox"><img src="../../static/picture/img_toux_01.png" alt=""></div>
          <div class="title">张三</div>
          <div class="btnsBox clear">
            <div class="btn left" onclick="personalInfoFn()">个人信息</div>
            <button class="btn right" data-toggle="modal" data-target="#logOutDialog">退出登录</button>
          </div>
        </div>
        <div class="bottomTabsBpx">
          <div class="panel-group" id="accordion">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
                    <img src="../../static/picture/icon_ddgl_01.png" alt="">
                    <span class="tabText orderSysText">订单管理</span>
                    <img src="../../static/picture/icon_xiangx_01.png" alt=""></a>
                </h4>
              </div>
              <div id="collapseOne" class="panel-collapse collapse">
                <div class="panel-body">
                  <div class="tabText orderSysText" onclick="orderSysFn()">订单列表</div>
                </div>
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">
                    <img src="../../static/picture/icon_jsrz_01.png" alt="">
                    <span class="tabText trainer">讲师入驻</span>
                    <img src="../../static/picture/icon_xiangx_01.png" alt=""></a>
                  </a>
                </h4>
              </div>
              <div id="collapseTwo" class="panel-collapse collapse">
                <div class="panel-body">
                  <div class="tabText trainerText" onclick="trainerFn1()">讲师资质</div>
                  <div class="secendTabTitle tabText trainerVedio" onclick="trainerFn2()">我的视频</div>
                </div>
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
                    <img src="../../static/picture/icon_wdzh_01.png" alt="">
                    <span class="tabText myAccount">我的账户</span>
                    <img src="../../static/picture/icon_xiangx_01.png" alt=""></a>
                  </a>
                </h4>
              </div>
              <div id="collapseThree" class="panel-collapse collapse">
                <div class="panel-body">
                  <div class="tabText accountInfo" onclick="accountInfoFn()">账户信息</div>
                  <div class="secendTabTitle tabText myProfit" onclick="myProfitFn()">我的收益</div>
                </div>
              </div>
            </div>
          </div>
        </div>`
$(".foldTabBox").append(str)
$('.collapse').collapse()
function personalInfoFn () {
  if (window.location.href.split("/").indexOf("personalInfo.html") == -1) {
    window.location.href = "./personalInfo.html"
  } else {
    console.log(window.location.href.split("/").indexOf("personalInfo.html"))
  }
}

$(function () {
  if (window.location.href.split("/").indexOf("orderList.html") != -1 || window.location.href.split("/").indexOf("orderDetail.html") != -1) {
    $(".orderSysText").addClass("activeTabText")
  }
  if (window.location.href.split("/").indexOf("qualification.html") != -1) {
    $(".trainer").addClass("activeTabText")
    $(".trainerText").addClass("activeTabText")
  }
  if (window.location.href.split("/").indexOf("myVedio.html") != -1) {
    $(".trainer").addClass("activeTabText")
    $(".trainerVedio").addClass("activeTabText")
  }
  if (window.location.href.split("/").indexOf("accountInfo.html") != -1) {
    $(".myAccount").addClass("activeTabText")
    $(".accountInfo").addClass("activeTabText")
  }
  if (window.location.href.split("/").indexOf("myProfit.html") != -1) {
    $(".myAccount").addClass("activeTabText")
    $(".myProfit").addClass("activeTabText")
  }
})
// 订单管理
function orderSysFn () {
  $(".orderSysText").addClass("activeTabText")

  $(".trainer").removeClass("activeTabText")
  $(".trainerText").removeClass("activeTabText")
  $(".trainerVedio").removeClass("activeTabText")

  $(".myAccount").removeClass("activeTabText")
  $(".accountInfo").removeClass("activeTabText")
  $(".myProfit").removeClass("activeTabText")

  if (window.location.href.split("/").indexOf("orderList.html") == -1) {
    window.location.href = "../../pages/userCenter/orderList.html"
  }
}
// 讲师入驻
function trainerFn1 () {
  $(".orderSysText").removeClass("activeTabText")

  $(".trainer").addClass("activeTabText")
  $(".trainerText").addClass("activeTabText")
  $(".trainerVedio").removeClass("activeTabText")

  $(".myAccount").removeClass("activeTabText")
  $(".accountInfo").removeClass("activeTabText")
  $(".myProfit").removeClass("activeTabText")

  window.location.href = "../../pages/userCenter/qualification.html"
}
function trainerFn2 () {
  $(".orderSysText").removeClass("activeTabText")

  $(".trainer").addClass("activeTabText")
  $(".trainerText").removeClass("activeTabText")
  $(".trainerVedio").addClass("activeTabText")

  $(".myAccount").removeClass("activeTabText")
  $(".accountInfo").removeClass("activeTabText")
  $(".myProfit").removeClass("activeTabText")

  window.location.href = "../../pages/userCenter/myVedio.html"
}
// 我的账户
function accountInfoFn () {
  $(".orderSysText").removeClass("activeTabText")

  $(".trainer").removeClass("activeTabText")
  $(".trainerText").removeClass("activeTabText")
  $(".trainerVedio").removeClass("activeTabText")

  $(".myAccount").addClass("activeTabText")
  $(".accountInfo").addClass("activeTabText")
  $(".myProfit").removeClass("activeTabText")

  window.location.href = "../../pages/userCenter/accountInfo.html"
}
function myProfitFn () {
  $(".orderSysText").removeClass("activeTabText")

  $(".trainer").removeClass("activeTabText")
  $(".trainerText").removeClass("activeTabText")
  $(".trainerVedio").removeClass("activeTabText")

  $(".myAccount").addClass("activeTabText")
  $(".accountInfo").removeClass("activeTabText")
  $(".myProfit").addClass("activeTabText")

  window.location.href = "../../pages/userCenter/myProfit.html"
}

function logOutFn () {
  window.location.href = "../../login.html"
}