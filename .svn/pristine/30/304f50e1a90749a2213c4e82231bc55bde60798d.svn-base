<template>
    <div class="query warp">
        <div class="title">当前  >>  {{this.$store.state.titles}}</div>
        <div class="main">
            <p style="width:100%;text-align:right;padding-right:5%;">
                 <el-button type="primary" @click="dialogFormVisibles=true"><i style="margin-right:1em" class="el-icon-plus"></i>添加规则</el-button>
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
                        label="ID号" >
                    </el-table-column>
                     <el-table-column
                        prop="name"
                          align="center"
                        label="规则名">
                          <template slot-scope="scope">
                             {{scope.row.name==""||scope.row.name==null?'暂无':scope.row.name}}
                        </template>
                    </el-table-column>
                     <el-table-column
                       align="center"
                        prop="filtering_content"
                        label="过滤内容">
                    </el-table-column> 
                     <el-table-column
                        prop="type"
                          align="center"
                        label="是否可修复">
                         <template slot-scope="scope">
                            {{scope.row.type==1?'不可修复':scope.row.type==2?"严重":scope.row.type}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="filtering_content_type"
                          align="center"
                        label="是否包含">
                          <template slot-scope="scope">
                             {{scope.row.filtering_content_type==1?'不包含':scope.row.filtering_content_type==0?"包含":scope.row.filtering_content_type}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="status"
                          align="center"
                        label="状态">
                         <template slot-scope="scope">
                            {{scope.row.status==1?'使用中':scope.row.status==0?"未使用":scope.row.status}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="功能操作">
                        <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
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
        <el-dialog width="55%" title="修改规则" :visible.sync="dialogFormVisible">
            <update :datas='formsdatas' v-if='dialogFormVisible' @formok="formok"></update>
        </el-dialog>
         <el-dialog width="55%" title="添加规则" :visible.sync="dialogFormVisibles">
            <insert  v-if='dialogFormVisibles' @formok="formoks"></insert>
        </el-dialog>
   </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";  
import update from './components/ruleupdate.vue'
import insert from './components/ruleinsert.vue'
import help from '@/assets/js/common.js'
export default {
    name:'rule',
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
            ruleList:'loginModule/ruleList',
            deleteRuleList:'loginModule/deleteRuleList'
        }),
        getRQ(val){
          return help.getRQ(val)
        },
        Delete(val){ 
           // console.log(val)
            this.deleteRuleList({id:[parseInt(val)]}).then(res=>{
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
                orderby : "id desc",
                offset : offset,
                limit :10
            }
           this.ruleList(data).then((res)=>{
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
              // this.Bind((this.page-1)*this.limit);
               this.Bind(0);
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