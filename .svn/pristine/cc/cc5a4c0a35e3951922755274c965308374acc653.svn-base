// 选择框改变获取的选中值
function orderTypeFn () {
  console.log($("#orderType").val())
}
function payTypeFn () {
  console.log($("#payType").val())
}
// 订单列表测试数据
$(function () {
  let str = ""
  for (var i = 0; i < 10; i++) {
    str += `<tr>
              <td>单项体检</td>
              <td>TJ300000000966 </td>
              <td>2020-10-01 11:15:00</td>
              <td>待支付</td>
              <td>￥100.00</td>
              <td onclick="checkDetail(`+ i + `)">查看详情</td>
            </tr>`
  }
  $("tbody").append(str)
})
// 查看详情
function checkDetail (val) {
  console.log(val)
  window.location.href = "../../pages/userCenter/orderDetail.html"
}
// 订单详情-----
$(function () {
  //订单状态（0-体检待支付，1-体检已支付，2-批量体检已支付，3-修复待支付，4-修复已支付，5-监控待支付，6-监控已支付）
  let type = 0
  if (type == 0 || type == 3 || type == 5) {
    $(".toPayBtn").show()
    $(".dwonReportBtn").hide()
    $(".payTime").hide()
    if (type == 5) {
      $(".checkWords").hide()
      $(".monitoringServices").show()
      $(".examination").hide()
    } else {
      $(".monitoringServices").hide()
      $(".examination").show()
      $(".checkWords").hide()
    }
  } else {
    $(".toPayBtn").hide()
    $(".dwonReportBtn").show()
    $(".payTime").show()
    if (type == 2) {
      $(".checkWords").show()
      $(".monitoringServices").hide()
      $(".examination").show()
    } else if (type == 6) {
      $(".checkWords").hide()
      $(".monitoringServices").show()
      $(".examination").hide()
    } else {
      $(".checkWords").hide()
      $(".monitoringServices").hide()
      $(".examination").show()
    }
  }
})

// 查看批量文档
function checkWordsFn () {
  console.log("查看批量文档")
}
// 去支付
function toPayFn () {
  window.location.href = "../../pages/userCenter/orderPayType.html"
}