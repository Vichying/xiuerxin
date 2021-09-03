<template>
  <div class="home_index">
    <el-card style="width: 100%" class="myCard">
      <el-button type="primary" @click="dialogVisible = true" size="medium"
        >新增</el-button
      >
      <el-button type="primary" size="medium" @click="deleteItem"
        >删除</el-button
      >
    </el-card>
    <div class="page_con">
      <list ref="list"></list>
    </div>
    <el-dialog
      center
      title="新增费用信息"
      :visible.sync="dialogVisible"
      width="576px"
    >
      <el-form
        :model="addRuleForm"
        :rules="addRules"
        ref="addRuleForm"
        label-width="120px"
        class="add"
        label-position="top"
      >
        <el-form-item label="费用类型：" prop="type">
          <el-radio-group v-model="addRuleForm.type">
            <el-radio label="1">信用体检</el-radio>
            <el-radio label="2">信用修复</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="费用价格：" prop="price">
          <el-input-number
            v-model="addRuleForm.price"
            :min="1"
            label=""
          ></el-input-number>
        </el-form-item>
        <el-form-item label="适用主体：" prop="main" style="width: 100%">
          <el-radio-group v-model="addRuleForm.main">
            <el-radio label="1">个人</el-radio>
            <el-radio label="2">企业</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否启用：" prop="status">
          <el-radio-group v-model="addRuleForm.status">
            <el-radio label="1">启用</el-radio>
            <el-radio label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('addRuleForm')" size="medium"
          >取 消</el-button
        >
        <el-button type="primary" size="medium">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex"; //vuex得各个方法   mapGetters放在computed里面 之后可以在当前页面用 this.userInfo 使用这个全局变量
import list from "./components/list.vue";
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      dialogVisible: false,
      val: "你好",
      addRuleForm: {
        type: "1",
        price: "",
        main: "1",
        status: "1",
      },
      addRules: {
        type: [{ required: true, message: "请选择类型", trigger: "blur" }],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
        main: [{ required: true, message: "请选择主体", trigger: "blur" }],
        status: [{ required: true, message: "是否启用", trigger: "blur" }],
      },
    };
  },
  components: {
    //声明组件
    list,
  },
  created() {},
  mounted() {
    // console.log($('.top_info').height());
  },
  computed: {
    ...mapGetters(["getToken"]),
  },
  methods: {
    deleteItem() {
      this.$confirm("是否删除选中的费用？", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs.list.bind(1);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName, tag) {
      this.dialogVisible = false;
      this.$refs[formName].resetFields();
      if (tag == 0) {
        this.$nextTick(() => {
          this.$refs.list.bind(1);
        });
      }
    },
  },
};
</script>           
<style lang="scss" scoped>
// scoped 只在这个页面有效得css样式  不污染全局
.page_con {
  color: #999;
  margin: 0 !important;
  margin-top: 20px !important;
}
.home_index {
  padding: 20px !important;
}

.myCard {
  text-align: right;
  min-width: 1200px;
  .el-form-item {
    margin-bottom: 0;
  }
}

.myBtn {
  margin-bottom: 20px;
}
.page_top {
  min-width: 1200px;
}

.add {
  ::v-deep .el-form-item__label {
    width: 100px !important;
  }
  ::v-deep .el-form-item {
    width: 100%;
    display: flex;
  }
  ::v-deep .el-form-item__content {
    flex: 1;
  }
}

.el-select {
  width: 100%;
}
</style>