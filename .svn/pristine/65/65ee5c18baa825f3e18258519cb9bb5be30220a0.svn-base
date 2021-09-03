<template>
  <div class="update">
    <el-form
      :model="form"
      :rules="rules"
      ref="ruleForm"
      style="margin-bottom: 20px"
    >
      <el-form-item label="类型:" :label-width="formLabelWidth">
        <el-radio v-model="form.credits_types" label="1">信用体检</el-radio>
        <el-radio v-model="form.credits_types" label="2">信用修复</el-radio>
      </el-form-item>
      <el-form-item label="价格:" :label-width="formLabelWidth">
        <el-input-number
          v-model="form.prices"
          :min="0"
          :max="9999999999999999999"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="适用主体:" :label-width="formLabelWidth">
        <el-radio v-model="form.credit_subject_type" label="1">个人</el-radio>
        <el-radio v-model="form.credit_subject_type" label="2">企业</el-radio>
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
  name: "update",
  data() {
    return {
      form: {
        credits_types: this.datas.credits_types,
        prices: this.datas.prices,
        credit_subject_type: this.datas.credit_subject_type,
        radio: this.datas.status,
      },
      formLabelWidth: "120px",
      rules: {},
    };
  },
  props: {
    datas: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters(["getToken"]),
  },
  created() {
    // console.log(this.datas)
  },
  methods: {
    ...mapActions({
      updateCostList: "loginModule/updateCostList",
      insertJournal: "loginModule/insertJournal",
    }),
    cancel() {
      this.$emit("formok", false);
    },
    submit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          let a = {
            token: this.getToken,
            id: this.datas.id,
            credits_types: this.form.credits_types,
            prices: this.form.prices,
            credit_subject_type: this.form.credit_subject_type,
            status: this.form.radio,
          };
          this.updateCostList(a).then((res) => {
            if (res.code == 1) {
              this.$message({
                message: "操作成功！",
                type: "success",
              });
              let data = {
                plate: "费用列表",
                plateRouter: "/cost",
                user: this.$store.state.userInfo.identity_name,
                // userId:this.$store.state.user.info.userId,
                userId: 111,
                action: 2,
                time: new Date(),
                content: {
                  费用类型:
                    parseInt(this.form.credits_types) == 1
                      ? "信用体检"
                      : "信用修复",
                  费用价格: this.form.prices,
                  适用主体: parseInt(this.form.credit_subject_type) == 1 ? "个人" : "主体",
                  是否启用: parseInt(this.form.radio) == 1 ? "启用" : "不启用",
                },
                beforeCon: {
                  费用类型:
                    parseInt(this.datas.credits_types) == 1
                      ? "信用体检"
                      : "信用修复",
                  费用价格: this.datas.prices,
                  适用主体: parseInt(this.datas.credit_subject_type) == 1 ? "个人" : "主体",
                  是否启用:
                    parseInt(this.datas.status) == 1 ? "启用" : "不启用",
                },
              };
              this.insertJournal(data);
              this.$emit("formok", "aaa");
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.dialog-footer {
  text-align: right;
}
</style>