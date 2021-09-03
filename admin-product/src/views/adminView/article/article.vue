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
                        prop="title"
                          align="center"
                        label="标题" >
                    </el-table-column>
                     <el-table-column
                       align="center"
                        prop="created_at"
                        label="创建时间">
                    </el-table-column> 
                    <el-table-column
                       align="center"
                        prop="recommend"
                        label="是否推荐">
                         <template slot-scope="scope">
                             {{scope.row.recommend=='1'?'是':scope.row.recommend=='0'?'否':scope.row.recommend}}
                        </template>
                    </el-table-column> 
                     <el-table-column
                       align="center"
                        prop="lex"
                        label="文章类型">
                    </el-table-column> 
                    <el-table-column
                        align="center"
                        label="操作">
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
        <el-dialog width="60%" title="修改" :visible.sync="dialogFormVisible">
            <update :datas='formsdatas' v-if='dialogFormVisible' @formok="formok"></update>
        </el-dialog>
         <el-dialog width="60%" title="添加" :visible.sync="dialogFormVisibles">
            <insert  v-if='dialogFormVisibles' @formok="formoks"></insert>
        </el-dialog>
   </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";  
import update from './components/articleupdate.vue'
import insert from './components/articleinsert.vue'
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
            getArtList:'loginModule/getArtList',
            getArtTypeList:'loginModule/getArtTypeList',
            deleteArt:'loginModule/deleteArt'
        }),
        getRQ(val){
          return help.getRQ(val)
        },
        getname(id){
              let that=this;
             return new Promise(function (resolve, reject) {
                    that.getArtTypeList({
                         column : ["*"], //控制返回字段 非必填
                         filter:{ //查询条件  非必填
                           id:id
                         }, 
                         offset : 0,  //从第几条开始取， 0代表从第一条开始取
                         limit : 0  //每页取多少条
                    }).then(res=>{
                        if(res.code==1){
                            resolve(res.data.list[0].name);
                        }else{
                            this.$message.error(res.msg);
                             reject('reject return')
                        }
                    })
              })
        },
        Delete(val){ 
           // console.log(val)
            this.deleteArt({id:[parseInt(val)]}).then(res=>{
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
               " orderby": "updated_at desc",
                offset : offset,
                limit :10
            }
           this.getArtList(data).then(async (res)=>{
                if(res.code==1){
                    this.tableData.splice(0,this.tableData.length);
                    let array=[];
                    for(let i=0;i<res.data.list.length;i++){
                        let a=await this.getname(res.data.list[i].types_id);
                          array.push({
                                title:res.data.list[i].title,
                                created_at:res.data.list[i].created_at,
                                recommend:res.data.list[i].recommend,
                                lex:a,
                                id:res.data.list[i].id,
                                types_id: res.data.list[i].types_id,  //文章类型id
                                contents: res.data.list[i].contents, //内容
                                image_link: res.data.list[i].image_link,  //图片id
                                source: res.data.list[i].source, //文章来源id
                                image_link_files: res.data.list[i].image_link_files
                          })
                    }
                    this.tableData=array;
                    this.total=parseInt(res.data.count);
                    this.limit=10;
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