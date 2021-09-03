<template>
  <div class="home_index">
    <el-card style="width: 100%" class="myCard">
      <el-form
        label-position="left"
        :model="ruleForm"
        :inline="true"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item prop="name" style="margin-right: 40px">
          <el-input
            v-model="ruleForm.name"
            autocomplete="off"
            clearable
            placeholder="角色名称"
          ></el-input>
        </el-form-item>
        <el-form-item prop="name" style="margin-right: 40px">
          <el-select
            v-model="ruleForm.status"
            placeholder="是否启用"
            @change="search"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            size="medium"
            >查询</el-button
          >
          <el-button
            type="primary"
            @click="dialogVisible = true"
            size="medium"
            v-if="getAuthorityFunc('create')"
            >新增</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <div class="page_con">
      <list ref="list" :name="ruleForm.name" :status="ruleForm.status"></list>
    </div>
    <el-dialog
      center
      title="新增角色"
      :visible.sync="dialogVisible"
      width="600px"
    >
      <el-form
        :model="addRuleForm"
        :rules="addRules"
        ref="addRuleForm"
        label-width="120px"
        class="add"
        label-position="top"
      >
        <el-form-item label="角色名称：" prop="name">
          <el-input
            v-model="addRuleForm.name"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('addRuleForm')" size="medium"
          >取 消</el-button
        >
        <el-button type="primary" @click="sysrolesCreateFunc" size="medium"
          >确 定</el-button
        >
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
      defaultProps: {
        children: "child",
        label: "name",
      },
      treeData: [
        {
          id: "0",
          name: "修尔信后台",
          child: [],
        },
      ],
      check_ids: [],
      options: [
        {
          value: 0,
          label: "全部",
        },
        {
          value: 1,
          label: "启用",
        },
        {
          value: 2,
          label: "禁用",
        },
      ],
      dialogVisible: false,
      val: "你好",
      ruleForm: {
        name: "",
        status: 0,
      },
      addRuleForm: {
        name: "",
      },
      addRules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
      },
    };
  },
  components: {
    //声明组件
    list,
  },
  created() {
    this.getTreelist();
  },
  mounted() {
    // console.log($('.top_info').height());
  },
  computed: {
    ...mapGetters(["getToken", "getAuthority"]),
  },
  methods: {
    ...mapActions({
      sysrolesTreelist: "loginModule/sysrolesTreelist",
      sysrolesCreate: "loginModule/sysrolesCreate",
      insertJournal: "loginModule/insertJournal",
    }),
    getAuthorityFunc(opt) {
      if (this.getAuthority && this.getAuthority.length != 0) {
        let obj = this.getAuthority.find((v) => {
          return v.code == this.$route.path;
        });
        if (obj && obj.child && obj.child.length != 0) {
          return obj.child.some((v) => {
            return v.code == opt;
          });
        }
      }
    },
    async getTreelist() {
      try {
        let res = await this.sysrolesTreelist({ token: this.getToken });
        // console.log(res);
        if (res.code != 1) {
          return this.$message.error(res.msg);
        }
        this.treeData[0].child = res.data.treeData;
      } catch (err) {
        console.log(err);
        this.getTreelist();
      } finally {
      }
    },
    search() {
      this.$nextTick(() => {
        this.$refs.list.initList();
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs.list.initList(1);
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
          this.$refs.list.initList(1);
        });
      }
    },
    logOption(content, tag, beforeCon) {
      let data = {
        plate: "角色管理",
        plateRouter: "/character",
        user: this.$store.state.userInfo.identity_name,
        // userId:this.$store.state.user.info.userId,
        userId: 111,
        action: tag,
        time: new Date(),
        content: content,
      };
      if (beforeCon) {
        data.beforeCon = beforeCon;
      }
      this.insertJournal(data);
    },
    sysrolesCreateFunc() {
      this.$refs.addRuleForm.validate(async (valid) => {
        if (valid) {
          this.dialogVisible = false;
          try {
            let opt = {
              token: this.getToken,
              role_name: this.addRuleForm.name,
              check_ids: this.check_ids,
            };
            let res = await this.sysrolesCreate(opt);
            // console.log(res);
            if (res.code == 1) {
              this.$message.success("添加成功!");
            } else {
              this.$message.error(res.msg);
            }
            let content = {
              角色名称: this.addRuleForm.name,
            };
            this.logOption(content, 1);
          } catch (err) {
            console.log(err);
          } finally {
            this.$refs.addRuleForm.resetFields();
            this.$refs.list.initList(1);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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