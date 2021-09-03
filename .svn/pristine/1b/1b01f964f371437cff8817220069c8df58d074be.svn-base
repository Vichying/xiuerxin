<template>
  <div class="query warp">
    <div class="title">当前 >> {{ this.$store.state.titles }}</div>
    <div class="main">
      <p style="width: 100%; text-align: right; padding-right: 5%">
        <el-button
          size="medium"
          type="primary"
          @click="Delete(2)"
          v-if="getAuthorityFunc('delete')"
          >删除</el-button
        >
        <el-button
          type="primary"
          size="medium"
          @click="dialogFormVisibles = true"
          v-if="getAuthorityFunc('create')"
          >新增</el-button
        >
      </p>
      <div class="table">
        <el-table
          :data="tableData"
          v-loading="loading"
          border
          style="width: 100%"
          ref="multipleTable"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="credits_types" align="center" label="费用类型">
            <template slot-scope="scope">
              {{
                scope.row.credits_types == 1
                  ? "信用体检"
                  : scope.row.credits_types == 2
                  ? "信用修复"
                  : scope.row.credits_types
              }}
            </template>
          </el-table-column>
          <el-table-column prop="prices" align="center" label="价格(单位元)">
          </el-table-column>
          <el-table-column
            align="center"
            prop="credit_subject_type"
            label="主体"
          >
            <template slot-scope="scope">
              {{ scope.row.credit_subject_type == 1 ? "个人" : "企业" }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="status" label="状态">
            <template slot-scope="scope">
              {{
                scope.row.status == 1
                  ? "启用"
                  : scope.row.status == 0
                  ? "未启用"
                  : scope.row.status
              }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="create_time" label="创建时间">
          </el-table-column>
          <el-table-column align="center" prop="update_time" label="修改时间">
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            v-if="result(getAuthorityFunc('edit'), getAuthorityFunc('delete'))"
          >
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                v-if="getAuthorityFunc('edit')"
                >修改套餐</el-button
              >
              <el-button
                @click="Delete(1, scope.row)"
                slot="reference"
                type="text"
                size="small"
                v-if="getAuthorityFunc('delete')"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination
            @current-change="handleSizeChange"
            background
            :current-page.sync="page"
            :page-size="size"
            layout="total, prev, pager, next"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog width="35%" title="修改" :visible.sync="dialogFormVisible">
      <update
        :datas="formsdatas"
        v-if="dialogFormVisible"
        @formok="formok"
      ></update>
    </el-dialog>
    <el-dialog width="35%" title="添加" :visible.sync="dialogFormVisibles">
      <insert v-if="dialogFormVisibles" @formok="formoks"></insert>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import update from "./components/constupdate.vue";
import insert from "./components/constinsert.vue";
import help from "@/assets/js/common.js";
export default {
  name: "cost",
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      loading: true,
      total: 0,
      size: 10,
      page: 1,
      emails: "",
      formsdatas: 0,
      dialogFormVisibles: false,
      multipleSelection: [],
      deleteList: [],
    };
  },
  components: {
    update,
    insert,
  },
  mounted() {},
  created() {
    this.Bind(0);
  },
  computed: {
    ...mapGetters(["getToken", "getAuthority"]),
  },
  methods: {
    ...mapActions({
      getCostList: "loginModule/getCostList",
      deleteSetmeal: "loginModule/deleteCostList",
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
    result(a, b) {
      if (a == false && b == false) {
        return false;
      } else {
        return true;
      }
    },
    getRQ(val) {
      return help.getRQ(val);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    Delete(tag, row) {
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
      this.$confirm(
        tag == 1 ? "是否删除该费用？" : "是否删除选中费用？",
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
            let res = await this.deleteSetmeal(opt);
            // console.log(res);
            if (res.code != 1) {
              return this.$message.error(res.msg);
            }
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            // console.log(this.deleteList);
            this.deleteList.forEach((item) => {
              let content = {
                费用类型: item.credits_types == 1 ? "信用体检" : "信用修复",
                "价格/元": item.prices,
                主体: item.credit_subject_type == 1 ? "个人" : "企业",
                状态: item.status == 1 ? "启用" : "禁用",
                创建时间: item.create_time,
              };
              this.logOption(content, 3);
            });
          } catch (err) {
            console.log(err);
          } finally {
            this.Bind();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    logOption(content, tag, beforeCon) {
      let data = {
        plate: "费用列表",
        plateRouter: "/cost",
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
    handleSizeChange(val) {
      this.size = val;
      this.Bind();
    },
    //当前页切换  调数据
    handleCurrentChange(val) {
      this.page = val;
      this.Bind();
    },
    Bind(tag) {
      if (tag == 0) {
        this.page = 1;
      }
      this.loading = true;
      let data = {
        token: this.getToken, //token
        page: this.page, //页数
        page_size: this.size, //每页大小
      };
      this.getCostList(data).then((res) => {
        this.loading = false;
        if (res.code == 1) {
          this.tableData.splice(0, this.tableData.length);
          this.tableData = res.data.list;
          this.total = parseInt(res.data.count);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    handleSizeChange(val) {
      this.size = val;
      this.Bind();
    },
    handleClick(row) {
      this.formsdatas = row;
      this.dialogFormVisible = true;
    },
    formok(val) {
      if (val) {
        this.Bind((this.page - 1) * this.limit);
      }
      this.dialogFormVisible = false;
      this.dialogFormVisibles = false;
    },
    formoks(val) {
      if (val) {
        this.Bind(0);
      }
      this.dialogFormVisibles = false;
    },
  },
};
</script>
<style lang='scss' scoped>
::v-deep .el-date-editor .el-range-separator {
  padding: 0;
}
::v-deep.el-button--text {
  margin: 0 10px;
}
.query {
  .title {
    width: 100%;
    background: #fff;
    font-size: 15px;
    color: #666;
    width: 100%;
    padding: 15px 20px;
  }
  .main {
    box-shadow: 0px 0px 8px 0px rgba(100, 100, 100, 0.17);
    background: #fff;
    margin-top: 10px;
    padding: 20px 10px;
    padding-bottom: 70px;
    span {
      margin-right: 10px;
      ::v-deep .el-input {
        width: 150px;
        display: inline-block;
      }
    }
    .table {
      margin-top: 40px;
      .page {
        margin-top: 20px;
        float: right;
      }
    }
  }
}
</style>