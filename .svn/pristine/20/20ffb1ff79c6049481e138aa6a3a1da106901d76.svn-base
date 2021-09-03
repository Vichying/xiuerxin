<template>
  <div class="staff warp">
    <div class="title">当前 >> {{ this.$store.state.titles }}</div>
    <div class="main">
      <p style="width: 100%; text-align: right; padding-right: 5%">
        <el-button
          type="primary"
          @click="dialogFormVisibles = true"
          v-if="getAuthorityFunc('create')"
          ><i style="margin-right: 1em" class="el-icon-plus"></i>添加</el-button
        >
      </p>
      <div class="table">
        <el-table
          :data="tableData"
          v-loading="loading"
          border
          style="width: 100%"
        >
          <el-table-column prop="id" align="center" label="来源ID">
          </el-table-column>
          <el-table-column align="center" prop="name" label="来源名称">
          </el-table-column>
          <!-- <el-table-column
                       align="center"
                        prop="status"
                        label="状态">
                         <template slot-scope="scope">
                             {{scope.row.status=='1'?'启用':scope.row.status=='0'?'停用':scope.row.status}}
                        </template>
                    </el-table-column>  -->
          <el-table-column align="center" label="操作"       v-if="getAuthorityFunc('edit')">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
          
                >修改</el-button
              >
              <!-- <el-popconfirm title="确定删除吗？" @onConfirm="Delete(scope.row.id)">
                                     <el-button slot="reference" type="text" size="small">删除</el-button>
                                </el-popconfirm> -->
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination
            @current-change="handleSizeChange"
            background
            :current-page.sync="page"
            :page-size="limit"
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
import update from "./components/sourceupdate.vue";
import insert from "./components/sourceinsert.vue";
import help from "@/assets/js/common.js";
export default {
  name: "cost",
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      loading: true,
      total: 0,
      limit: 10,
      page: 1,
      emails: "",
      formsdatas: 0,
      dialogFormVisibles: false,
    };
  },
  components: {
    update,
    insert,
  },
  computed: {
    ...mapGetters({
      getAuthority: "getAuthority",
    }),
  },
  mounted() {},
  created() {
    this.Bind(0);
  },
  methods: {
    ...mapActions({
      getArtSourceList: "loginModule/getArtSourceList",
      deleteAdmin: "loginModule/deleteAdmin",
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
    getRQ(val) {
      return help.getRQ(val);
    },
    Delete(val) {
      //console.log(val)
      this.deleteAdmin({
        token: this.$store.state.token,
        id: [parseInt(val)],
      }).then((res) => {
        if (res.code == 1) {
          this.$message({
            message: "删除成功！",
            type: "success",
          });
          this.Bind(0);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    Bind(offset) {
      this.loading = true;
      let data = {
        token: this.$store.state.token,
        column: ["*"],
        filter: {},
        offset: offset,
        limit: 10,
      };
      this.getArtSourceList(data).then((res) => {
        this.loading = false;
        if (res.code == 1) {
          this.tableData.splice(0, this.tableData.length);
          this.tableData = res.data.list;
          this.total = parseInt(res.data.count);
          this.limit = 10;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    handleSizeChange(val) {
      this.Bind((val - 1) * this.limit);
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
.staff {
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