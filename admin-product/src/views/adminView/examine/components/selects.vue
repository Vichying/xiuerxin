<template>
    <div class="update">
        <div class="info">
            <div class="title">基本信息</div>
            <div class="mation">
                <ul>
                    <li><p><span>主体名称</span><span>{{datas1.ss_name}}</span></p><p><span>社会信用代码/证件</span><span>{{datas1.ss_id}}</span></p></li>
                    <li><p><span>订单编号</span><span v-if="datas1.order">{{datas1.order.orders_sn}}</span></p><p><span>订单时间</span><span>{{getRQ(datas1.add_times)}}</span></p></li>
                    <li><p v-if='!isPersonal'><span>法定代表人联系方式</span><span v-if="datas2">{{datas2.mobile_telephones}}</span></p><p><span>邮箱</span><span v-if="datas2">{{datas2.emails}}</span></p></li>
                </ul>
            </div>
            <div v-if='!isPersonal' class="license pice">
               <p>营业执照</p>
               <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :file-list="fileList1"
                    :on-change="handleChange"
                    :auto-upload="false">
                       <!-- <el-link type="primary" :underline="false">修改</el-link> -->
                        <div slot="file" slot-scope="{file}">
                            <img
                                style="width:100%;height:100%;background-size:100% 100%;"
                                class="el-upload-list__item-thumbnail"
                                :src="file.url" alt=""
                            >
                            <span class="el-upload-list__item-actions">
                                <span
                                class="el-upload-list__item-preview"
                                @click="handlePictureCardPreview(file)"
                                >
                                <i class="el-icon-zoom-in"></i>
                                </span>
                            </span>
                        </div>
                    </el-upload>
            </div>
            <div v-if='!isPersonal' class="identity">
                <div class="pice ident">
                    <p>法定代表人身份证正面</p>
                        <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :file-list="fileList2"
                    :on-change="handleChange"
                    :auto-upload="false">
                       <!-- <el-link type="primary" :underline="false">修改</el-link> -->
                        <div slot="file" slot-scope="{file}">
                            <img
                                style="width:100%;height:100%;background-size:100% 100%;"
                                class="el-upload-list__item-thumbnail"
                                :src="file.url" alt=""
                            >
                            <span class="el-upload-list__item-actions">
                                <span
                                class="el-upload-list__item-preview"
                                @click="handlePictureCardPreview(file)"
                                >
                                <i class="el-icon-zoom-in"></i>
                                </span>
                            </span>
                        </div>
                    </el-upload>
                </div>
               <div class="pice ident">
                    <p>法定代表人身份证反面</p>
                              <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :file-list="fileList3"
                    :on-change="handleChange"
                    :auto-upload="false">
                       <!-- <el-link type="primary" :underline="false">修改</el-link> -->
                        <div slot="file" slot-scope="{file}">
                            <img
                                style="width:100%;height:100%;background-size:100% 100%;"
                                class="el-upload-list__item-thumbnail"
                                :src="file.url" alt=""
                            >
                            <span class="el-upload-list__item-actions">
                                <span
                                class="el-upload-list__item-preview"
                                @click="handlePictureCardPreview(file)"
                                >
                                <i class="el-icon-zoom-in"></i>
                                </span>
                            </span>
                        </div>
                    </el-upload>
                </div>
            </div>
             <!-- 没有则不显示 -->
            <div v-if='!isPersonal&&datas2&&datas2.is_corporates==0' class="applicant">
                <p><span>申请人姓名</span><span>{{datas2.apply_names}}</span></p><p><span>申请人手机</span><span>{{datas2.apply_mobile_telephones}}</span></p>
            </div>
             <!-- 没有则不显示 -->
             <div v-if="datas2&&datas2.is_corporates==0" class="identity">
                <div class="pice ident">
                    <p>{{isPersonal?'身份证正面':'申请人身份证正面'}}</p>
                        <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :file-list="fileList4"
                    :on-change="handleChange"
                    :auto-upload="false">
                       <!-- <el-link type="primary" :underline="false">修改</el-link> -->
                        <div slot="file" slot-scope="{file}">
                            <img
                                style="width:100%;height:100%;background-size:100% 100%;"
                                class="el-upload-list__item-thumbnail"
                                :src="file.url" alt=""
                            >
                            <span class="el-upload-list__item-actions">
                                <span
                                class="el-upload-list__item-preview"
                                @click="handlePictureCardPreview(file)"
                                >
                                <i class="el-icon-zoom-in"></i>
                                </span>
                            </span>
                        </div>
                    </el-upload>
                </div>
               <div class="pice ident">
                    <p>{{isPersonal?'身份证反面':'申请人身份证反面'}}</p>
                              <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :file-list="fileList5"
                    :on-change="handleChange"
                    :auto-upload="false">
                       <!-- <el-link type="primary" :underline="false">修改</el-link> -->
                        <div slot="file" slot-scope="{file}">
                            <img
                                style="width:100%;height:100%;background-size:100% 100%;"
                                class="el-upload-list__item-thumbnail"
                                :src="file.url" alt=""
                            >
                            <span class="el-upload-list__item-actions">
                                <span
                                class="el-upload-list__item-preview"
                                @click="handlePictureCardPreview(file)"
                                >
                                <i class="el-icon-zoom-in"></i>
                                </span>
                            </span>
                        </div>
                    </el-upload>
                </div>
            </div>
        </div>
        <div class="Material">
           <div class="title" style="border:none">修复材料</div>
           <div v-for="item in datas3" :key="item.id" class="mater1">
                     <div class="case"><span>案件号</span>{{item.casename}}</div>
                     <div class="mediate pice">
                                <p>调解书/结案/履约证明</p>
                                <div class="uploadmedia">
                           <el-upload
                                v-for="(cn,index) in item.prove_files" :key="index"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                list-type="picture-card"
                                :file-list="cn"
                                :on-change="handleChange"
                                :auto-upload="false">
                                <!-- <el-link type="primary" :underline="false">修改</el-link> -->
                                    <div slot="file" slot-scope="{file}">
                                        <img
                                            style="width:100%;height:100%;background-size:100% 100%;"
                                            class="el-upload-list__item-thumbnail"
                                            :src="file.url" alt=""
                                        >
                                        <span class="el-upload-list__item-actions">
                                            <span
                                            class="el-upload-list__item-preview"
                                            @click="handlePictureCardPreview(file)"
                                            >
                                            <i class="el-icon-zoom-in"></i>
                                            </span>
                                        </span>
                                    </div>
                                </el-upload>
                                </div>
                            
                     </div>
                    <div class="identity">
                        <div class="pice ident">
                            <p>承诺书</p>
                         <el-upload
                           action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                             v-for="(fl1,index) in item.fileList1" :key="index"
                            :file-list="fl1"
                            :on-change="handleChange"
                            :auto-upload="false">
                            <!-- <el-link type="primary" :underline="false">修改</el-link> -->
                                <div slot="file" slot-scope="{file}">
                                    <img
                                        style="width:100%;height:100%;background-size:100% 100%;"
                                        class="el-upload-list__item-thumbnail"
                                        :src="file.url" alt=""
                                    >
                                    <span class="el-upload-list__item-actions">
                                        <span
                                        class="el-upload-list__item-preview"
                                        @click="handlePictureCardPreview(file)"
                                        >
                                        <i class="el-icon-zoom-in"></i>
                                        </span>
                                    </span>
                                </div>
                            </el-upload>
                        </div>
                    <div class="pice ident">
                            <p>申请书</p>
                                    <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                             v-for="(fl2,index) in item.fileList2" :key="index"
                            :file-list="fl2"
                            :on-change="handleChange"
                            :auto-upload="false">
                            <!-- <el-link type="primary" :underline="false">修改</el-link> -->
                                <div slot="file" slot-scope="{file}">
                                    <img
                                        style="width:100%;height:100%;background-size:100% 100%;"
                                        class="el-upload-list__item-thumbnail"
                                        :src="file.url" alt=""
                                    >
                                    <span class="el-upload-list__item-actions">
                                        <span
                                        class="el-upload-list__item-preview"
                                        @click="handlePictureCardPreview(file)"
                                        >
                                        <i class="el-icon-zoom-in"></i>
                                        </span>
                                    </span>
                                </div>
                            </el-upload>
                        </div>
                    </div>
           </div>
             <div  v-if='fileList6.length>0' class="identity" style="border-top: 1px solid #ccc;margin-top:20px;">
                <div class="pice ident"  style="width:100%">
                    <p>委托书</p>
                    <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :file-list="fileList6"
                    :on-change="(file,fileList)=>handleChange1(file,fileList,'fileList6','attorney_files_warehouses_id')"
                    :auto-upload="false">
                    <el-link type="primary" :underline="false">修改</el-link>
                        <div slot="file" slot-scope="{file}">
                            <img
                                style="width:100%;height:100%;background-size:100% 100%;"
                                class="el-upload-list__item-thumbnail"
                                :src="file.url" alt=""
                            >
                            <span class="el-upload-list__item-actions">
                                <span
                                class="el-upload-list__item-preview"
                                @click="handlePictureCardPreview(file)"
                                >
                                <i class="el-icon-zoom-in"></i>
                                </span>
                            </span>
                        </div>
                    </el-upload>
                </div>
          </div>
              <!-- 有则显示 -->
            <div v-if="fileList.length>0" class="identity" style="border-top: 1px solid #ccc;margin-top:20px;">
                <div class="pice ident">
                    <p>培训证明</p>
                        <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :file-list="fileList"
                    :on-change="handleChange"
                    :auto-upload="false">
                    <!-- <el-link type="primary" :underline="false">修改</el-link> -->
                        <div slot="file" slot-scope="{file}">
                            <img
                                style="width:100%;height:100%;background-size:100% 100%;"
                                class="el-upload-list__item-thumbnail"
                                :src="file.url" alt="">
                            <span class="el-upload-list__item-actions">
                                <span
                                class="el-upload-list__item-preview"
                                @click="handlePictureCardPreview(file)"
                                >
                                <i class="el-icon-zoom-in"></i>
                                </span>
                            </span>
                        </div>
                    </el-upload>
                </div>
            </div>
           <div class="remarks">
               <p>备注</p>
               {{datas1.memo}}
               <!-- <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入内容"
                v-model="textarea">
                </el-input> -->
           </div>
        </div>
        <div class="footers">
            <el-button @click="Back">返回</el-button>
        </div>
    </div>
