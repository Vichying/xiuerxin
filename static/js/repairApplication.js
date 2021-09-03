// 信用修复申请 0--企业，1--企业非法人，2--个人
let applicationFlag = 0
// 角色判断
if(applicationFlag == 0){
  $("#companyBox").show()
}else if(applicationFlag == 1){
  $("#companyBox").show()
  $("#unincorporate").show()
}else if(applicationFlag == 2){
  $("#personalBox").show()
}


// 上传公司营业执照---------------------------
var file = document.getElementById('file');
var image = document.getElementById("fileImg");
var fileData = []
file.onchange = function() {
    fileData = this.files;//获取到一个FileList对象中的第一个文件(File 对象),是上传的文件
    var pettern = /^image/;                
    console.info(fileData[0].type)

    if (!pettern.test(fileData[0].type)) {
        alert("图片格式不正确");
        return;
    }
    $(".contentCompany").hide()
    $("#fileImg").show()
      var reader = new FileReader();
      reader.readAsDataURL(fileData[0]);//异步读取文件内容，结果用data:url的字符串形式表示
      /*当读取操作成功完成时调用*/
      reader.onload = function(e) {
          // console.log(e); //查看对象
          // console.log(this.result);//要的数据
          image.setAttribute("src", this.result)
      }
}
// 上传身份证照片（正面）
var file1 = document.getElementById('file1');
var image1 = document.getElementById("fileImg1");
var fileData1 = []
file1.onchange = function() {
    fileData1 = this.files;//获取到一个FileList对象中的第一个文件(File 对象),是上传的文件
    var pettern = /^image/;                
    console.info(fileData1[0].type)

    if (!pettern.test(fileData1[0].type)) {
        alert("图片格式不正确");
        return;
    }
    $(".warp-content1").hide()
    $("#fileImg1").show()
      var reader = new FileReader();
      reader.readAsDataURL(fileData1[0]);//异步读取文件内容，结果用data:url的字符串形式表示
      /*当读取操作成功完成时调用*/
      reader.onload = function(e) {
          // console.log(e); //查看对象
          // console.log(this.result);//要的数据
          image1.setAttribute("src", this.result)
      }
}
// 上传身份证照片（反面）
var file2 = document.getElementById('file2');
var image2 = document.getElementById("fileImg2");
var fileData2 = []
file2.onchange = function() {
    fileData2 = this.files;//获取到一个FileList对象中的第一个文件(File 对象),是上传的文件
    var pettern = /^image/;                
    console.info(fileData2[0].type)

    if (!pettern.test(fileData2[0].type)) {
        alert("图片格式不正确");
        return;
    }
    $(".warp-content2").hide()
    $("#fileImg2").show()
      var reader = new FileReader();
      reader.readAsDataURL(fileData2[0]);//异步读取文件内容，结果用data:url的字符串形式表示
      /*当读取操作成功完成时调用*/
      reader.onload = function(e) {
          // console.log(e); //查看对象
          // console.log(this.result);//要的数据
          image2.setAttribute("src", this.result)
      }
}
// 上传 申请人 身份证照片（正面）
var file3 = document.getElementById('file3');
var image3 = document.getElementById("fileImg3");
var fileData3 = []
file3.onchange = function() {
    fileData3 = this.files;//获取到一个FileList对象中的第一个文件(File 对象),是上传的文件
    var pettern = /^image/;                
    console.info(fileData3[0].type)

    if (!pettern.test(fileData3[0].type)) {
        alert("图片格式不正确");
        return;
    }
    $(".warp-content3").hide()
    $("#fileImg3").show()
      var reader = new FileReader();
      reader.readAsDataURL(fileData3[0]);//异步读取文件内容，结果用data:url的字符串形式表示
      /*当读取操作成功完成时调用*/
      reader.onload = function(e) {
          // console.log(e); //查看对象
          // console.log(this.result);//要的数据
          image3.setAttribute("src", this.result)
      }
}
// 上传 申请人 身份证照片（反面）
var file4 = document.getElementById('file4');
var image4 = document.getElementById("fileImg4");
var fileData4 = []
file4.onchange = function() {
    fileData4 = this.files;//获取到一个FileList对象中的第一个文件(File 对象),是上传的文件
    var pettern = /^image/;                
    console.info(fileData4[0].type)

    if (!pettern.test(fileData4[0].type)) {
        alert("图片格式不正确");
        return;
    }
    $(".warp-content4").hide()
    $("#fileImg4").show()
      var reader = new FileReader();
      reader.readAsDataURL(fileData4[0]);//异步读取文件内容，结果用data:url的字符串形式表示
      /*当读取操作成功完成时调用*/
      reader.onload = function(e) {
          // console.log(e); //查看对象
          // console.log(this.result);//要的数据
          image4.setAttribute("src", this.result)
      }
}




function nextStepOne(){
  if(applicationFlag == 0){
    if($("#phone").val() == "" || fileData.length == 0 || fileData1.length == 0 || fileData2.length == 0){
      $("#alertDanger").show(100).html("请填写完整必填项")
      setTimeout(()=>{
        $("#alertDanger").hide(100)
      },3000)
      return false
    }else{
      $("#alertDanger").hide()
      // 下一步(去第二步)
      window.location.href = "./repairApplicationStepTwo.html"
    }
  }else if(applicationFlag == 1){
    if($("#phone").val() == "" || $("#applicantName").val() == "" || $("#applicantPhone").val() == "" || fileData.length == 0 || fileData1.length == 0 || fileData2.length == 0 || fileData3.length == 0 || fileData4.length == 0){
      $("#alertDanger").show(100).html("请填写完整必填项")
      setTimeout(()=>{
        $("#alertDanger").hide(100)
      },3000)
      return false
    }else{
      // 下一步(去第二步)
      window.location.href = "./repairApplicationStepTwo.html"
    }
  }else if(applicationFlag == 2){
    if($("#personPhone").val() == "" || fileData1.length == 0 || fileData2.length == 0){
      $("#alertDanger").show(100).html("请填写完整必填项")
      setTimeout(()=>{
        $("#alertDanger").hide(100)
      },3000)
      return false
    }else{
      $("#alertDanger").hide()
      // 下一步(去第二步)
      window.location.href = "./repairApplicationStepTwo.html"
    }
  } 
  
}