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
      :default-sort="{ prop: 'sort', order: 'ascending' }"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="菜单ID" width="120" prop="id"> </el-table-column>
      <el-table-column prop="menu_code" label="菜单编号"> </el-table-column>
      <el-table-column prop="menu_name" label="菜单名称" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="system" label="系统"></el-table-column>
      <el-table-column prop="sort" label="排序">
        <template slot-scope="scope">
          <el-input
            class="sortChange"
            @blur="sortChange(scope.row)"
            v-model="scope.row.sort"
            placeholder="请输入内容"
          ></el-input>
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
      getSysmenusList: "loginModule/getSysmenusList",
      sysmenusDelete: "loginModule/sysmenusDelete",
      sysmenusUpdate: "loginModule/sysmenusUpdate",
      insertJournal: "loginModule/insertJournal",
    }),
    async sortChange(row) {
      console.log(row);
      if (row.old_sort == row.sort) {
        return;
      }
      try {
        let opt = {
          id: row.id,
          token: this.getToken, //用户token
          parent_id: 0, //父级id，  操作按钮的父级为二级菜单
          menu_name: row.menu_name, //菜单名称
          menu_code: row.menu_code, //菜单编号
          icon_url: row.icon_url, //图标地址
          sort: row.sort, //从小到大排序
          menu_type_id: 1, //类型  1 菜单  2 操作
          memo: row.memo, //备注  非必填
        };
        let res = await this.sysmenusUpdate(opt);
        // console.log(res);
        if (res.code != 1) {
          return this.$message.error(res.msg);
        }
        this.$message.success("修改成功！");
      } catch (err) {
        console.log(err);
      } finally {
        this.initList();
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
    result(a, b) {
      if (a == false && b == false) {
        return false;
      } else {
        return true;
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
          keywords: this.name, //关键字模糊搜索  非必填
          level: 1, //层级  1代表一级菜单  2代表二级菜单
          menu_type_id: 1, //类型  1菜单  2操作 必填
          page: this.page, //当前页数
          page_size: this.size, //每页多少条
        };
        let res = await this.getSysmenusList(opt);
        // console.log(res);
        if (res.code != 1) {
          return this.$message.error(res.msg);
        }
        this.tableData = res.data.list;
        this.tableData.forEach((item) => {
          item.system = "修尔信系统后台";
          item.old_sort = item.sort;
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
        plate: "一级菜单",
        plateRouter: "/firstMenu",
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
        return this.$message.warning("请选择要删除的菜单！");
      }
      this.$confirm(
        "是否删除菜单，将连带绑定的二级菜单一起删除？",
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
            let res = await this.sysmenusDelete(opt);
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
                菜单编号: item.menu_code,
                菜单名称: item.menu_name,
                系统: item.system,
                备注: item.memo,
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

.sortChange {
  width: 60px;
  ::v-deep .el-input__inner {
    text-align: center !important;
    height: 32px !important;
    line-height: 32px !important;
  }
}
</style>