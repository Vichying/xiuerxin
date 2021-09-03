<template>
    <div class="update">
           <el-form :model="form" :rules="rules" ref="ruleForm" style="margin-bottom:20px">
                 <el-form-item label="套餐次数:" :label-width="formLabelWidth">
                   <el-input-number v-model="form.numbers" :min="0" :max="9999999999999999999"></el-input-number>
                </el-form-item>
                <el-form-item label="套餐价格:" :label-width="formLabelWidth">
                    <el-input-number v-model="form.prices" :min="0" :max="9999999999999999999"></el-input-number>
                </el-form-item>
                 <el-form-item label="套餐状态:" :label-width="formLabelWidth">
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
        var validateNumbers = (rule, value, callback) => {
            if (value <=0) {
               callback(new Error('请输入套餐次数'));
            } else {
            if (this.ruleForm.checkPass !== '') {
                this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
            }
        };
        return{
           form:{
             numbers:this.datas.numbers,
             prices:this.datas.prices,
             radio:this.datas.status
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
      datas:{
          type:Object
      }
    },
    created(){
      // console.log(this.datas)
    },
    methods:{
        ...mapActions({
           modifySetmeal:'loginModule/modifySetmeal'
        }),
        cancel(){
           this.$emit('formok',false);
        },
        submit(){
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    let a={
                        id:this.datas.id,
                        numbers: this.form.numbers,
                        prices:this.form.prices,
                        status: this.form.radio
                    }
                    this.modifySetmeal(a).then((res)=>{
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