(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-82607082"],{"11ae":function(e,t,a){},"25f0":function(e,t,a){"use strict";var s=a("6eeb"),r=a("825a"),i=a("d039"),l=a("ad6d"),o="toString",n=RegExp.prototype,u=n[o],c=i((function(){return"/a/b"!=u.call({source:"a",flags:"b"})})),m=u.name!=o;(c||m)&&s(RegExp.prototype,o,(function(){var e=r(this),t=String(e.source),a=e.flags,s=String(void 0===a&&e instanceof RegExp&&!("flags"in n)?l.call(e):a);return"/"+t+"/"+s}),{unsafe:!0})},"34c3":function(e,t,a){},5664:function(e,t,a){"use strict";a("7222")},7222:function(e,t,a){},"93ad":function(e,t,a){"use strict";a("11ae")},a434:function(e,t,a){"use strict";var s=a("23e7"),r=a("23cb"),i=a("a691"),l=a("50c4"),o=a("7b0b"),n=a("65f0"),u=a("8418"),c=a("1dde"),m=c("splice"),d=Math.max,f=Math.min,p=9007199254740991,b="Maximum allowed length exceeded";s({target:"Array",proto:!0,forced:!m},{splice:function(e,t){var a,s,c,m,g,h,v=o(this),F=l(v.length),k=r(e,F),w=arguments.length;if(0===w?a=s=0:1===w?(a=0,s=F-k):(a=w-2,s=f(d(i(t),0),F-k)),F+a-s>p)throw TypeError(b);for(c=n(v,s),m=0;m<s;m++)g=k+m,g in v&&u(c,m,v[g]);if(c.length=s,a<s){for(m=k;m<F-s;m++)g=m+s,h=m+a,g in v?v[h]=v[g]:delete v[h];for(m=F;m>F-s+a;m--)delete v[m-1]}else if(a>s)for(m=F-s;m>k;m--)g=m+s-1,h=m+a-1,g in v?v[h]=v[g]:delete v[h];for(m=0;m<a;m++)v[m+k]=arguments[m+2];return v.length=F-s+a,c}})},a46c:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"staff warp"},[a("div",{staticClass:"title"},[e._v("当前 >> "+e._s(this.$store.state.titles))]),a("div",{staticClass:"main"},[a("p",{staticStyle:{width:"100%","text-align":"right","padding-right":"5%"}},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogFormVisibles=!0}}},[a("i",{staticClass:"el-icon-plus",staticStyle:{"margin-right":"1em"}}),e._v("添加")])],1),a("div",{staticClass:"table"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{prop:"id",align:"center",label:"管理员ID"}}),a("el-table-column",{attrs:{align:"center",prop:"admins",label:"账号名"}}),a("el-table-column",{attrs:{align:"center",prop:"status",label:"是否启用"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s("1"==t.row.status?"启用":"0"==t.row.status?"停用":t.row.status)+" ")]}}])}),a("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return e.handleClick(t.row)}}},[e._v("修改")]),a("el-popconfirm",{attrs:{title:"确定删除吗？"},on:{onConfirm:function(a){return e.Delete(t.row)}}},[a("el-button",{attrs:{slot:"reference",type:"text",size:"small"},slot:"reference"},[e._v("删除")])],1)]}}])})],1),a("div",{staticClass:"page"},[a("el-pagination",{attrs:{background:"","current-page":e.page,"page-size":e.limit,layout:"total, prev, pager, next",total:e.total},on:{"current-change":e.handleSizeChange,"update:currentPage":function(t){e.page=t},"update:current-page":function(t){e.page=t}}})],1)],1)]),a("el-dialog",{attrs:{width:"35%",title:"修改",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[e.dialogFormVisible?a("update",{attrs:{datas:e.formsdatas},on:{formok:e.formok}}):e._e()],1),a("el-dialog",{attrs:{width:"35%",title:"添加",visible:e.dialogFormVisibles},on:{"update:visible":function(t){e.dialogFormVisibles=t}}},[e.dialogFormVisibles?a("insert",{on:{formok:e.formoks}}):e._e()],1)],1)},r=[],i=a("5530"),l=(a("a434"),a("2f62")),o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"update"},[a("el-form",{ref:"ruleForm",staticStyle:{"margin-bottom":"20px"},attrs:{model:e.ruleForm,rules:e.rules}},[a("el-form-item",{attrs:{label:"账号名:","label-width":e.formLabelWidth}},[a("el-input",{attrs:{disabled:!0,autocomplete:"off"},model:{value:e.ruleForm.checkAdmins,callback:function(t){e.$set(e.ruleForm,"checkAdmins",t)},expression:"ruleForm.checkAdmins"}})],1),a("el-form-item",{attrs:{label:"新密码:","label-width":e.formLabelWidth,prop:"pass"}},[a("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.ruleForm.pass,callback:function(t){e.$set(e.ruleForm,"pass",t)},expression:"ruleForm.pass"}})],1),a("el-form-item",{attrs:{label:"确认密码:","label-width":e.formLabelWidth,prop:"checkPass"}},[a("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.ruleForm.checkPass,callback:function(t){e.$set(e.ruleForm,"checkPass",t)},expression:"ruleForm.checkPass"}})],1),a("el-form-item",{attrs:{label:"是否启用:","label-width":e.formLabelWidth}},[a("el-radio",{attrs:{label:"1"},model:{value:e.ruleForm.status,callback:function(t){e.$set(e.ruleForm,"status",t)},expression:"ruleForm.status"}},[e._v("启用")]),a("el-radio",{attrs:{label:"0"},model:{value:e.ruleForm.status,callback:function(t){e.$set(e.ruleForm,"status",t)},expression:"ruleForm.status"}},[e._v("不启用")])],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.cancel}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("确 定")])],1)],1)},n=[],u=(a("d3b7"),a("25f0"),{name:"update",data:function(){var e=this,t=function(t,a,s){""===a||""!==e.ruleForm.checkPass&&e.$refs.ruleForm.validateField("checkPass"),s()},a=function(t,a,s){""===a?s():a!==e.ruleForm.pass?s(new Error("两次输入密码不一致!")):s()};return{ruleForm:{pass:"",checkPass:"",checkAdmins:this.datas.admins,status:this.datas.status},formLabelWidth:"120px",rules:{pass:[{validator:t,trigger:"blur"}],checkPass:[{validator:a,trigger:"blur"}]}}},props:{datas:{type:Object}},created:function(){},methods:Object(i["a"])(Object(i["a"])({},Object(l["b"])({updateAdmin:"loginModule/updateAdmin",insertJournal:"loginModule/insertJournal"})),{},{cancel:function(){this.$emit("formok",!1)},submit:function(){var e=this;this.$refs["ruleForm"].validate((function(t){if(!t)return!1;var a={id:e.datas.id,systems_accounts_mains_id:1,types:1,admins:e.ruleForm.checkAdmins,psws:e.ruleForm.pass,status:e.ruleForm.status.toString()};e.updateAdmin(a).then((function(t){if(1==t.code){e.$message({message:"操作成功！",type:"success"});var a={plate:"管理员管理",plateRouter:"/staff",user:e.$store.state.userInfo.identity_name,userId:111,action:2,time:new Date,content:{"账号名":e.ruleForm.checkAdmins,"是否启用":1==parseInt(e.ruleForm.status)?"启用":"停用","密码":e.ruleForm.pass},beforeCon:{"账号名":e.datas.admins,"是否启用":1==parseInt(e.datas.status)?"启用":"停用"}};e.insertJournal(a),e.$emit("formok","aaa")}else e.$message.error(t.msg)}))}))}})}),c=u,m=(a("a4f8"),a("2877")),d=Object(m["a"])(c,o,n,!1,null,"d307b2f8",null),f=d.exports,p=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"update"},[a("el-form",{ref:"ruleForm",staticStyle:{"margin-bottom":"20px"},attrs:{model:e.ruleForm,rules:e.rules}},[a("el-form-item",{attrs:{label:"账号名:","label-width":e.formLabelWidth,prop:"checkAdmins"}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.ruleForm.checkAdmins,callback:function(t){e.$set(e.ruleForm,"checkAdmins",t)},expression:"ruleForm.checkAdmins"}})],1),a("el-form-item",{attrs:{label:"密码:","label-width":e.formLabelWidth,prop:"pass"}},[a("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.ruleForm.pass,callback:function(t){e.$set(e.ruleForm,"pass",t)},expression:"ruleForm.pass"}})],1),a("el-form-item",{attrs:{label:"确认密码:","label-width":e.formLabelWidth,prop:"checkPass"}},[a("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.ruleForm.checkPass,callback:function(t){e.$set(e.ruleForm,"checkPass",t)},expression:"ruleForm.checkPass"}})],1),a("el-form-item",{attrs:{label:"是否启用:","label-width":e.formLabelWidth}},[a("el-radio",{attrs:{label:"1"},model:{value:e.ruleForm.status,callback:function(t){e.$set(e.ruleForm,"status",t)},expression:"ruleForm.status"}},[e._v("启用")]),a("el-radio",{attrs:{label:"0"},model:{value:e.ruleForm.status,callback:function(t){e.$set(e.ruleForm,"status",t)},expression:"ruleForm.status"}},[e._v("不启用")])],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.cancel}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("确 定")])],1)],1)},b=[],g={name:"insert",data:function(){var e=this,t=function(t,a,s){if(!a)return s(new Error("年龄不能为空"));e.chekAdmin({column:["*"],filter:{admins:a},offset:0,limit:0}).then((function(e){if(1==e.code)return e.data.list.length>0?s(new Error("该用户已注册")):s()}))},a=function(t,a,s){""===a?s(new Error("请输入密码")):(""!==e.ruleForm.checkPass&&e.$refs.ruleForm.validateField("checkPass"),s())},s=function(t,a,s){""===a?s(new Error("请再次输入密码")):a!==e.ruleForm.pass?s(new Error("两次输入密码不一致!")):s()};return{ruleForm:{pass:"",checkPass:"",checkAdmins:"",status:"1"},formLabelWidth:"120px",rules:{pass:[{required:!0,validator:a,trigger:"blur"}],checkPass:[{required:!0,validator:s,trigger:"blur"}],checkAdmins:[{required:!0,validator:t,trigger:"blur"}]}}},props:{},created:function(){},methods:Object(i["a"])(Object(i["a"])({},Object(l["b"])({insertAdmin:"loginModule/insertAdmin",chekAdmin:"loginModule/chekAdmin",insertJournal:"loginModule/insertJournal"})),{},{cancel:function(){this.$emit("formok",!1)},submit:function(){var e=this;this.$refs["ruleForm"].validate((function(t){if(!t)return!1;var a={systems_accounts_mains_id:1,types:1,admins:e.ruleForm.checkAdmins,psws:e.ruleForm.pass,status:e.ruleForm.status};e.insertAdmin(a).then((function(t){if(1==t.code){e.$message({message:"操作成功！",type:"success"});var a={plate:"管理员管理",plateRouter:"/staff",user:e.$store.state.userInfo.identity_name,userId:111,action:1,time:new Date,content:{"账号名":e.ruleForm.checkAdmins,"是否启用":1==parseInt(e.ruleForm.status)?"启用":"停用","密码":e.ruleForm.pass}};e.insertJournal(a),e.$emit("formok","aaa")}else e.$message.error(t.msg)}))}))}})},h=g,v=(a("93ad"),Object(m["a"])(h,p,b,!1,null,"4af286b0",null)),F=v.exports,k=a("a7fe"),w={name:"cost",data:function(){return{tableData:[],dialogFormVisible:!1,loading:!0,total:0,limit:10,page:1,emails:"",formsdatas:0,dialogFormVisibles:!1}},components:{update:f,insert:F},mounted:function(){},created:function(){this.Bind(0)},methods:Object(i["a"])(Object(i["a"])({},Object(l["b"])({getAdminList:"loginModule/getAdminList",deleteAdmin:"loginModule/deleteAdmin",insertJournal:"loginModule/insertJournal"})),{},{getRQ:function(e){return k["a"].getRQ(e)},Delete:function(e){var t=this;this.deleteAdmin({id:[parseInt(e.id)]}).then((function(a){if(1==a.code){t.$message({message:"删除成功！",type:"success"});var s={plate:"管理员管理",plateRouter:"/staff",user:t.$store.state.userInfo.identity_name,userId:111,action:3,time:new Date,content:{"账号名":e.admins,"是否启用":1==parseInt(e.status)?"启用":"停用","密码":e.psws}};t.insertJournal(s),t.Bind(0)}else t.$message.error(a.msg)}))},Bind:function(e){var t=this;this.loading=!0;var a={column:["*"],filter:{},offset:e,limit:10};this.getAdminList(a).then((function(e){t.loading=!1,1==e.code?(t.tableData.splice(0,t.tableData.length),t.tableData=e.data.list,t.total=parseInt(e.data.count),t.limit=10):t.$message.error(e.msg)}))},handleSizeChange:function(e){this.Bind((e-1)*this.limit)},handleClick:function(e){this.formsdatas=e,this.dialogFormVisible=!0},formok:function(e){e&&this.Bind((this.page-1)*this.limit),this.dialogFormVisible=!1,this.dialogFormVisibles=!1},formoks:function(e){e&&this.Bind(0),this.dialogFormVisibles=!1}})},y=w,_=(a("5664"),Object(m["a"])(y,s,r,!1,null,"64e8efba",null));t["default"]=_.exports},a4f8:function(e,t,a){"use strict";a("34c3")},a7fe:function(e,t,a){"use strict";a("ac1f"),a("5319");t["a"]={getSJC:function(e){var t=new Date(e),a=t.getFullYear()+"-"+parseInt(t.getMonth()+1)+"-"+t.getDate()+" "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds(),s=new Date(a);s=new Date(a.replace(/-/g,"/"));return Math.round(Date.parse(s)/1e3)},getRQ:function(e){if(""==e||null==e)return"";var t=new Date(parseInt(1e3*e)),a=t.getFullYear(),s=t.getMonth()+1;s=s<10?"0"+s:s;var r=t.getDate();r=r<10?"0"+r:r;var i=t.getHours();i=i<10?"0"+i:i;var l=t.getMinutes(),o=t.getSeconds();l=l<10?"0"+l:l,o=o<10?"0"+o:o;var n=a+"-"+s+"-"+r+"  "+i+":"+l;return n}}}}]);
//# sourceMappingURL=chunk-82607082.d552642e.js.map