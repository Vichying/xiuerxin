<template>
    <div class="update">
           <el-form :model="form" :rules="rules" ref="ruleForm" style="margin-bottom:20px">
               <el-form-item label="分类名称:" :label-width="formLabelWidth" prop="types_names">
                    <el-input  v-model="form.types_names" placeholder="请输入分类名称" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="分类码:" :label-width="formLabelWidth" prop="types_codes">
                   <el-input  v-model="form.types_codes" placeholder="请输入分类码拼音" autocomplete="off"></el-input>
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
             types_names:'',
             types_codes:'',
           },
           formLabelWidth: '120px',
           rules: {
            types_names: [
                { required: true, message: '请输入分类名称', trigger: 'blur' },
                // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            types_codes: [
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
           insertDataType:'loginModule/insertDataType',
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
                        types_names: this.form.types_names,
                        types_codes: this.form.types_codes
                    }
                    this.insertDataType(a).then((res)=>{
                        if(res.code==1){
                            this.$message({
                                message: '操作成功！',
                                type: 'success'
                            });
                            let data={
                                plate:'数据类型',
                                plateRouter:'/datatype',
                                user:this.$store.state.userInfo.identity_name,
                                // userId:this.$store.state.user.info.userId,
                                userId:111,
                                action:1,
                                time:new Date(),
                                content:{'分类名称':this.form.types_names,'分类码':this.form.types_codes},
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