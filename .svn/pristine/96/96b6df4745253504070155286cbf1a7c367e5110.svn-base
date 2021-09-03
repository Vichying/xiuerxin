<template>
    <div class="update">
           <el-form :model="form" :rules="rules" ref="ruleForm" style="margin-bottom:20px">
                 <el-form-item label="规则名称:" :label-width="formLabelWidth" >
                    <el-input  v-model="form.name" placeholder="请输入规则名称" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="规则类型:" :label-width="formLabelWidth">
                        <el-radio v-model="form.type" label="1">不可修复</el-radio>
                        <el-radio v-model="form.type" label="2">严重</el-radio>
                </el-form-item>
                 <el-form-item label="过滤关键词:" :label-width="formLabelWidth">
                        <el-input
                            type="textarea"
                            :rows="3"
                            placeholder="请输入过滤关键词使用英文,分割"
                            v-model="form.filtering_content">
                        </el-input>
                        <span>(关键词使用英文,分割)</span>
                </el-form-item>
                 <el-form-item label="是否包含:" :label-width="formLabelWidth">
                        <el-radio v-model="form.filtering_content_type" label="1">不包含</el-radio>
                        <el-radio v-model="form.filtering_content_type" label="0">包含</el-radio>
                </el-form-item>
               <el-form-item label="行业类别:" :label-width="formLabelWidth">
                    <el-select v-model="form.industry_involved" multiple  style="width:80%"  filterable
                            placeholder="请输入关键词">
                            <el-option
                                v-for="item in options"
                                :key="item.industrycocode"
                                :label="item.industryconame"
                                :value="item.industrycocode"
                            >
                            </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="字段选择:" :label-width="formLabelWidth">
                   <el-checkbox-group v-model="checkList">
                        <el-checkbox v-for="item in checkListB" :key="item.id" :label="item.id">{{item.tits}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="是否启用:" :label-width="formLabelWidth">
                        <el-radio v-model="form.status" label="0">不启用</el-radio>
                        <el-radio v-model="form.status" label="1">启用</el-radio>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
    </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex"; 
export default {
    name:'insert',
    data(){
        return{
           form:{
             name:this.datas.name,
             type:this.datas.type,
             filtering_content_type:this.datas.filtering_content_type,
             filtering_content:this.datas.filtering_content,
             status:this.datas.status,
             industry_involved:[]
           },
           rules:{},
           checkList:[],
           checkListB:[],
           formLabelWidth: '120px',
           options:[]
        }
    },
    props:{
        datas:{
            type:Object
        }
    },
    created(){
        this.Bind();
        if(this.datas.hasOwnProperty("industry_involved")&&this.datas.industry_involved!=null){
               let indus=[];
               for(let i=0;i<this.datas.industry_involved.length;i++){
                    indus.push(this.datas.industry_involved[i].industrycocode)
                }
                this.form.industry_involved=indus;
        }
        this.checkList=this.datas.datas_1.split(",");
    },
    methods:{
        ...mapActions({
           updateRuleList:'loginModule/updateRuleList',
           gethangruleList:'loginModule/gethangruleList',
           getzhiruleList:'loginModule/getzhiruleList'
        }),
        cancel(){
           this.$emit('formok',false);
        },
        Bind(){
            this.gethangruleList({offset : 0,limit :0}).then(res=>{
                if(res.code==1){
                   this.options=res.data.list;
                }
            })
            this.getzhiruleList({offset:0,limit :0}).then(res=>{
                if(res.code==1){
                    this.checkListB=res.data.list;
                }
            })
        },
        submit(){
              this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                     let a={
                        filtering_content: this.form.filtering_content,
                        filtering_content_type: this.form.filtering_content_type,
                        name: this.form.name,
                        type: this.form.type,
                        status:this.form.status,
                        datas_1:this.checkList.join(","),
                        datas_2:this.checkList.join(","),
                        datas_3:this.checkList.join(","),
                        datas_4:this.checkList.join(","),
                        datas_5:this.checkList.join(","),
                        datas_6:this.checkList.join(","),
                        datas_7:this.checkList.join(","),
                        datas_8:this.checkList.join(","),
                        datas_9:this.checkList.join(","),
                        datas_10:this.checkList.join(","),
                        datas_11:this.checkList.join(","),
                        datas_12:this.checkList.join(","),
                        datas_13:this.checkList.join(","),
                        datas_14:this.checkList.join(","),
                        datas_15:this.checkList.join(","),
                        datas_16:this.checkList.join(","),
                        datas_17:this.checkList.join(","),
                        datas_18:this.checkList.join(","),
                        datas_19:this.checkList.join(","),
                        datas_20:this.checkList.join(","),
                        id:this.datas.id,
                        industry_involved:this.form.industry_involved.join(",")
                     }
                    this.updateRuleList(a).then((res)=>{
                        if(res.code==1){
                            this.$message({
                                    message: '操作成功！',
                                    type: 'success'
                            });
                            this.$emit('formok','aaa');
                        }else{
                            this.$message.error(res.msg);
                        }
                    })
                }else {
                   // console.log('error submit!!');
                    return false;
                }
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.dialog-footer{
    text-align: right;
}
</style>