(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-125e5f51"],{"019a":function(e,t,i){"use strict";i("3e22")},"0844":function(e,t,i){"use strict";i("9f4c")},2476:function(e,t,i){"use strict";i("e19c")},"3e22":function(e,t,i){},"607a":function(e,t,i){"use strict";i.r(t);var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"home_index"},[i("el-card",{staticClass:"myCard",staticStyle:{width:"100%"}},[i("el-form",{ref:"ruleForm",attrs:{"label-position":"left",model:e.ruleForm,inline:!0,"label-width":"100px"}},[i("el-form-item",{staticStyle:{"margin-right":"40px"},attrs:{prop:"name"}},[i("el-input",{attrs:{autocomplete:"off",clearable:"",placeholder:"角色名称"},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),i("el-form-item",{staticStyle:{"margin-right":"40px"},attrs:{prop:"name"}},[i("el-select",{attrs:{placeholder:"是否启用"},on:{change:e.search},model:{value:e.ruleForm.status,callback:function(t){e.$set(e.ruleForm,"status",t)},expression:"ruleForm.status"}},e._l(e.options,(function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),i("el-form-item",{staticStyle:{float:"right"}},[i("el-button",{attrs:{type:"primary",size:"medium"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("查询")]),e.getAuthorityFunc("create")?i("el-button",{attrs:{type:"primary",size:"medium"},on:{click:function(t){e.dialogVisible=!0}}},[e._v("新增")]):e._e()],1)],1)],1),i("div",{staticClass:"page_con"},[i("list",{ref:"list",attrs:{name:e.ruleForm.name,status:e.ruleForm.status}})],1),i("el-dialog",{attrs:{center:"",title:"新增角色",visible:e.dialogVisible,width:"600px"},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("el-form",{ref:"addRuleForm",staticClass:"add",attrs:{model:e.addRuleForm,rules:e.addRules,"label-width":"120px","label-position":"top"}},[i("el-form-item",{attrs:{label:"角色名称：",prop:"name"}},[i("el-input",{attrs:{autocomplete:"off",clearable:""},model:{value:e.addRuleForm.name,callback:function(t){e.$set(e.addRuleForm,"name",t)},expression:"addRuleForm.name"}})],1)],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"medium"},on:{click:function(t){return e.resetForm("addRuleForm")}}},[e._v("取 消")]),i("el-button",{attrs:{type:"primary",size:"medium"},on:{click:e.sysrolesCreateFunc}},[e._v("确 定")])],1)],1)],1)},n=[],a=i("1da1"),s=i("5530"),c=(i("96cf"),i("7db0"),i("b0c0"),i("2f62")),o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.isLoad,expression:"isLoad"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,"tooltip-effect":"dark",border:""},on:{"selection-change":e.handleSelectionChange}},[i("el-table-column",{attrs:{type:"selection",width:"55"}}),i("el-table-column",{attrs:{label:"角色ID",width:"120",prop:"id"}}),i("el-table-column",{attrs:{prop:"role_name",label:"角色名称","show-overflow-tooltip":""}}),i("el-table-column",{attrs:{prop:"status",label:"是否启用","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(1==t.row.status?"启用":"禁用"))])]}}])}),i("el-table-column",{attrs:{prop:"create_time",label:"创建时间"}}),e.result(e.getAuthorityFunc("edit"),e.getAuthorityFunc("delete"))?i("el-table-column",{attrs:{prop:"option",label:"操作",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.getAuthorityFunc("edit")?i("el-link",{attrs:{type:"primary"},on:{click:function(i){return e.updateFn(t.row)}}},[e._v("设置权限")]):e._e(),e.getAuthorityFunc("delete")?i("el-link",{attrs:{type:"primary"},on:{click:function(i){return e.deleteMenu(1,t.row)}}},[e._v("删除")]):e._e()]}}],null,!1,69937528)}):e._e()],1),i("div",{staticClass:"deleteAll"},[i("div",[e.getAuthorityFunc("edit")?i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.changeStatus(1)}}},[e._v("启用")]):e._e(),e.getAuthorityFunc("edit")?i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.changeStatus(2)}}},[e._v("禁用")]):e._e(),e.getAuthorityFunc("delete")?i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.deleteMenu(2)}}},[e._v("删除")]):e._e()],1)]),i("div",{staticClass:"page_tion"},[i("el-pagination",{attrs:{background:"",layout:"total, prev, pager, next","page-size":e.size,"current-page":e.page,total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),i("div",{staticClass:"dialog"},[i("el-dialog",{attrs:{title:"配置权限",visible:e.dialogVisible,width:"1000px","before-close":e.closeDia},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("div",{staticClass:"minH"},[i("tree-table",{ref:"treeTableO",attrs:{treeData:e.treeData,row:e.row},on:{func:e.initList,hideDia:function(t){e.dialogVisible=!1}}})],1),i("span",{staticClass:"dialog-footer",staticStyle:{"text-algin":"center"},attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"medium"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),i("el-button",{attrs:{type:"primary",size:"medium"},on:{click:e.submitFn}},[e._v("确 定")])],1)])],1)],1)},l=[],u=(i("159b"),i("ea5b")),d={data:function(){return{treeData:[],_treeData:[],dialogVisible:!1,isLoad:!1,page:1,size:10,total:0,tableData:[],multipleSelection:[],checked:!1,deleteList:[],statusChangeList:[],row:null}},components:{treeTable:u["a"]},props:["name","status"],computed:Object(s["a"])({},Object(c["c"])(["getToken","getAuthority"])),created:function(){this.initList(1),this.getTreelist()},methods:Object(s["a"])(Object(s["a"])({},Object(c["b"])({getSysrolesList:"loginModule/getSysrolesList",sysrolesDelete:"loginModule/sysrolesDelete",sysrolesStatus:"loginModule/sysrolesStatus",insertJournal:"loginModule/insertJournal",sysrolesTreelist:"loginModule/sysrolesTreelist"})),{},{result:function(e,t){return 0!=e||0!=t},getAuthorityFunc:function(e){var t=this;if(this.getAuthority&&0!=this.getAuthority.length){var i=this.getAuthority.find((function(e){return e.code==t.$route.path}));if(i&&i.child&&0!=i.child.length)return i.child.some((function(t){return t.code==e}))}},updateFn:function(e){var t=this;this.dialogVisible=!0,this.row=e;var i=JSON.parse(e.check_ids);this.$nextTick((function(){t.$refs.treeTableO.dab(i)}))},submitFn:function(){this.$refs.treeTableO.sysrolesUpdateFun()},closeDia:function(){this.dialogVisible=!1,this.row=null,this.treeData=JSON.parse(JSON.stringify(this._treeData)),this.$refs.treeTableO.checkAll=!1},getTreelist:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.sysrolesTreelist({token:e.getToken});case 3:if(i=t.sent,1==i.code){t.next=6;break}return t.abrupt("return",e.$message.error(i.msg));case 6:e.treeData=i.data.treeData,e.treeData.forEach((function(e){e.checked=!1,e.type=1,e.child&&e.child.forEach((function(t){t.pid=e.id,t.checked=!1,t.type=2,t.child&&t.child.forEach((function(e){e.pid=t.id,e.checked=!1,e.type=3}))}))})),e._treeData=JSON.parse(JSON.stringify(e.treeData)),t.next=15;break;case 11:t.prev=11,t.t0=t["catch"](0),console.log(t.t0),e.getTreelist();case 15:return t.prev=15,t.finish(15);case 17:case"end":return t.stop()}}),t,null,[[0,11,15,17]])})))()},changeStatus:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function i(){var r,n,a;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(t.statusChangeList=[],r=[],t.multipleSelection.forEach((function(e){r.push(e.id),t.statusChangeList.push(e)})),!t.statusChangeList||0!=t.statusChangeList.length){i.next=5;break}return i.abrupt("return",t.$message.warning("请选择要更新的角色！"));case 5:return i.prev=5,t.isLoad=!0,n={token:t.getToken,id:r,status:e},i.next=10,t.sysrolesStatus(n);case 10:if(a=i.sent,1==a.code){i.next=13;break}return i.abrupt("return",t.$message.error(a.msg));case 13:t.$message({type:"success",message:"修改成功!"}),t.statusChangeList.forEach((function(i){var r={"角色ID":i.id,"角色名称":i.role_name,"是否启用":1==i.status?"启用":"禁用","创建时间":i.create_time},n={"角色ID":i.id,"角色名称":i.role_name,"是否启用":1==e?"启用":"禁用","创建时间":i.create_time};t.logOption(n,2,r)})),i.next=20;break;case 17:i.prev=17,i.t0=i["catch"](5),console.log(i.t0);case 20:return i.prev=20,t.initList(),i.finish(20);case 23:case"end":return i.stop()}}),i,null,[[5,17,20,23]])})))()},toggleAllSelect:function(){this.$refs.multipleTable.toggleAllSelection()},handleSelectionChange:function(e){this.multipleSelection=e},initList:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function i(){var r,n;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.prev=0,1==e&&(t.page=1),t.isLoad=!0,r={token:t.getToken,role_name:t.name,page:t.page,page_size:t.size,status:0==t.status?null:t.status},i.next=6,t.getSysrolesList(r);case 6:if(n=i.sent,1==n.code){i.next=9;break}return i.abrupt("return",t.$message.error(n.msg));case 9:t.tableData=n.data.list,t.total=n.data.count,i.next=17;break;case 13:i.prev=13,i.t0=i["catch"](0),console.log(i.t0),t.initList(e);case 17:return i.prev=17,t.isLoad=!1,t.dialogVisible=!1,i.finish(17);case 21:case"end":return i.stop()}}),i,null,[[0,13,17,21]])})))()},logOption:function(e,t,i){var r={plate:"角色管理",plateRouter:"/character",user:this.$store.state.userInfo.identity_name,userId:111,action:t,time:new Date,content:e};i&&(r.beforeCon=i),this.insertJournal(r)},deleteMenu:function(e,t){var i=this;this.deleteList=[];var r=[];if(1==e?(r.push(t.id),this.deleteList.push(t)):this.multipleSelection.forEach((function(e){r.push(e.id),i.deleteList.push(e)})),this.deleteList&&0==this.deleteList.length)return this.$message.warning("请选择要删除的角色！");this.$confirm(1==e?"是否删除该角色？":"是否删除选中角色？","删除提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(a["a"])(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,i.isLoad=!0,t={token:i.getToken,id:r},e.next=5,i.sysrolesDelete(t);case 5:if(n=e.sent,1==n.code){e.next=8;break}return e.abrupt("return",i.$message.error(n.msg));case 8:i.$message({type:"success",message:"删除成功!"}),i.deleteList.forEach((function(e){var t={"角色ID":e.id,"角色名称":e.role_name,"是否启用":1==e.status?"启用":"禁用","创建时间":e.create_time};i.logOption(t,3)})),e.next=15;break;case 12:e.prev=12,e.t0=e["catch"](0),console.log(e.t0);case 15:return e.prev=15,i.initList(),e.finish(15);case 18:case"end":return e.stop()}}),e,null,[[0,12,15,18]])})))).catch((function(){i.$message({type:"info",message:"已取消删除"})}))},handleSizeChange:function(e){this.size=e,this.bind()},handleCurrentChange:function(e){this.page=e,this.bind()}})},h=d,f=(i("019a"),i("2877")),p=Object(f["a"])(h,o,l,!1,null,"3dad81ca",null),m=p.exports,g={data:function(){return{defaultProps:{children:"child",label:"name"},treeData:[{id:"0",name:"修尔信后台",child:[]}],check_ids:[],options:[{value:0,label:"全部"},{value:1,label:"启用"},{value:2,label:"禁用"}],dialogVisible:!1,val:"你好",ruleForm:{name:"",status:0},addRuleForm:{name:""},addRules:{name:[{required:!0,message:"请输入角色名称",trigger:"blur"}]}}},components:{list:m},created:function(){this.getTreelist()},mounted:function(){},computed:Object(s["a"])({},Object(c["c"])(["getToken","getAuthority"])),methods:Object(s["a"])(Object(s["a"])({},Object(c["b"])({sysrolesTreelist:"loginModule/sysrolesTreelist",sysrolesCreate:"loginModule/sysrolesCreate",insertJournal:"loginModule/insertJournal"})),{},{getAuthorityFunc:function(e){var t=this;if(this.getAuthority&&0!=this.getAuthority.length){var i=this.getAuthority.find((function(e){return e.code==t.$route.path}));if(i&&i.child&&0!=i.child.length)return i.child.some((function(t){return t.code==e}))}},getTreelist:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.sysrolesTreelist({token:e.getToken});case 3:if(i=t.sent,1==i.code){t.next=6;break}return t.abrupt("return",e.$message.error(i.msg));case 6:e.treeData[0].child=i.data.treeData,t.next=13;break;case 9:t.prev=9,t.t0=t["catch"](0),console.log(t.t0),e.getTreelist();case 13:return t.prev=13,t.finish(13);case 15:case"end":return t.stop()}}),t,null,[[0,9,13,15]])})))()},search:function(){var e=this;this.$nextTick((function(){e.$refs.list.initList()}))},submitForm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;t.$refs.list.initList(1)}))},resetForm:function(e,t){var i=this;this.dialogVisible=!1,this.$refs[e].resetFields(),0==t&&this.$nextTick((function(){i.$refs.list.initList(1)}))},logOption:function(e,t,i){var r={plate:"角色管理",plateRouter:"/character",user:this.$store.state.userInfo.identity_name,userId:111,action:t,time:new Date,content:e};i&&(r.beforeCon=i),this.insertJournal(r)},sysrolesCreateFunc:function(){var e=this;this.$refs.addRuleForm.validate(function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(i){var r,n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!i){t.next=21;break}return e.dialogVisible=!1,t.prev=2,r={token:e.getToken,role_name:e.addRuleForm.name,check_ids:e.check_ids},t.next=6,e.sysrolesCreate(r);case 6:n=t.sent,1==n.code?e.$message.success("添加成功!"):e.$message.error(n.msg),a={"角色名称":e.addRuleForm.name},e.logOption(a,1),t.next=15;break;case 12:t.prev=12,t.t0=t["catch"](2),console.log(t.t0);case 15:return t.prev=15,e.$refs.addRuleForm.resetFields(),e.$refs.list.initList(1),t.finish(15);case 19:t.next=23;break;case 21:return console.log("error submit!!"),t.abrupt("return",!1);case 23:case"end":return t.stop()}}),t,null,[[2,12,15,19]])})));return function(e){return t.apply(this,arguments)}}())}})},b=g,v=(i("0844"),Object(f["a"])(b,r,n,!1,null,"ed81214a",null));t["default"]=v.exports},"7db0":function(e,t,i){"use strict";var r=i("23e7"),n=i("b727").find,a=i("44d2"),s="find",c=!0;s in[]&&Array(1)[s]((function(){c=!1})),r({target:"Array",proto:!0,forced:c},{find:function(e){return n(this,e,arguments.length>1?arguments[1]:void 0)}}),a(s)},"9f4c":function(e,t,i){},e19c:function(e,t,i){},ea5b:function(e,t,i){"use strict";var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[e.treeData&&0!=e.treeData.length?i("div",[e._m(0),i("div",{staticClass:"tableBox"},[i("div",{staticClass:"ord"},e._l(e.treeData,(function(t){return i("div",{key:t.id,staticClass:"box"},[i("div",{staticClass:"fu"},[i("el-checkbox",{attrs:{disabled:e.isSelect},on:{change:function(i){return e.checkedBtn(t)}},model:{value:t.checked,callback:function(i){e.$set(t,"checked",i)},expression:"item.checked"}},[e._v(e._s(t.name))])],1),i("div",{staticClass:"zi"},e._l(t.child,(function(t){return i("div",{key:t.id,staticClass:"item"},[i("div",{staticClass:"er"},[i("el-checkbox",{attrs:{disabled:e.isSelect},on:{change:function(i){return e.checkedBtn(t)}},model:{value:t.checked,callback:function(i){e.$set(t,"checked",i)},expression:"it.checked"}},[e._v(e._s(t.name))])],1),i("div",{staticClass:"opt"},e._l(t.child,(function(t){return i("span",{key:t.id},[i("el-checkbox",{attrs:{disabled:e.isSelect},on:{change:function(i){return e.checkedBtn(t)}},model:{value:t.checked,callback:function(i){e.$set(t,"checked",i)},expression:"its.checked"}},[e._v(e._s(t.name))])],1)})),0)])})),0)])})),0),i("div",{staticClass:"sys"},[i("el-checkbox",{attrs:{disabled:e.isSelect},on:{change:e.checkAllFunc},model:{value:e.checkAll,callback:function(t){e.checkAll=t},expression:"checkAll"}},[e._v("修尔信后台")])],1)])]):i("div",[i("h3",{staticStyle:{"text-align":"center"}},[e._v("暂无内容！")])])])},n=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"head"},[i("ul",[i("li",[e._v("系统")]),i("li",[e._v("一级菜单")]),i("li",[e._v("二级菜单")]),i("li",[e._v("操作")])])])}],a=i("1da1"),s=i("5530"),c=(i("96cf"),i("159b"),i("7db0"),i("2f62")),o={data:function(){return{checkAll:!1,selectId:[],tree:[],old_tree:[]}},props:["treeData","row","isSelect"],computed:Object(s["a"])({},Object(c["c"])(["getToken"])),created:function(){},methods:Object(s["a"])(Object(s["a"])({},Object(c["b"])({sysrolesUpdate:"loginModule/sysrolesUpdate",insertJournal:"loginModule/insertJournal"})),{},{dab:function(e){var t=[];e.forEach((function(e){e.child&&0!=e.child.length&&(t.push(e),e.child.forEach((function(i){i.pid=e.id,t.push(i),i.child&&0!=i.child.length&&i.child.forEach((function(e){e.pid=i.id,t.push(e)}))})))})),this.treeData.forEach((function(e){t.forEach((function(t){e.id==t.id&&(e.checked=!0),e.child&&0!=e.child.length&&e.child.forEach((function(i){i.id==t.id&&t.pid==e.id&&(i.checked=!0),i.child&&0!=i.child.length&&i.child.forEach((function(e){e.id==t.id&&t.pid==i.id&&(e.checked=!0)}))}))}))})),this.checkAll=this.treeData.some((function(e){return 1==e.checked})),this.old_tree=JSON.parse(JSON.stringify(this.treeData)),this.$forceUpdate()},logOption:function(e,t,i){var r={plate:"角色管理",plateRouter:"/character",user:this.$store.state.userInfo.identity_name,userId:111,action:t,time:new Date,content:e};i&&(r.beforeCon=i),this.insertJournal(r)},sysrolesUpdateFun:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var i,r,n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.selectId||0!=e.selectId.length){t.next=3;break}return e.$emit("hideDia"),t.abrupt("return");case 3:return i={token:e.getToken,id:e.row.id,role_name:e.row.role_name,check_ids:e.selectId},t.next=6,e.sysrolesUpdate(i);case 6:if(r=t.sent,1==r.code){t.next=9;break}return t.abrupt("return",e.$message.error(r.msg));case 9:e.$message.success("设置成功！"),e.selectId=[],e.$emit("func"),n={"角色ID":e.row.id,"角色名称":e.row.role_name,"是否启用":1==e.row.status?"启用":"禁用","创建时间":e.row.create_time,"设置权限":JSON.stringify(e.old_tree)},a={"角色ID":e.row.id,"角色名称":e.row.role_name,"是否启用":1==e.row.status?"启用":"禁用","创建时间":e.row.create_time,"设置权限":JSON.stringify(e.tree)},e.logOption(a,2,n);case 15:case"end":return t.stop()}}),t)})))()},getSelectId:function(){var e=this;this.selectId=[],this.treeData.forEach((function(t){if(t.checked){var i={};i.id=t.id,t.child&&0!=t.child.length&&(i.child=[],t.child.forEach((function(e){if(e.checked){var t={};t.id=e.id,e.child&&0!=e.child.length&&(t.child=[],e.child.forEach((function(e){if(e.checked){var i={};i.id=e.id,t.child.push(i)}}))),i.child.push(t)}}))),e.selectId.push(i)}}))},checkedBtn:function(e){this.checkFn(e),1==e.type||(2==e.type?e.checked?this.treeData.find((function(t){return e.pid==t.id})).checked=e.checked:this.treeData.forEach((function(e){e.child&&0!=e.child.length&&(e.checked=e.child.some((function(e){return 1==e.checked})))})):e.checked&&this.treeData.forEach((function(e){e.child.forEach((function(t){if(t.child&&0!=t.child.length){var i=t.child.some((function(e){return 1==e.checked}));i&&(t.checked=!0)}e.child&&0!=e.child.length&&(e.checked=e.child.some((function(e){return 1==e.checked})))}))}))),this.checkAll=this.treeData.some((function(e){return 1==e.checked})),this.tree=JSON.parse(JSON.stringify(this.treeData)),this.getSelectId(),this.$forceUpdate()},checkFn:function(e){var t=this;e.child&&0!=e.child.length&&e.child.forEach((function(i){i.checked=e.checked,t.checkFn(i)}))},checkAllFunc:function(){var e=this;this.treeData.forEach((function(t){t.checked=e.checkAll,e.checkFn(t)})),this.getSelectId(),this.tree=JSON.parse(JSON.stringify(this.treeData))}})},l=o,u=(i("2476"),i("2877")),d=Object(u["a"])(l,r,n,!1,null,"54bbbbe5",null);t["a"]=d.exports}}]);
//# sourceMappingURL=chunk-125e5f51.afb19450.js.map