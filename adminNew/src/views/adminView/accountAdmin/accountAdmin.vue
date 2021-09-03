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
            placeholder="用户账号"
          ></el-input>
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
            @click="addFormFn"
            size="medium"
            v-if="getAuthorityFunc('create')"
            >新增</el-button
          >
          <el-button
            type="primary"
            size="medium"
            @click="deleteSelect(2)"
            v-if="getAuthorityFunc('delete')"
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
      :title="isUpdate ? '修改用户信息' : '新增用户信息'"
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
        <el-form-item label="用户账号" prop="admins" class="admins">
          <el-autocomplete
            style="width: 100%"
            v-if="!isUpdate"
            v-model="addRuleForm.admins"
            :fetch-suggestions="querySearch"
            placeholder="用户账号"
            :trigger-on-focus="false"
            @select="handleSelect"
            clearable
            :debounce="500"
          ></el-autocomplete>

          <!-- <el-autocomplete
            style="width: 100%"
            v-if="!isUpdate"
            v-model="addRuleForm.admins"
            :fetch-suggestions="querySearchAsync"
            placeholder="用户账号"
            @select="handleSelect"
            clearable
          ></el-autocomplete> -->
          <el-input
            v-else
            v-model="addRuleForm.admins"
            autocomplete="off"
            clearable
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item
          label="查询次数："
          prop="repair_inquire_free_limits"
          style="width: 100%"
          class="admins"
        >
          <el-input-number
            v-model="addRuleForm.repair_inquire_free_limits"
            :min="0"
          ></el-input-number>
        </el-form-item>
        <el-form-item
          label="体检次数："
          prop="credits_checks_free_limits"
          class="admins"
        >
          <el-input-number
            v-model="addRuleForm.credits_checks_free_limits"
            :min="0"
          ></el-input-number>
        </el-form-item>
        <el-form-item
          label="修复次数："
          prop="credits_repair_free_limits"
          style="width: 100%"
          class="admins"
        >
          <el-input-number
            v-model="addRuleForm.credits_repair_free_limits"
            :min="0"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="是否员工" prop="is_employee" class="admins">
          <el-radio-group v-model="addRuleForm.is_employee">
            <el-radio label="1">是</el-radio>
            <el-radio label="2">否</el-radio>
          </el-radio-group>
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
    // var checkNum = (rule, value, cb) => {
    //   const regNum = /\d/;
    //   if (regNum.test(value)) {
    //     return cb();
    //   }
    //   cb(new Error("账号只能输入数字"));
    // };
    return {
      btnLoad: false,
      dialogVisible: false,
      val: "你好",
      ruleForm: {
        name: "",
      },
      addRuleForm: {
        id: null,
        admins: "", //账号
        credits_checks_free_limits: 0, //体检次数
        credits_repair_free_limits: 0, //修复次数
        repair_inquire_free_limits: 0, //查询次数
        is_employee: "1", //是否员工，0-不是 1-是
      },
      isUpdate: false,
      addRules: {
        is_employee: [
          { required: true, message: "请选择是否是员工", trigger: "blur" },
        ],
      },
      oldForm: {},
      restaurants: [],
      state: "",
    };
  },
  components: {
    //声明组件
    list,
  },
  created() {},
  mounted() {
    // console.log($('.top_info').height());
    // this.restaurants = this.loadAll();
  },
  computed: {
    ...mapGetters(["getToken", "getAuthority"]),
  },
  methods: {
    ...mapActions({
      userCreate: "loginModule/userCreate",
      userUpdate: "loginModule/userUpdate",
      insertJournal: "loginModule/insertJournal",
      searchList: "loginModule/searchList",
    }),
    async loadAll(str) {
      let opt = {
        token: this.getToken,
        admins: str, //账号
      };
      let res = await this.searchList(opt);
      if (res.code != 1) {
        this.restaurants = [];
      } else {
        let arr = [];
        res.data.forEach((v) => {
          let o = {
            value: v,
          };
          arr.push(o);
        });
        this.restaurants = arr;
      }
    },
    async querySearch(queryString, cb) {
      await this.loadAll(queryString);
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;
      cb(results);
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
      this.addRuleForm.admins = item.value;
    },
    // -----------------------------------------------------------------------
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
        admins: "", //账号
        credits_checks_free_limits: 0, //体检次数
        credits_repair_free_limits: 0, //修复次数
        repair_inquire_free_limits: 0, //查询次数
        is_employee: "1", //是否员工，0-不是 1-是
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
      this.restaurants = [];
      this.dialogVisible = false;
      this.isUpdate = false;
      this.$refs.addRuleForm.resetFields();
    },
    logOption(content, beforeCon, tag) {
      let data = {
        plate: "账号管理",
        plateRouter: "/accountAdmin",
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
    // 添加菜单
    addOrUpdateSysMenus() {
      this.$refs.addRuleForm.validate(async (valid) => {
        if (valid) {
          this.btnLoad = true;
          try {
            let opt = {
              token: this.getToken, //用户token
              admins: this.addRuleForm.admins, //账号
              credits_checks_free_limits:
                this.addRuleForm.credits_checks_free_limits, //体检次数
              credits_repair_free_limits:
                this.addRuleForm.credits_repair_free_limits, //修复次数
              repair_inquire_free_limits:
                this.addRuleForm.repair_inquire_free_limits, //查询次数
              is_employee: this.addRuleForm.is_employee, //是否员工，0-不是 1-是
            };
            if (this.isUpdate) {
              opt.id = this.addRuleForm.id;
            }
            // console.log(opt);
            let res = this.isUpdate
              ? await this.userUpdate(opt)
              : await this.userCreate(opt);
            // console.log(res);
            if (res.code != 1) {
              return this.$message.error(res.msg);
            }
            this.$message.success(!this.isUpdate ? "添加成功!" : "修改成功!");
            let content = {
              用户账号: this.addRuleForm.admins,
              体检次数: this.addRuleForm.credits_checks_free_limits,
              修复次数: this.addRuleForm.credits_repair_free_limits,
              查询次数: this.addRuleForm.repair_inquire_free_limits,
              是否员工: this.addRuleForm.is_employee == 1 ? "是" : "否",
            };
            let beforeCon;
            if (this.isUpdate) {
              beforeCon = {
                用户账号: this.oldForm.admins,
                体检次数: this.oldForm.credits_checks_free_limits,
                修复次数: this.oldForm.credits_repair_free_limits,
                查询次数: this.oldForm.repair_inquire_free_limits,
                是否员工: this.oldForm.is_employee == 1 ? "是" : "否",
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

.admins {
  ::v-deep .el-form-item__label::before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
  }
}
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