</template>
<script>
import {mapActions} from 'vuex'
import help from '@/assets/js/common.js'
export default {
    data(){
        return{
            fileList1: [],
            fileList2: [],
            fileList3: [],
            fileList4: [],
            fileList5: [],
            fileList: [],
            fileList6:[],
            disabled: false,
            textarea:'',
            datas1:{},
            datas2:{},
            datas3:[],
            k:0,
            loading:{}
        }
    },
    props:{
        isPersonal:{
            type:Boolean
        },
        mainsId:{
            type:Number
        }
    },
    created(){
      // console.log(this.isPersonal,this.mainsId)
       this.Bind();
    },
    methods:{
      ...mapActions({
         getEmainDetails1:'loginModule/getEmainDetails1',
         getEmainDetails2:'loginModule/getEmainDetails2',
         getEmainDetails3:'loginModule/getEmainDetails3',
         getEmainDetails4:'loginModule/getEmainDetails4'
      }),
      getRQ(val){
        return help.getRQ(val)
      },
      Bind(){
          this.loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
         this.getEmainDetails1({id:this.mainsId}).then(res=>{
             this.k++;
             if(res.code==1){
                 this.datas1=res.data;
             }else{
                 this.$message({
                    message: res.msg,
                    type: 'warning'
                 });
             }
         })
        this.getEmainDetails2({repairs_inquire_mains_id:this.mainsId}).then(res=>{
            this.k++;
            if(res.code==1){
                this.datas2=res.data[0];
                // this.fileList1.splice(0,this.fileList1.length)
                this.fileList1.push({name:res.data[0].business_license_files.tits_all,url:res.data[0].business_license_files.urls})//营业执照
                this.fileList2.push({name:res.data[0].corporates_ID_positive_files.tits_all,url:res.data[0].corporates_ID_positive_files.urls})///法人身份证正面照id
                this.fileList3.push({name:res.data[0].corporates_ID_against_files.tits_all,url:res.data[0].corporates_ID_against_files.urls})///法人身份证反面面照id
                this.fileList4.push({name:res.data[0].apply_ID_positive_files.tits_all,url:res.data[0].apply_ID_positive_files.urls})///申请人身份证反面面照id
                this.fileList5.push({name:res.data[0].apply_ID_against_files.tits_all,url:res.data[0].apply_ID_against_files.urls})///申请人身份证反面面照id
            }else{
                this.$message({
                    message: res.msg,
                    type: 'warning'
                });
            }
        })
        this.getEmainDetails3({
            column : ["id", "repairs_inquire_mains_id", "casename", "apply_files_warehouses_id", "promise_files_warehouses_id", "prove_files_warehouses_id", "repairs_baogao_files_warehouses_id"],  //可指定返回字段
            filter:{ 
                 repairs_inquire_mains_id : this.mainsId  
            },  
            offset : 0,
            limit : 0 }).then(res=>{
                this.k++;
            console.log(res,'res3')
            if(res.code==1){
                this.datas3.splice(0,this.datas3.length);
                for(let i=0;i<res.data.list.length;i++){
                    let prove_filess=[];
                    for(let j=0;j<res.data.list[i].prove_files.length;j++){
                       prove_filess.push([{name:res.data.list[i].prove_files[j].tits_all,url:res.data.list[i].prove_files[j].urls}])
                    }
                    let fileList1=[];
                     for(let j1=0;j1<res.data.list[i].promise_files.length;j1++){
                       fileList1.push([{name:res.data.list[i].promise_files[j1].tits_all,url:res.data.list[i].promise_files[j1].urls}])
                    }
                     let fileList2=[];
                     for(let j2=0;j2<res.data.list[i].apply_files.length;j2++){
                       fileList2.push([{name:res.data.list[i].apply_files[j2].tits_all,url:res.data.list[i].apply_files[j2].urls}])
                    }
                    this.datas3.push({
                        casename:res.data.list[i].casename,
                        prove_files:prove_filess,
                        fileList1:fileList1,
                        fileList2:fileList2
                    })
                }
            }else{
                this.$message({
                    message:res.msg,
                    type:'warning'
                })
            }
        })
        this.getEmainDetails4({
            column : ["id", "repairs_inquire_mains_id", "train_files_warehouses_id"],
            filter:{
            repairs_inquire_mains_id : this.mainsId 
            },  
            offset : 0,
            limit : 0
        }).then(res=>{
           this.k++;
           this.fileList.splice(0,this.fileList.length)
           //console.log(res,'res4')
           if(res.code==1){
                if(res.data!=null&&res.data.hasOwnProperty("list")){
                    for(let i=0;i<res.data.list[0].train_files.length;i++){
                         this.fileList.push({name:res.data.list[0].train_files[i].tits_all,url:res.data.list[0].train_files[i].urls})
                    }
                    for(let i=0;i<res.data.list[0].attorney_files.length;i++){
                            this.fileList6.push({name:res.data.list[0].attorney_files[i].tits_all,url:res.data.list[0].attorney_files[i].urls})
                    }
                 }
           }else{
               this.$message({
                   message:res.msg,
                   type:'warning'
               })
           }
             //console.log(res,'培训证明',this.fileList)
         })
      },
      Back(){
         this.$emit('isgoBack','back');
      },
      handleChange(file, fileList) {
            this.fileList = fileList.slice(-1);
      },
      handleRemove(file) {
        //console.log(file);
      },
      handlePictureCardPreview(file) {
        this.$emit('imgok',file.url)
      },
      handleDownload(file) {
        console.log(file);
      }
    },
    watch:{
        k: {
        　　handler(newName, oldName) {
              if(this.k>=4){
                  this.loading.close();
                  this.k=0;
              }
        　　},
        }
    }
}
</script>
<style lang='scss' scoped>
// ::v-deep .el-upload--picture-card{
//     width:0!important;
// }
// ::v-deep .el-upload-list--picture-card .el-upload-list__item{
//     border:none!important;
//     height:inherit!important;
// }
// ::v-deep .el-upload--picture-card{
//     border:none;
//     width: 60px;
//     line-height: 0;
//     position: relative;
//     margin-right: 20px;
// }

