<template>
    <div class="update">
           <el-form :model="form" :rules="rules" ref="ruleForm" style="margin-bottom:20px">
                 <el-form-item label="类型:" :label-width="formLabelWidth">
                        <el-radio v-model="form.credits_types" label="1">信用体检</el-radio>
                        <el-radio v-model="form.credits_types" label="2">信用修复</el-radio>  
                </el-form-item>
                <el-form-item label="价格:" :label-width="formLabelWidth">
                    <el-input-number v-model="form.prices" :min="0" :max="9999999999999999999"></el-input-number>
                </el-form-item>
                 <el-form-item label="状态:" :label-width="formLabelWidth">
                        <el-radio v-model="form.radio" label="1">启用</el-radio>
                        <el-radio v-model="form.radio" label="0">不启用</el-radio>
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
    name:'update',
    data(){

        return{
           form:{
             credits_types:this.datas.credits_types,
             prices:this.datas.prices,
             radio:this.datas.status
           },
           formLabelWidth: '120px',
           rules: {
            }
        }
    },
    props:{
      datas:{
          type:Object
      }
    },
    created(){
      // console.log(this.datas)
    },
    methods:{
        ...mapActions({
           updateCostList:'loginModule/updateCostList'
        }),
        cancel(){
           this.$emit('formok',false);
        },
        submit(){
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    let a={
                        id:this.datas.id,
                        credits_types: this.form.credits_types,
                        prices:this.form.prices,
                        status: this.form.radio
                    }
                    this.updateCostList(a).then((res)=>{
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