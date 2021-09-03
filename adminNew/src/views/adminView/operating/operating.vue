<template>
  <div class="home_index">
    <el-card style="width: 100%" class="myCard">
      <el-form
        label-position="left"
        :model="ruleForm"
        :inline="true"
        ref="ruleForm"
        label-width="100px"
        border
      >
        <el-form-item prop="name" style="margin-right: 40px">
          <el-input
            v-model="ruleForm.name"
            autocomplete="off"
            clearable
            placeholder="操作名称/操作编号"
          ></el-input>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            size="medium"
            >查询</el-button
          >
          <el-button type="primary" @click="addFormFn" size="medium" v-if="getAuthorityFunc('create')"
            >新增</el-button
          >
          <el-button type="primary" size="medium" @click="deleteSelect(2)" v-if="getAuthorityFunc('delete')"
            >删除</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <div class="page_con">
      <list ref="list" :name="ruleForm.name" @dataBind="dataBind"></list>
    </div>
    <el-dialog
      center
      :title="isUpdate ? '修改操作信息' : '新增操作信息'"
      :visible.sync="dialogVisible"
      width="576px"
      :before-close="handleClose"
    >
      <el-form
        :model="addRuleForm"
        :rules="addRules"
        ref="addRuleForm"
        label-width="120px"
        class="add"
        label-position="top"
      >
        <el-form-item label="操作名称：" prop="menu_name">
          <el-input
            v-model="addRuleForm.menu_name"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="操作编号：" prop="menu_code">
          <el-input
            v-model="addRuleForm.menu_code"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="作用：" prop="act_on">
          <el-input
            v-model="addRuleForm.act_on"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="备注：" prop="memo">
          <el-input
            v-model="addRuleForm.memo"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('addRuleForm')" size="medium"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="addOrUpdateSysMenus"
          size="medium"
          :loading="btnLoad"
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
      btnLoad: false,
      options: [
        {
          value: "修尔信后台",
          label: "修尔信后台",
        },
      ],
      dialogVisible: false,
      val: "你好",
      ruleForm: {
        name: "",
      },
      addRuleForm: {
        id: null,
        menu_name: "",
        menu_code: "",
        act_on: "",
        memo: "",
      },
      isUpdate: false,
      addRules: {
        menu_name: [
          { required: true, message: "请输入操作名称", trigger: "blur" },
        ],
        menu_code: [
          { required: true, message: "请输入操作编号", trigger: "blur" },
        ],
        act_on: [
          { required: true, message: "请选择归属系统", trigger: "blur" },
        ],
      },
      oldForm: {},
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
    ...mapGetters(["getToken","getAuthority"]),
  },
  methods: {
    ...mapActions({
      sysmenusCreate: "loginModule/sysmenusCreate",
      sysmenusUpdate: "loginModule/sysmenusUpdate",
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
    addFormFn() {
      this.dialogVisible = true;
      this.addRuleForm = {
        id: null,
        menu_name: "",
        menu_code: "",
        act_on: "",
        memo: "",
      };
    },
    deleteSelect(tag) {
      this.$refs.list.deleteMenu(tag);
    },
    copyData(val) {
      return JSON.parse(JSON.stringify(val));
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

    dataBind(tag, row) {
      this.dialogVisible = true;
      let _row = this.copyData(row);
      this.oldForm = this.copyData(_row);
      this.addRuleForm = _row;
      if (tag == 2) {
        this.isUpdate = true;
      } else {
        this.isUpdate = false;
      }
    },
    handleClose() {
      this.dialogVisible = false;
      this.isUpdate = false;
      this.$refs.addRuleForm.resetFields();
    },
    logOption(content, beforeCon, tag) {
      let data = {
        plate: "操作管理",
        plateRouter: "/operating",
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
    // 添加操作
    addOrUpdateSysMenus() {
      this.$refs.addRuleForm.validate(async (valid) => {
        if (valid) {
          this.btnLoad = true;
          try {
            let opt = {
              token: this.getToken, //用户token
              parent_id: 0, //父级id，  操作按钮的父级为二级操作
              menu_name: this.addRuleForm.menu_name, //操作名称
              menu_code: this.addRuleForm.menu_code, //操作编号
              menu_type_id: 2, //类型  1 菜单  2 操作
              act_on: this.addRuleForm.act_on, //作用  当menu_type_id为2 需要填
              memo: this.addRuleForm.memo, //备注  非必填
            };
            if (this.isUpdate) {
              opt.id = this.addRuleForm.id;
            }
            // console.log(opt);
            let res = this.isUpdate
              ? await this.sysmenusUpdate(opt)
              : await this.sysmenusCreate(opt);
            // console.log(res);
            if (res.code != 1) {
              return this.$message.error(res.msg);
            }
            this.$message.success(!this.isUpdate ? "添加成功!" : "修改成功!");
            let content = {
              操作编号: this.addRuleForm.menu_code,
              操作名称: this.addRuleForm.menu_name,
              作用: this.addRuleForm.act_on,
              备注: this.addRuleForm.memo,
            };
            let beforeCon;
            if (this.isUpdate) {
              beforeCon = {
                操作编号: this.oldForm.menu_code,
                操作名称: this.oldForm.menu_name,
                系统: this.oldForm.act_on,
                备注: this.oldForm.memo,
              };
              this.logOption(content, beforeCon, 2);
            } else {
              this.logOption(content, beforeCon, 1);
            }
          } catch (err) {
            console.log(err);
          } finally {
            this.dialogVisible = false;
            this.isUpdate = false;
            this.btnLoad = false;
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