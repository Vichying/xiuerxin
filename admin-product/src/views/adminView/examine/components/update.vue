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
                    :on-change="(file,fileList)=>handleChange1(file,fileList,'fileList1','business_license_files_warehouses_id')"
                    :auto-upload="false">
                        <el-link  type="primary" @click.stop="handlePictureCardPreview(fileList1[0])" :underline="false">查看大图</el-link>
                        <el-link type="primary" style="margin-left:100px" :underline="false">修改</el-link>
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
                    :on-change="(file,fileList)=>handleChange1(file,fileList,'fileList2','corporates_ID_positive_files_warehouses_id')"
                    :auto-upload="false">
                       <el-link  type="primary" @click.stop="handlePictureCardPreview(fileList2[0])" :underline="false">查看大图</el-link>
                       <el-link type="primary" style="margin-left:100px" :underline="false">修改</el-link>
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
                    :on-change="(file,fileList)=>handleChange1(file,fileList,'fileList3','corporates_ID_against_files_warehouses_id')"
                    :auto-upload="false">
                       <el-link  type="primary" @click.stop="handlePictureCardPreview(fileList3[0])" :underline="false">查看大图</el-link>
                       <el-link type="primary" style="margin-left:100px" :underline="false">修改</el-link>
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
                    :on-change="(file,fileList)=>handleChange1(file,fileList,'fileList4','apply_ID_positive_files_warehouses_id')"
                    :auto-upload="false">
                        <el-link  type="primary" @click.stop="handlePictureCardPreview(fileList4[0])" :underline="false">查看大图</el-link>
                        <el-link type="primary" style="margin-left:100px" :underline="false">修改</el-link>
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
                    :on-change="(file,fileList)=>handleChange1(file,fileList,'fileList5','apply_ID_against_files_warehouses_id')"
                    :auto-upload="false">
                        <el-link  type="primary" @click.stop="handlePictureCardPreview(fileList5[0])" :underline="false">查看大图</el-link>
                        <el-link type="primary" style="margin-left:100px" :underline="false">修改</el-link>
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
                                :on-change="(file,fileList)=>handleChange2(file,fileList,cn,'prove_files_warehouses_id','img'+index,item.id)"
                                :auto-upload="false">
                                    <el-link  type="primary" @click.stop="handlePictureCardPreview(cn[0])" :underline="false">查看大图</el-link>
                                    <el-link type="primary" style="margin-left:100px" :underline="false">修改</el-link>
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
                            :on-change="(file,fileList)=>handleChange2(file,fileList,fl1,'promise_files_warehouses_id','img'+index,item.id)"
                            :auto-upload="false">
                                    <el-link  type="primary" @click.stop="handlePictureCardPreview(fl1[0])" :underline="false">查看大图</el-link>
                                    <el-link type="primary" style="margin-left:100px" :underline="false">修改</el-link>
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
                              :on-change="(file,fileList)=>handleChange2(file,fileList,fl2,'apply_files_warehouses_id','img'+index,item.id)"
                            :auto-upload="false">
                                    <el-link  type="primary" @click.stop="handlePictureCardPreview(fl2[0])" :underline="false">查看大图</el-link>
                                    <el-link type="primary" style="margin-left:100px" :underline="false">修改</el-link>
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
                                    <el-link  type="primary" @click.stop="handlePictureCardPreview(fileList6[0])" :underline="false">查看大图</el-link>
                                    <el-link type="primary" style="margin-left:100px" :underline="false">修改</el-link>
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
                            :on-change="(file,fileList)=>handleChange1(file,fileList,'fileList','train_files_warehouses_id')"
                            :auto-upload="false">
                                     <el-link  type="primary" @click.stop="handlePictureCardPreview(fileList[0])" :underline="false">查看大图</el-link>
                                    <el-link type="primary" style="margin-left:100px" :underline="false">修改</el-link>
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
               <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入内容"
                v-model="memo">
                </el-input>
           </div>
        </div>
        <div class="footers">
            <el-button :disabled="disableds" @click="update(1)" type="primary">通过</el-button>
            <el-button @click="$emit('isgoBack','back')">取 消</el-button>
            <el-button :disabled="disableds" @click="update(2)" type="danger">驳回</el-button>
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
            fileList6: [],
            fileList: [],
            disabled: false,
            memo:'',//备注
            datas1:{},
            datas2:{},
            datas3:[],
            loading:{},
            k:0,
            business_license_files_warehouses_id:0,//营业执照
            corporates_ID_positive_files_warehouses_id:0,//法人身份证正面
            corporates_ID_against_files_warehouses_id: 0, //法人身份证反面照id
            apply_ID_positive_files_warehouses_id: 0, //申请人身份证正面照id
            apply_ID_against_files_warehouses_id: 0 ,//申请人身份证反面照id
            detailsData:[],
            listID1:0,
            listID2:0,
            listID3:[],
            listID4:0,
            train_files_warehouses_id: 0, //培训证书id
            attorney_files_warehouses_id:0,//委托书文件id
            tongg:0,
            disableds:false
           
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
       //console.log(this.isPersonal,this.mainsId)
       this.Bind();
    },
    methods:{
      ...mapActions({
         getEmainDetails1:'loginModule/getEmainDetails1',
         getEmainDetails2:'loginModule/getEmainDetails2',
         getEmainDetails3:'loginModule/getEmainDetails3',
         getEmainDetails4:'loginModule/getEmainDetails4',
         uploadFile:'loginModule/uploadFile',
         updateDetails2:'loginModule/updateDetails2',//基本信息
         updateDetails3:'loginModule/updateDetails3',//材料修改
         updateDetails4:'loginModule/updateDetails4',//培训
         updateDetails1:'loginModule/updateDetails1'//审核
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
            // console.log(res,'res1')
             if(res.code==1){
                 this.datas1=res.data;
                 this.listID1=res.data.id;
             }else{
                 this.$message({
                    message: res.msg,
                    type: 'warning'
                 });
             }
         })
        this.getEmainDetails2({repairs_inquire_mains_id:this.mainsId}).then(res=>{
              this.k++;
              //console.log(res,'res2')
            if(res.code==1){
                this.datas2=res.data[0];
                this.listID2=res.data[0].id;
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
            //console.log(res,'res3')
             this.k++;
            if(res.code==1){
                this.datas3.splice(0,this.datas3.length);
                this.listID3.splice(0,this.listID3.length);
                for(let i=0;i<res.data.list.length;i++){
                    this.listID3.push(res.data.list[i].id);
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
                        id:res.data.list[i].id,
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
            column : ["id", "repairs_inquire_mains_id", "train_files_warehouses_id","attorney_files_warehouses_id"],
            filter:{
            repairs_inquire_mains_id : this.mainsId 
            },  
            offset : 0,
            limit : 0
        }).then(res=>{
            // console.log(res,'res4')
             this.k++;
           this.fileList.splice(0,this.fileList.length)
           this.fileList6.splice(0,this.fileList6.length)
           if(res.code==1){
                if(res.data!=null&&res.data.hasOwnProperty("list")){
                       this.listID4=res.data.list[0].id;
                       // console.log(res.data.list[0].train_files,res.data.list[0].attorney_files,'ressdasd4')
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
         }) 
      },
      update(val){
          if(val!=2){//不是驳回
           
                   let par2={
                        id : this.listID2
                    }
                    if(this.corporates_ID_positive_files_warehouses_id!=0)
                      par2.corporates_ID_positive_files_warehouses_id=this.corporates_ID_positive_files_warehouses_id;
                    if(this.corporates_ID_against_files_warehouses_id!=0)
                      par2.corporates_ID_against_files_warehouses_id=this.corporates_ID_against_files_warehouses_id;
                    if(this.business_license_files_warehouses_id!=0)
                      par2.business_license_files_warehouses_id=this.business_license_files_warehouses_id;
                    if(this.apply_ID_positive_files_warehouses_id!=0)
                      par2.apply_ID_positive_files_warehouses_id=this.apply_ID_positive_files_warehouses_id;
                    if(this.apply_ID_against_files_warehouses_id!=0)
                      par2.apply_ID_against_files_warehouses_id=this.apply_ID_against_files_warehouses_id;
                    //console.log(par2,'par2')
                    this.updateDetails2(par2).then(res=>{//基本信息
                      // console.log(res,'resok1')
                        if(res.code==1){
                             this.tongg++;
                        }else{
                            this.$message({
                                message:res.msg,
                                type:"warning",
                            })
                        }
                    })
                
                    //console.log(this.detailsData)
                    if(this.detailsData.length>0){
                        for(let i=0;i<this.detailsData.length;i++){
                                let par3={
                                    id:this.detailsData[i].key
                                }
                                if(this.detailsData[i].hasOwnProperty('apply_files_warehouses_id')){
                                    let val=[];
                                    for(let j=0;j<this.detailsData[i].apply_files_warehouses_id.length;j++){
                                        for(let key in this.detailsData[i].apply_files_warehouses_id[j]){
                                          val.push(this.detailsData[i].apply_files_warehouses_id[j][key])
                                        }
                                    }
                                    par3.apply_files_warehouses_id=val.join(',');
                                }
                                 if(this.detailsData[i].hasOwnProperty('promise_files_warehouses_id')){
                                    let val=[];
                                    for(let j=0;j<this.detailsData[i].promise_files_warehouses_id.length;j++){
                                        for(let key in this.detailsData[i].promise_files_warehouses_id[j]){
                                          val.push(this.detailsData[i].promise_files_warehouses_id[j][key])
                                        }
                                    }
                                    par3.promise_files_warehouses_id=val.join(',');
                                }
                                if(this.detailsData[i].hasOwnProperty('prove_files_warehouses_id')){
                                    let val=[];
                                    for(let j=0;j<this.detailsData[i].prove_files_warehouses_id.length;j++){
                                        for(let key in this.detailsData[i].prove_files_warehouses_id[j]){
                                          val.push(this.detailsData[i].prove_files_warehouses_id[j][key])
                                        }
                                    }
                                    par3.prove_files_warehouses_id=val.join(',');
                                }
                                   // console.log(par3,'par3')
                                    this.updateDetails3(par3).then(res=>{
                                      // console.log(res,'resok2')
                                       if(res.code==1){
                                            this.tongg++;
                                        }else{
                                            this.$message({
                                                message:res.msg,
                                                type:"warning",
                                            })
                                        }
                                    })
                        }
                    }
                    if(this.listID4!=0){
                             let par4={
                                id : this.listID4
                            }
                            if(this.train_files_warehouses_id!=0)
                                par4.train_files_warehouses_id=this.train_files_warehouses_id;
                            if(this.attorney_files_warehouses_id!=0)
                                par4.attorney_files_warehouses_id=this.attorney_files_warehouses_id;
                            this.updateDetails4(par4).then(res=>{
                               // console.log(res,'ok4')
                                if(res.code==1){
                                    this.tongg++;
                                }else{
                                    this.$message({
                                        message:res.msg,
                                        type:"warning",
                                    })
                                }
                            })
                    }
                 
                
          }
          if(val==2){
              if(this.memo==""||this.memo==null){
                  this.$message({
                      message:'请填写驳回理由',
                      type:'warning'
                  })
                  return ;
              }
          }
          this.disableds=true;
           this.updateDetails1({
                  id : this.mainsId ,  //repairs_inquire_mains表id
                  apply_status: val, //审核状态   1审核成功2驳回3待审核
                  memo : this.memo   //备注
            }).then(res=>{
               // console.log(res,'tongg');
                if(res.code==1){
                      this.tongg++;
                    if(val==2){
                        this.$emit('isgoBack','ok')
                        this.$message({
                            message:'操作成功！',
                            type:"success",
                        })
                    }
                }else{
                     this.$message({
                        message:res.msg,
                        type:"warning",
                    })
                }
                
            })
      },
      handleChange1(file,fileList,inImg,imgId) {
            var formdata=new FormData();
            formdata.append("formdata",file.raw);
            this.uploadFile(formdata).then(res=>{
                if(res.code==1){
                      this[imgId]=res.data.formdata[0];
                      this[inImg] = fileList.slice(-1);
                }else{
                    this.$message({
                        type:"warning",
                        message:res.msg
                    })
                }
            })
      },
      handleChange2(file,fileList,inImg,imgId,keys,itemid) {
       // console.log(this.detailsData,imgId,keys,itemid)
            var formdata=new FormData();
            formdata.append("formdata",file.raw);
            this.uploadFile(formdata).then(res=>{
                if(res.code==1){
                     // this[imgId]=res.data.formdata[0];
                    inImg.splice(0,inImg.length)
                    inImg.push(file);
                    let kg=0,kgg=0;
                    if(this.detailsData.length>0){
                                 for(let i=0;i<this.detailsData.length;i++){
                                    if(this.detailsData[i].key==itemid){
                                        //console.log('2222',this.detailsData[i][''+imgId+''])
                                        if(this.detailsData[i].hasOwnProperty(imgId)){
                                               for(let j=0;j<this.detailsData[i][''+imgId+''].length;j++){
                                                    if(this.detailsData[i][''+imgId+''][j].hasOwnProperty(keys)){
                                                        this.detailsData[i][''+imgId+''][j][''+keys+'']=res.data.formdata[0];
                                                        kg=1;
                                                    }
                                                }
                                                if(kg==0){
                                                    let a='{"'+keys+'":"'+res.data.formdata[0]+'"}';
                                                    this.detailsData[i][''+imgId+''].push(JSON.parse(a))
                                                }
                                        }else{
                                            let a='[{"'+keys+'":"'+res.data.formdata[0]+'"}]';
                                            this.detailsData[i][''+imgId+'']=(JSON.parse(a))
                                        }
                                        kgg=1;
                                    }
                                }
                                if(kgg==0){//另一个案件
                                     let a='{"key":'+itemid+',"'+imgId+'":[{"'+keys+'":"'+res.data.formdata[0]+'"}]}';
                                     this.detailsData.push(JSON.parse(a))
                                }
                    }else{
                            let a='{"key":'+itemid+',"'+imgId+'":[{"'+keys+'":"'+res.data.formdata[0]+'"}]}';
                            this.detailsData.push(JSON.parse(a))
                    }
                   //console.log(this.detailsData)
              




                }else{
                    this.$message({
                        type:"warning",
                        message:res.msg
                    })
                }
            })
      },
      handlePictureCardPreview(file) {
         //console.log(file)
        this.$emit('imgok',file.url)
      },
    },
    watch:{
        k: {
        　　handler(newName, oldName) {
              if(this.k>=4){
                  this.loading.close();
                  this.k=0;
              }
        　　},
        },
         tongg: {
        　　handler(newName, oldName) {
           
            let k=4;
            if(this.listID4==0){
                k--;
            }
            if(this.detailsData.length==0){
                k--;
            }
            if(this.tongg>=k){
                  this.loading.close();
                  this.$emit('isgoBack','ok')
                    this.$message({
                        message:'操作成功！',
                        type:"success",
                    })
                  this.tongg=0;
              }
        　　},
        }
    }
}
</script>
<style lang='scss' scoped>
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