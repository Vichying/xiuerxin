<template>
    <div class="update">
           <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="margin-bottom:20px">
                 <el-form-item label="账号名:" :label-width="formLabelWidth" prop='checkAdmins'>
                    <el-input  v-model="ruleForm.checkAdmins" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码:" :label-width="formLabelWidth" prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码:" :label-width="formLabelWidth" prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                 <el-form-item label="是否启用:" :label-width="formLabelWidth">
                        <el-radio v-model="ruleForm.status" label="1">启用</el-radio>
                        <el-radio v-model="ruleForm.status" label="0">不启用</el-radio>
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
       var checkAdmins = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        this.chekAdmin({ 
            column : ["*"], 
            filter:{ 
               admins :value,
            }, 
            offset : 0,  
            limit : 0  }).then(res=>{
            //console.log(res);
                    if(res.code==1){
                        if(res.data.list.length>0){
                            return callback(new Error('该用户已注册'));
                        }else{
                            return callback() 
                        }
                    }
            })

      };
       var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
        return{
           ruleForm:{
             pass:'',
             checkPass:'',
             checkAdmins:'',
             status:'1'
           },
           formLabelWidth: '120px',
           rules: {
                pass: [
                    { required: true,validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    {required: true, validator: validatePass2, trigger: 'blur' }
                ],
                checkAdmins:[
                    { required: true,validator: checkAdmins, trigger: 'blur' }
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
           insertAdmin:'loginModule/insertAdmin',
           chekAdmin:'loginModule/chekAdmin'
        }),
        cancel(){
           this.$emit('formok',false);
        },
        submit(){
              this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                     let a={
                        systems_accounts_mains_id: 1, //账套id  默认1
                        types: 1,  //登录方式类型：1.账号密码2.邮箱登录3.手机号登录 4.QQ 5.wx
                        admins: this.ruleForm.checkAdmins, //账号名
                        psws: this.ruleForm.pass, //登录密码  未加密
                        status: this.ruleForm.status, //1 启用 0 停用
                     }
                    this.insertAdmin(a).then((res)=>{
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