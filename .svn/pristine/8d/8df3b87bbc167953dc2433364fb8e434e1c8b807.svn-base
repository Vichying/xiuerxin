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
                 <el-form-item label="是否启用:" :label-width="formLabelWidth">
                        <el-radio v-model="form.status" label="1">启用</el-radio>
                        <el-radio v-model="form.status" label="0">不启用</el-radio>
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
         var validateNumbers = (rule, value, callback) => {
            if (value <=0) {
               callback(new Error('请输入套餐次数'));
            } else {
            if (this.form.numbers !== '') {
                this.$refs.ruleForm.validateField('numbers');
            }
            callback();
            }
        };
        return{
           form:{
             credits_types:'1',
             prices:'',
             status:'1'
           },
           formLabelWidth: '120px',
           rules: {
            numbers: [
                { validator: validateNumbers, trigger: 'blur' }
            ]
          }
        }
    },
    props:{
   
    },
    created(){

    },
    methods:{
        ...mapActions({
           insertCostList:'loginModule/insertCostList'
        }),
        cancel(){
           this.$emit('formok',false);
        },
        submit(){
              this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                     let a={
                        credits_types: this.form.credits_types,
                        prices: this.form.prices,
                        status: this.form.status
                     }
                    this.insertCostList(a).then((res)=>{
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