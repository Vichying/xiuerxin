<template>
    <div class="update">
           <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="margin-bottom:20px">
                 <el-form-item label="类型名称:" :label-width="formLabelWidth" prop='name'>
                    <el-input  v-model="ruleForm.name" autocomplete="off"></el-input>
                </el-form-item>
                 <!-- <el-form-item label="是否启用:" :label-width="formLabelWidth">
                        <el-radio v-model="ruleForm.status" label="1">启用</el-radio>
                        <el-radio v-model="ruleForm.status" label="0">不启用</el-radio>
                </el-form-item> -->
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
           ruleForm:{
             name:'',
             status:'1'
           },
           formLabelWidth: '120px',
           rules: {
                name: [
                    { required: true,trigger: 'blur',message:'请填写类型名称' }
                ] }
        }
    },
    props:{
   
    },
    created(){

    },
    methods:{
        ...mapActions({
           insertArtType:'loginModule/insertArtType',
           insertJournal:'loginModule/insertJournal'
        }),
        cancel(){
           this.$emit('formok',false);
        },
        submit(){
              this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                     let a={
                        token : this.$store.state.token,
                        name: this.ruleForm.name
                     }
                    this.insertArtType(a).then((res)=>{
                        if(res.code==1){
                            this.$message({
                                    message: '操作成功！',
                                    type: 'success'
                            });
                            let data={
                                plate:'文章类型管理',
                                plateRouter:'/type',
                                user:this.$store.state.userInfo.identity_name,
                                // userId:this.$store.state.user.info.userId,
                                userId:111,
                                action:1,
                                time:new Date(),
                                content:{
                                    '类型名称':this.ruleForm.name
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