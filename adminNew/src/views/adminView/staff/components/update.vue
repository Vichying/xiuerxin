<template>
    <div class="update">
           <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="margin-bottom:20px">
                 <el-form-item label="账号名:" :label-width="formLabelWidth" >
                    <el-input :disabled='true' v-model="ruleForm.checkAdmins" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码:" :label-width="formLabelWidth" prop="pass">
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
    name:'update',
    data(){
       var validatePass = (rule, value, callback) => {
        if (value === '') {
         callback();
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
           callback();
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
             checkAdmins:this.datas.admins,
             status:this.datas.status
           },
           formLabelWidth: '120px',
           rules: {
                pass: [
                    {validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    {validator: validatePass2, trigger: 'blur' }
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

    },
    methods:{
        ...mapActions({
           updateAdmin:'loginModule/updateAdmin',
           insertJournal:'loginModule/insertJournal'
        }),
        cancel(){
           this.$emit('formok',false);
        },
        submit(){
              this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                     let a={
                         id:this.datas.id,
                        systems_accounts_mains_id: 1, //账套id  默认1
                        types: 1,  //登录方式类型：1.账号密码2.邮箱登录3.手机号登录 4.QQ 5.wx
                        admins: this.ruleForm.checkAdmins, //账号名
                        psws: this.ruleForm.pass, //登录密码  未加密
                        status: this.ruleForm.status.toString(), //1 启用 0 停用
                     }
                    this.updateAdmin(a).then((res)=>{
                        if(res.code==1){
                            this.$message({
                                    message: '操作成功！',
                                    type: 'success'
                            });
                                  let data={
                                        plate:'管理员管理',
                                        plateRouter:'/staff',
                                        user:this.$store.state.userInfo.identity_name,
                                        // userId:this.$store.state.user.info.userId,
                                        userId:111,
                                        action:2,
                                        time:new Date(),
                                        content:{
                                            '账号名': this.ruleForm.checkAdmins,
                                            '是否启用':parseInt(this.ruleForm.status)==1?'启用':'停用',
                                            '密码': this.ruleForm.pass
                                        },
                                        beforeCon:{
                                            '账号名': this.datas.admins,
                                            '是否启用':parseInt(this.datas.status)==1?'启用':'停用',
                                        }
                                    }
      

                            this.insertJournal(data);
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