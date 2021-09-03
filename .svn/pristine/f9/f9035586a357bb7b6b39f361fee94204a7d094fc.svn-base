<template>
    <div class="examine warp">
        <div class="title">当前  >>  {{this.$store.state.titles}}</div>
        <div class="main">
            <span>
                 <el-input v-model="name" placeholder="用户名称"></el-input>
            </span>
             <span>
                 <el-input v-model="zhuti" placeholder="修复主体"></el-input>
            </span>
             <span>
                 <el-button type="primary" @click="Bind(0)">搜索</el-button>
            </span>
            <span>
                 <el-button type="primary" @click="onLoadre">刷新</el-button>
            </span>
            <span>
               状态：
                <el-select v-model="channel" placeholder="请选择" @change="Bind(0)">
                    <el-option
                    v-for="item in channels"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </span>
           <div class="table">
                <el-table
                :data="tableData"
                 v-loading="loading"
                border
                style="width: 100%">
                    <el-table-column
                        label="用户名称">
                        <template v-if="scope.row.user" slot-scope="scope">
                           {{scope.row.user.admins}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="联系方式">
                         <template v-if="scope.row.user" slot-scope="scope">
                           {{scope.row.user.cellphones}}
                        </template>
                    </el-table-column>
                     <el-table-column
                        label="修复主体">
                        <template slot-scope="scope">
                           {{scope.row.ss_id!=''&&scope.row.ss_id!=null?scope.row.ss_name+'('+scope.row.ss_id+')':scope.row.ss_name}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="订单号">
                        <template v-if="scope.row.order" slot-scope="scope">
                           {{scope.row.order.orders_sn}}
                        </template>
                    </el-table-column>
                     <el-table-column
                        label="时间">
                         <template slot-scope="scope">
                            {{getRQ(scope.row.add_times)}}
                        </template>
                    </el-table-column> 
                    <el-table-column
                        label="状态">
                        {{channel==1?'审核成功':channel==2?'驳回':channel==3?'待审核':''}}
                    </el-table-column> 
                    <el-table-column
                        label="操作"
                        align="center">
                        <template slot-scope="scope">
                             <el-button v-if="channel==3" @click="operations(1,scope.row)" type="primary">审核</el-button>
                             <el-button v-if="channel==1" @click="operations(0,scope.row)">查看详情</el-button>
                             <el-button v-if="channel==2" @click="operations(0,scope.row)">查看原因</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="page">
                          <el-pagination
                                @current-change="handleSizeChange"
                                background
                                :current-page.sync="page"
                                :page-size="limit"
                                layout="total, prev, pager, next"
                                :total="total">
                            </el-pagination>
                </div>
           </div>
        </div>
        <el-dialog title="审核" :visible.sync="dialogFormVisible">
              <update v-if='dialogFormVisible' :mainsId="mainsId" :isPersonal="isPersonal" @imgok='ImgsOK' @isgoBack="goBack"/>
        </el-dialog>
        <el-dialog title="查看" :visible.sync="dialogSelect">
              <selects v-if='dialogSelect' :mainsId="mainsId" :isPersonal="isPersonal" @imgok='ImgsOK' @isgoBack="goBack"/>
        </el-dialog>
        <el-dialog  :visible.sync="dialogVisibleImg">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
   </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";  
import update from "./components/update.vue"
import selects from "./components/selects.vue"
import help from '@/assets/js/common.js'
export default {
    name:'examine',
    data() {
        return {
            name:'',
            zhuti:'',
            channel:3,
            channels:[//1审核成功2驳回3待审核
                {
                value: 1,
                label: '通过'
                },
                {
                value: 2,
                label: '驳回'
                },
                {
                value: 3,
                label: '待审核'
                }
            ],
            dialogFormVisible:false,//审核
            tableData:[],
            dialogImageUrl:'',
            dialogVisibleImg:false,
            loading:true,
            total:0,
            limit:10,
            page:1,
            isPersonal:false,//是否是个人
            dialogSelect:false,//查看
            mainsId:0,
        }
    },
    components:{
        update,
        selects
    },
    mounted(){
       
    },
    created(){
       this.Bind(0);
    },
    methods:{
       ...mapActions({
         getEmainsList:'loginModule/getEmainsList',
         getUsersmains:'loginModule/getUsersmains',
         getZhuti:'loginModule/getZhuti'
       }),
       goBack(val){
            this.dialogSelect=false;
            this.dialogFormVisible=false;
            if(val=="ok"){
                this.Bind(0);
            }
       },
       operations(val,item){
          this.isPersonal=parseInt(item.type)==1?true:parseInt(item.type)==2?false:'';// 1个人 2企业
        //   this.isPersonal=true;
           this.mainsId=parseInt(item.id);
           if(val==1){//审核
              this.dialogFormVisible=true;
           }else{//查看
              this.dialogSelect=true;
           }
       },
       onLoadre(){ 
           this.name='';
           this.zhuti='';
           this.Bind(0);
       },
      async Bind(offset){
            if(offset==0)
                this.page=1;
            this.loading=true;
            let data={
                column:["id", "ss_name", "ss_id", "times", "add_times", "users_mains_id", "type", "apply_status"],
                filter:{
                    apply_status : this.channel
                },
                orderby: "times desc",
                offset : offset,
                limit : 10
            }
            let nameArray=[],zhutiArray=[];
           if(this.name!=''&&this.name!=null){
               await this.getUsersmains({
                    column: ["id"], 
                    filter:{ 
                       _like_admins : this.name 
                    }, 
                    offset: 0, 
                    limit : 0  
                }).then(res=>{
                   if(res.code==1){
                      //console.log(res,'resasdadad')
                       if(res.data.list.length==0){
                           nameArray.push(0)
                       }
                       for(let i=0;i<res.data.list.length;i++){
                            nameArray.push(res.data.list[i].id)
                       } 
                   }
                })
            }
            if(this.zhuti!=''&&this.zhuti!=null){
               await this.getZhuti({
                    column : ["id","users_mains_id"],
                    filter:{
                        _like_ss_name : this.zhuti,
                        _orlike_ss_id : this.zhuti
                    },  
                    offset : 0,
                    limit : 0
                }).then(res=>{
                    //console.log(res)
                       if(res.code==1){
                        if(res.data.list.length==0){
                            zhutiArray.push(0)
                        }
                       for(let i=0;i<res.data.list.length;i++){
                            zhutiArray.push(res.data.list[i].id)
                       } 
                   }
                })
            }
            if(nameArray.length>=1){
                 data.filter._in_users_mains_id=nameArray.join(',')
            }
           if(zhutiArray.length>=1){
                 data.filter._in_id=zhutiArray.join(',')
            }
           this.getEmainsList(data).then((res)=>{
                 this.loading=false;
                if(res.code==1){
                    this.tableData.splice(0,this.tableData.length);
                    this.tableData=res.data.list;
                    this.total=parseInt(res.data.count);
                    this.limit=10;
                }else{
                    this.$message.error(res.msg);
                }
           })
        },
       getRQ(val){
        return help.getRQ(val)
       },
       ImgsOK(val){
           this.dialogImageUrl=val;
           this.dialogVisibleImg=true;
       },
       handleClick(row) {
          this.dialogFormVisible=true;
       },
       handleSizeChange(val){
           this.Bind((val-1)*this.limit)
       }
    }
}
</script>
<style lang='scss' scoped>
::v-deep .el-date-editor .el-range-separator{
    padding: 0;
}
.examine{
    .title{
        width: 100%;
        background: #fff;
        font-size: 15px;
        color: #666;
        width: 100%;
        padding: 15px 20px;
    }
    .main{
         box-shadow: 0px 0px 8px 0px rgba(100, 100, 100, 0.17);
         background: #fff;
         margin-top: 10px;
         padding: 20px 10px;
         padding-bottom: 70px;
        span{
            margin-right: 10px;
            ::v-deep .el-input{
                width: 280px;
                display: inline-block;

            }
        }
        .table{
            margin-top: 40px;
            .page{
                margin-top: 20px;
                float: right;
            }
        }
    }
}

</style>