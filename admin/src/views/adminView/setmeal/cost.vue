<template>
    <div class="query warp">
        <div class="title">当前  >>  {{this.$store.state.titles}}</div>
        <div class="main">
            <p style="width:100%;text-align:right;padding-right:5%;">
                 <el-button type="primary" @click="dialogFormVisibles=true"><i style="margin-right:1em" class="el-icon-plus"></i>添加</el-button>
            </p>
           <div class="table">
                <el-table
                :data="tableData"
                 v-loading="loading"
                border
                style="width: 100%">
                    <el-table-column
                        prop="credits_types"
                          align="center"
                        label="费用类型" >
                        <template slot-scope="scope">
                             {{scope.row.credits_types==1?'信用体检':scope.row.credits_types==2?'信用修复':scope.row.credits_types}}
                        </template>
                    </el-table-column>
                     <el-table-column
                        prop="prices"
                          align="center"
                        label="价格(单位元)">
                    </el-table-column>
                     <el-table-column
                       align="center"
                        prop="status"
                        label="状态">
                          <template slot-scope="scope">
                             {{scope.row.status==1?'启用':scope.row.status==0?'未启用':scope.row.status}}
                        </template>
                    </el-table-column> 
                     <el-table-column
                       align="center"
                        prop="add_times"
                        label="创建时间">
                          <template slot-scope="scope">
                                 {{getRQ(scope.row.add_times)}}
                        </template>
                    </el-table-column> 
                   <el-table-column
                       align="center"
                        prop="times"
                        label="修改时间">
                          <template slot-scope="scope">
                             {{getRQ(scope.row.times)}}
                        </template>
                    </el-table-column> 
                    <el-table-column
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="text" size="small">修改套餐</el-button>
                                <el-popconfirm title="确定删除吗？" @onConfirm="Delete(scope.row.id)">
                                     <el-button slot="reference" type="text" size="small">删除</el-button>
                                </el-popconfirm>
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
        <el-dialog width="35%" title="修改" :visible.sync="dialogFormVisible">
            <update :datas='formsdatas' v-if='dialogFormVisible' @formok="formok"></update>
        </el-dialog>
         <el-dialog width="35%" title="添加" :visible.sync="dialogFormVisibles">
            <insert  v-if='dialogFormVisibles' @formok="formoks"></insert>
        </el-dialog>
   </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";  
import update from './components/constupdate.vue'
import insert from './components/constinsert.vue'
import help from '@/assets/js/common.js'
export default {
    name:'cost',
    data() {
        return {
            tableData:[],
            dialogFormVisible:false,
            loading:true,
            total:0,
            limit:10,
            page:1,
            emails:'',
            formsdatas:0,
            dialogFormVisibles:false
        }
    },
    components:{
        update,insert
    },
    mounted(){
       
    },
    created(){
       this.Bind(0);
    },
    methods:{
        ...mapActions({
            getCostList:'loginModule/getCostList',
            deleteSetmeal:'loginModule/deleteSetmeal'
        }),
        getRQ(val){
          return help.getRQ(val)
        },
        Delete(val){ 
            console.log(val)
            this.deleteSetmeal({id:[parseInt(val)]}).then(res=>{
                if(res.code==1){
                    this.$message({
                            message: '删除成功！',
                            type: 'success'
                    });
                    this.Bind(0);
                }else{
                    this.$message.error(res.msg);
                }
            })
        },
        Bind(offset){
            this.loading=true;
            let data={
                column:["*"],
                filter:{
                },
                orderby : "id desc",
                offset : offset,
                limit :10
            }
           this.getCostList(data).then((res)=>{
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
        handleSizeChange(val){
           this.Bind((val-1)*this.limit)
        },
        handleClick(row) {
            this.formsdatas=row;
            this.dialogFormVisible=true;
        },
        formok(val){
            if(val){
               this.Bind((this.page-1)*this.limit);
            }
               this.dialogFormVisible = false;
               this.dialogFormVisibles = false;
        },
        formoks(val){
            if(val){
               this.Bind(0);
            }
               this.dialogFormVisibles = false;
        }
    }
}
</script>
<style lang='scss' scoped>
::v-deep .el-date-editor .el-range-separator{
    padding: 0;
}
::v-deep.el-button--text{
    margin:0 10px;
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