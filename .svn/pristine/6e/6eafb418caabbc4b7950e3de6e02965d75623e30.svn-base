<template>
    <div class="staff warp">
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
                        prop="id"
                          align="center"
                        label="管理员ID" >
                    </el-table-column>
                     <el-table-column
                       align="center"
                        prop="admins"
                        label="账号名">
                    </el-table-column> 
                    <el-table-column
                       align="center"
                        prop="status"
                        label="是否启用">
                         <template slot-scope="scope">
                             {{scope.row.status=='1'?'启用':scope.row.status=='0'?'停用':scope.row.status}}
                        </template>
                    </el-table-column> 
                    <el-table-column
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
                                <el-popconfirm title="确定删除吗？" @onConfirm="Delete(scope.row)">
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
import update from './components/update.vue'
import insert from './components/insert.vue'
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
            getAdminList:'loginModule/getAdminList',
            deleteAdmin:'loginModule/deleteAdmin',
            insertJournal:'loginModule/insertJournal'
        }),
        getRQ(val){
          return help.getRQ(val)
        },
        Delete(val){ 
           // console.log(val)
            this.deleteAdmin({id:[parseInt(val.id)]}).then(res=>{
                if(res.code==1){
                    this.$message({
                            message: '删除成功！',
                            type: 'success'
                    });
                     let data={
                                plate:'管理员管理',
                                plateRouter:'/staff',
                                user:this.$store.state.userInfo.identity_name,
                                // userId:this.$store.state.user.info.userId,
                                userId:111,
                                action:3,
                                time:new Date(),
                                content:{
                                    '账号名':val.admins,
                                    '是否启用':parseInt(val.status)==1?'启用':'停用',
                                    '密码':val.psws
                                }
                            }
                    this.insertJournal(data);
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
                offset : offset,
                limit :10
            }
           this.getAdminList(data).then((res)=>{
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
.staff{
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