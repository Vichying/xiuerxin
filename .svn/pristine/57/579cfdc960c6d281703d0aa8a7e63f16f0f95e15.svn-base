<template>
    <div class="query warp">
        <div class="title">当前  >>  {{this.$store.state.titles}}</div>
        <div class="main">
            <span>
                <el-input v-model="ordersNumber" style="width:300px" placeholder="订单号"></el-input>
            </span>
             <!-- <span>
                类型：
                <el-select v-model="customer" placeholder="请选择"  @change="Bind(0)">
                    <el-option
                    v-for="item in customers"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </span> -->
            <span>
                 <el-button type="primary" @click="Bind(0)">搜索</el-button>
            </span>
            <span>
                 <el-button type="primary" @click="Refush">刷新</el-button>
            </span>
           <div class="table">
                <el-table
                :data="tableData"
                 v-loading="loading"
                border
                style="width: 100%">
                    <el-table-column
                        prop="id"  
                          align="center"
                        label="ID号" >
                    </el-table-column>
                     <el-table-column
                          align="center"
                          prop="phone" 
                        label="用户手机">
                    </el-table-column>
                     <el-table-column
                       align="center"
                        prop="orders_sn" 
                        label="订单号">
                    </el-table-column> 
                    <el-table-column
                      align="center"
                        prop="credits_types"
                        label="订单类型">
                         <template slot-scope="scope">
                             {{scope.row.credits_types==1?'个人单搜索':scope.row.credits_types==2?'企业单搜索':scope.row.credits_types==3?'修复费用':scope.row.credits_types==4?'查询次数':scope.row.credits_types}}
                        </template>
                    </el-table-column>
                     <el-table-column
                       align="center"
                        prop="creates_times"
                        label="下单时间">
                        <template slot-scope="scope">
                            {{getRQ(scope.row.creates_times)}}
                        </template>
                    </el-table-column>
                     <el-table-column
                       align="center"
                        prop="orders_status"
                        label="支付状态">
                         <template slot-scope="scope">
                                {{scope.row.orders_status==1?'已下单':scope.row.orders_status==2?'已支付':scope.row.orders_status==3?'已取消':scope.row.orders_status}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
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
        <el-dialog width="35%" title="订单详情" :visible.sync="dialogFormVisible">
            <datails :ids='formsdatas' :phone="phone" v-if='dialogFormVisible'></datails>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
   </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";  
import datails from './components/details.vue'
import help from '@/assets/js/common.js'
export default {
    name:'order',
    data() {
        return {
            customer:0,
            customers:[
                {
                    value: 0,
                    label: '全部'
                },
                 {
                    value: 1,
                    label: '个人体检'
                },
                 {
                    value: 2,
                    label: '企业体检'
                },
                 {
                    value: 3,
                    label: '修复'
                },
                {
                    value: 4,
                    label: '套餐充值'
                }        
                ],
            tableData:[],
            dialogFormVisible:false,
            loading:true,
            total:0,
            limit:8,
            page:1,
            formsdatas:0,
            ordersNumber:'',
            phone:''
        }
    },
    components:{
        datails
    },
    mounted(){
       
    },
    created(){
       this.Bind(0);
    },
    methods:{
        ...mapActions({
            getOrderList:'loginModule/getOrderList',
            getOrderDetails:'loginModule/getOrderDetails',
            getUserphone:'loginModule/getUserphone'
        }),
        getuserphone(id){
              let that=this;
             return new Promise(function (resolve, reject) {
                    that.getUserphone({id:id}).then(res=>{
                           if(res.code==1){
                            resolve(res.data.cellphones);
                        }else{
                            this.$message.error(res.msg);
                             reject('reject return')
                        }
                    })
              })
        },
        getRQ(val){
           return help.getRQ(val)
        },
        Bind(offset){
            if(offset==0)
              this.page=1;
            this.loading=true;
            let data={
                column:["*"],
                filter:{
                    status : '1'
                },
                orderby: "id desc",
                offset : offset,
                limit : 8
            }
            if(this.ordersNumber!=""&&this.ordersNumber!=null){
                data.filter.orders_sn=this.ordersNumber;
            }
            this.getOrderList(data).then(async (res)=>{
                if(res.code==1){
                    this.tableData.splice(0,this.tableData.length);
                    let array=[];
                    for(let i=0;i<res.data.list.length;i++){
                        let a= await this.getuserphone(res.data.list[i].users_id);
                        array.push({
                            id:res.data.list[i].id,
                            phone:a,
                            orders_sn:res.data.list[i].orders_sn,
                            credits_types:res.data.list[i].credits_types,
                            creates_times:res.data.list[i].creates_times,
                            orders_status:res.data.list[i].orders_status
                        })
                    }
                    this.tableData=array;
                    this.total=parseInt(res.data.count);
                    this.limit=8;
                }else{
                    this.$message.error(res.msg);
                }
                   this.loading=false;
           })
        },
        handleSizeChange(val){
           this.Bind((val-1)*this.limit)
        },
        handleClick(row) {
            this.formsdatas=parseInt(row.id);
            this.phone=row.phone;
            this.dialogFormVisible=true;
        },
        Refush(){
           this.ordersNumber="";
           this.Bind(0);
        },
        formok(){
               this.dialogFormVisible = false;
        }
    }
}
</script>
<style lang='scss' scoped>
::v-deep .el-date-editor .el-range-separator{
    padding: 0;
}
.query{
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
                width: 150px;
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