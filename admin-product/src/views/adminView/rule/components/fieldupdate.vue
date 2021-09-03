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
    name:'update',
    data(){
        return{
           form:{
             tits:this.datas.tits,
             codes:this.datas.codes,
             radio:this.datas.status
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
      datas:{
          type:Object
      }
    },
    created(){
       //console.log(this.datas)
    },
    methods:{
        ...mapActions({
           updateField:'loginModule/updateField'
        }),
        cancel(){
           this.$emit('formok',false);
        },
        submit(){
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    let a={
                        id:this.datas.id,
                        tits: this.form.tits,
                        codes:this.form.codes,
                        status: this.form.radio,
                        rules_types:this.datas.rules_types
                    }
                    this.updateField(a).then((res)=>{
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