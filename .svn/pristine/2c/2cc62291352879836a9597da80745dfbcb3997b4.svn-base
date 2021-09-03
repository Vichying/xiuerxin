<template>
    <div class="update">
           <el-form :model="form" :rules="rules" ref="ruleForm" style="margin-bottom:20px">
                 <el-form-item label="分类名称:" :label-width="formLabelWidth" prop="tits">
                    <el-input  v-model="form.tits" placeholder="请输入分类名称" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="分类码:" :label-width="formLabelWidth" prop="codes">
                   <el-input  v-model="form.codes" placeholder="请输入分类码拼音" autocomplete="off"></el-input>
                </el-form-item>
                 <el-form-item label="是否启用:" :label-width="formLabelWidth">
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
    name:'insert',
    data(){
        return{
           form:{
             tits:'',
             codes:'',
             radio:'1'
           },
           formLabelWidth: '120px',
           rules: {
            tits: [
                { required: true, message: '请输入分类名称', trigger: 'blur' },
                // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            codes: [
                { required: true, message: '请输入分类码拼音', trigger: 'blur' },
                // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
           insertField:'loginModule/insertField',
           insertJournal:'loginModule/insertJournal'
        }),
        cancel(){
           this.$emit('formok',false);
        },
        submit(){
              this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                     let a={
                        tits: this.form.tits,
                        codes: this.form.codes,
                        status: this.form.radio,
                        rules_types:'1',
                        token : this.$store.state.token
                     }
                    this.insertField(a).then((res)=>{
                        if(res.code==1){
                            this.$message({
                                    message: '操作成功！',
                                    type: 'success'
                            });
                            let data={
                                plate:'字段类型',
                                plateRouter:'/field',
                                user:this.$store.state.userInfo.identity_name,
                                // userId:this.$store.state.user.info.userId,
                                userId:111,
                                action:1,
                                time:new Date(),
                                content:{'分类名称':this.form.tits,'分类码':this.form.codes,'是否启用':parseInt(this.form.radio)==1?'启用':"不启用"},
                            }
                            console.log(data,'datas')
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