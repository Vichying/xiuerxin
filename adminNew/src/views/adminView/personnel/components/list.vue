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
      <el-table-column prop="name" label="用户名称" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="admins" label="账号" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="role_name" label="角色"> </el-table-column>
      <el-table-column prop="status" label="是否启用">
        <template slot-scope="scope">
          {{ scope.row.status == 1 ? "启用" : "禁用" }}
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间"> </el-table-column>
      <el-table-column prop="option" label="操作" width="200"   v-if="result(getAuthorityFunc('edit'), getAuthorityFunc('delete'))">
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
    <div class="deleteAll">
      <div>
        <el-button
          type="primary"
          size="mini"
          @click="changeStatus(1)"
          v-if="getAuthorityFunc('edit')"
          >启用</el-button
        >
        <el-button
          type="primary"
          size="mini"
          @click="changeStatus(2)"
          v-if="getAuthorityFunc('edit')"
          >禁用</el-button
        >
        <el-button
          type="primary"
          size="mini"
          @click="deleteMenu(2)"
          v-if="getAuthorityFunc('delete')"
          >删除</el-button
        >
      </div>
    </div>
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
import { mapActions, mapGetters, mapMutations } from "vuex"; //vuex得各个方法   mapGetters放在computed里面 之后可以在当前页面用 this.userInfo 使用这个全局变量

export default {
  data() {
    return {
      isLoad: false,
      page: 1,
      size: 10,
      total: 0,
      tableData: [],
      multipleSelection: [],
      deleteList: [],
      statusChangeList: [],
    };
  },
  props: ["name", "status", "sys_role_id", "sysrolesList"],
  computed: {
    ...mapGetters(["getToken", "getAuthority"]),
  },
  created() {
    this.initList(1);
  },
  methods: {
    ...mapActions({
      getAccountList: "loginModule/getAccountList",
      accountDelete: "loginModule/accountDelete",
      accountStatusChange: "loginModule/accountStatusChange",
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
    async changeStatus(tag) {
      this.statusChangeList = [];
      let _id = [];
      this.multipleSelection.forEach((item) => {
        _id.push(item.id);
        this.statusChangeList.push(item);
      });
      if (this.deleteList && this.deleteList.length == 0) {
        return this.$message.warning("请选择要更新的人员！");
      }
      try {
        this.isLoad = true;
        let opt = {
          token: this.getToken,
          id: _id,
          status: tag,
        };
        let res = await this.accountStatusChange(opt);
        // console.log(res);
        if (res.code != 1) {
          return this.$message.error(res.msg);
        }
        this.$message({
          type: "success",
          message: "修改成功!",
        });

        this.statusChangeList.forEach((item) => {
          // console.log(item);
          let beforeCon = {
            用户名称: item.name,
            账号: item.admins,
            角色: item.role_name,
            是否启用: item.status == 1 ? "启用" : "禁用",
          };
          let content = {
            用户名称: item.name,
            账号: item.admins,
            角色: item.role_name,
            是否启用: tag == 1 ? "启用" : "禁用",
          };
          this.logOption(content, 2, beforeCon);
        });
      } catch (err) {
        console.log(err);
      } finally {
        this.initList();
      }
    },
    updateMenu(tag, row) {
      this.$emit("dataBind", tag, row);
    },
    logOption(content, tag, beforeCon) {
      let data = {
        plate: "员工管理",
        plateRouter: "/personnel",
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
    async initList(tag) {
      try {
        if (tag == 1) {
          this.page = 1;
        }
        this.isLoad = true;
        let opt = {
          token: this.getToken, //token
          keywords: this.name, //角色名称模糊搜索  非必填
          page: this.page, //当前页数
          page_size: this.size, //每页大小
          status: this.status == 0 ? null : this.status,
          sys_role_id: this.sys_role_id == 0 ? null : this.sys_role_id,
        };
        let res = await this.getAccountList(opt);
        // console.log(res);
        if (res.code != 1) {
          return this.$message.error(res.msg);
        }
        this.tableData = res.data.list;
        this.total = res.data.count;
      } catch (err) {
        console.log(err);
        this.initList(tag);
      } finally {
        this.isLoad = false;
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
      this.$confirm(
        tag == 1 ? "是否删除该人员？" : "是否删除选中人员？",
        "删除提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          try {
            this.isLoad = true;
            let opt = {
              token: this.getToken,
              id: _id,
            };
            let res = await this.accountDelete(opt);
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
                用户名称: item.name,
                账号: item.admins,
                角色: item.role_name,
                是否启用: item.status == 1 ? "启用" : "禁用",
              };
              this.logOption(content, 3);
            });
          } catch (err) {
            console.log(err);
          } finally {
            this.initList();
            // this.deleteList = [];
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
      this.bind();
    },
    //当前页切换  调数据
    handleCurrentChange(val) {
      this.page = val;
      this.bind();
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
  justify-content: flex-end;
  align-items: center;
}

::v-deep .el-link--inner {
  margin: 0 8px;
  display: inline-block;
}
</style>