::v-deep .el-upload-list--picture-card .el-upload-list__item{
   // border:none!important;
   width:180px;
   height:180px;
}
::v-deep .el-upload-list--picture-card .el-upload-list__item-thumbnail{
    object-fit: contain;
    height: 180px!important;
}
::v-deep .el-upload{
    display: block;
}
::v-deep .el-upload--picture-card{
    border:none;
    // width: 60px;
    line-height: 0;
    position: relative;
    margin-right: 20px;
    height:0;
    margin-top:10px;
    margin-left: 20px;
}


::v-deep .el-link.el-link--primary{
    position: absolute;
    bottom: 7px;
    left:0;
}
.mater1{
    border-top: 1px solid #ccc;
    padding-top:20px;
    margin-top:20px;
}
.update{
    
     .identity{
        display: flex;
        justify-content: space-between;
        .ident{
            width:50%;
            display: flex;
        }
     }
     .title{
        font-size: 18px;
        color:#333;
        padding: 8px;
        width: 100%;
        border-bottom: 1px solid #ccc;
        padding-left: 15px;
        margin-bottom: 20px;
        font-weight: bold;
     }
     .pice{
        font-size: 14px;
        font-weight: bold;
        color:#333;
        margin-top:20px;
        p{
              margin-right: 20px;
        }
     }
     .info{
        .mation{      
            ul{
                width: 95%;
                margin: 0 auto;
                li{
                    display: flex;
                    justify-content: space-between;
                    font-size:14px;
                    color: #333;
                    padding: 12px 0;
                    p{
                         display: flex;
                         justify-content: space-between;
                         &:first-child{
                           width: 35%;
                         }
                         &:last-child{
                           width:45%;
                         }
                         span{
                            &:first-child{

                               font-weight: bold;
                               padding-right: 20px;
                            } 
                         }
                    }
                }
            }
        }
        .license{
            padding-left: 20px;
            display: flex;
        }
        .applicant{
            margin:0 auto;
            width:95%;
            margin-top: 20px;
                display: flex;
                justify-content: space-between;
                font-size:14px;
                color: #333;
                padding: 12px 0;
                p{
                        display: flex;
                        justify-content: space-between;
                        &:first-child{
                        width: 25%;
                        }
                        &:last-child{
                        width:45%;
                        }
                        span{
                        &:first-child{

                            font-weight: bold;
                            padding-right: 20px;
                        } 
                        }
                }
        }
      
     }
     .Material{
         margin: 0 auto;
        margin-top: 20px;
        width: 95%;
        .case{
            font-size: 14px;
            color:#333;
            span{
                margin-right: 30px;
                font-weight: bold;
            }
        }
        .mediate{
            display: flex;
            p{
                width:30%;
            }
            .uploadmedia{
                display: flex;
                flex-wrap: wrap;
            }
        }
        .remarks{
            display: flex;
            margin:20px 0;
            p{
                font-size:14px;
                font-weight: bold;
                color:#333;
              width:80px;
            }
            input{
                width:60%;
            }
        }
     }
    .footers{
        text-align: center;
    }
} 

   

</style>