<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      border
      v-loading="isLoad"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="用户ID" width="120" prop="id"> </el-table-column>
      <el-table-column prop="admins" label="用户账号"> </el-table-column>
      <el-table-column prop="is_employee" label="是否是员工">
        <template slot-scope="scope">
          {{ scope.row.is_employee == 1 ? "是" : "否" }}
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间"> </el-table-column>
      <el-table-column
        prop="option"
        label="操作"
        width="200"
        v-if="result(getAuthorityFunc('edit'), getAuthorityFunc('delete'))"
      >
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="updateMenu(2, scope.row)"
            v-if="getAuthorityFunc('edit')"
            >修改</el-link
          >
          <el-link
            type="primary"
            @click="deleteMenu(1, scope.row)"
            v-if="getAuthorityFunc('delete')"
            >删除</el-link
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="page_tion">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :page-size="size"
        @size-change="handleSizeChange"
        :current-page="page"
        @current-change="handleCurrentChange"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      isLoad: false,
      page: 1,
      size: 10,
      total: 0,
      tableData: [],
      multipleSelection: [],
      checked: false,
      deleteList: [],
    };
  },
  props: ["name"],
  computed: {
    ...mapGetters(["getToken", "getAuthority"]),
  },
  created() {
    this.initList(1);
  },
  methods: {
    ...mapActions({
      getUserList: "loginModule/getUserList",
      UserDelete: "loginModule/UserDelete",
      insertJournal: "loginModule/insertJournal",
    }),
    result(a, b) {
      if (a == false && b == false) {
        return false;
      } else {
        return true;
      }
    },
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    updateMenu(tag, row) {
      this.$emit("dataBind", tag, row);
    },
    async initList(tag) {
      try {
        if (tag == 1) {
          this.page = 1;
        }
        this.isLoad = true;
        let opt = {
          token: this.getToken, //token
          admins: this.name, //关键字模糊搜索  非必填
          page: this.page, //当前页数
          page_size: this.size, //每页多少条
        };
        let res = await this.getUserList(opt);
        // console.log(res);
        if (res.code != 1) {
          return this.$message.error(res.msg);
        }
        this.tableData = res.data.list;
        this.tableData.forEach((item) => {
          item.system = "修尔信系统后台";
        });
        this.total = res.data.count;
      } catch (err) {
        console.log(err);
        this.initList(tag);
      } finally {
        this.isLoad = false;
      }
    },
    toggleAllSelect() {
      this.$refs.multipleTable.toggleAllSelection();
    },
    logOption(content, tag) {
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
      this.insertJournal(data);
    },

    deleteMenu(tag, row) {
      this.deleteList = [];
      let _id = [];
      if (tag == 1) {
        _id.push(row.id);
        this.deleteList.push(row);
      } else {
        this.multipleSelection.forEach((item) => {
          _id.push(item.id);
          this.deleteList.push(item);
        });
      }
      if (this.deleteList && this.deleteList.length == 0) {
        return this.$message.warning("请选择要删除的人员！");
      }
      this.$confirm("是否删除人员，删除后该人员不享有免费权限？", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            this.isLoad = true;
            let opt = {
              token: this.getToken,
              id: _id,
            };
            let res = await this.UserDelete(opt);
            // console.log(res);
            if (res.code != 1) {
              return this.$message.error(res.msg);
            }
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.deleteList.forEach((item) => {
              let content = {
                用户账号: item.admins,
                体检次数: item.credits_checks_free_limits,
                修复次数: item.credits_repair_free_limits,
                查询次数: item.repair_inquire_free_limits,
                是否员工: item.is_employee == 1 ? "是" : "否",
              };
              this.logOption(content, 3);
            });
          } catch (err) {
            console.log(err);
          } finally {
            this.initList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    handleSizeChange(val) {
      this.size = val;
      this.initList();
    },
    //当前页切换  调数据
    handleCurrentChange(val) {
      this.page = val;
      this.initList();
    },
  },
};
</script>

<style lang="scss" scoped>
.rowOption {
  width: 100%;
  display: flex;
  justify-content: space-around;
  span {
    cursor: pointer;
  }
}
.red {
  color: #f56c6c;
}

::v-deep .el-table td,
::v-deep .el-table th {
  text-align: center;
}

.green {
  color: #67c23a;
}

.deleteAll {
  margin: 16px 0;
  padding: 10px 20px;
  background: #f2f6fc;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
::v-deep .el-link--inner {
  margin: 0 8px;
  display: inline-block;
}
</style>