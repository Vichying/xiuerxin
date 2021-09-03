<template>
  <div class="query warp">
    <div class="title">当前 >> {{ this.$store.state.titles }}</div>
    <div class="main">
      <span>
        <el-input
          v-model="userName"
          style="width: 300px"
          placeholder="操作人"
        ></el-input>
      </span>
      <span>
        操作板块：
        <el-select v-model="type" placeholder="请选择">
          <el-option
            v-for="item in Types"
            :key="item.id"
            :label="item.menu_name"
            :value="item.menu_code"
          >
          </el-option>
        </el-select>
      </span>
      <span>
        <el-button type="primary" @click="Bind(1)">搜索</el-button>
      </span>
      <span>
        <el-button type="primary" @click="Refush">刷新</el-button>
      </span>
      <div class="table">
        <el-table
          :data="tableData"
          v-loading="loading"
          border
          style="width: 100%"
        >
          <el-table-column prop="plate" align="center" label="操作板块">
          </el-table-column>
          <el-table-column align="center" prop="content" label="操作内容">
            <template slot-scope="scope">
              <div
                v-html="contentZh(scope.row.action, scope.row.content)"
              ></div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="user" label="操作人">
          </el-table-column>
          <el-table-column align="center" prop="time" label="操作时间">
            <template slot-scope="scope">
              {{ getTime(scope.row.time) }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            v-if="getAuthorityFunc('check')"
          >
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >查看</el-button
              >
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
    <el-dialog width="45%" title="日志详情" :visible.sync="dialogFormVisible">
      <details1
        :datas="datas"
        v-if="dialogFormVisible"
        @func="showTree"
      ></details1>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false"
          >我知道了</el-button
        >
      </div>
    </el-dialog>
    <div class="dialog">
      <el-dialog
        title="配置权限"
        :visible.sync="dialogVisible1"
        width="1000px"
        :before-close="closeDia"
      >
        <div class="minH">
          <tree-table
            ref="treeTableO"
            :treeData="treeData"
            :row="row"
            @func="initList"
          ></tree-table>
        </div>
        <span slot="footer" class="dialog-footer" style="text-algin: center">
          <el-button
            @click="dialogVisible1 = false"
            size="medium"
            type="primary"
            >我知道了</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import details1 from "./components/details.vue";
import help from "@/assets/js/common.js";
import treeTable from "@/components/common/treeTable.vue";
export default {
  name: "journal",
  data() {
    return {
      type: "全部",
      Types: [],
      time: [],
      tableData: [],
      dialogFormVisible: false,
      loading: true,
      total: 0,
      limit: 8,
      page: 1,
      userName: "",
      datas: {},
      treeData: [],
      _treeData: [],
      dialogVisible1: false,
      row: null,
    };
  },
  computed: {
    ...mapGetters({
      getAuthority: "getAuthority",
    }),
  },
  components: {
    details1,
    treeTable,
  },
  mounted() {},
  created() {
    this.getSysmenusList({
      token: this.$store.state.token,
      level: 2, //层级  1代表一级菜单  2代表二级菜单
      menu_type_id: 1, //类型  1菜单  2操作 必填
      page: 0, //当前页数
      page_size: 0, //每页多少条
    }).then((res) => {
      if (res.code == 1) {
        this.Types = res.data.list;
        this.Types.splice(0, 0, { menu_code: "/", menu_name: "全部", id: 0 });
      } else {
        this.$message.error(res.msg);
      }
    });
    this.Bind(1);
  },
  methods: {
    ...mapActions({
      getJournalList: "loginModule/getJournalList",
      getSysmenusList: "loginModule/getSysmenusList",
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
    showTree(data) {
      this.dialogVisible1 = true;
      this.treeData = JSON.parse(JSON.stringify(data));
      this.$nextTick(() => {
        this.$refs.treeTableO.checkAll = this.treeData.some((v) => {
          return v.checked == true;
        });
      });

      if (this.treeData && this.treeData.length == 0) {
        return this.$message.warning("暂无内容！");
      }
    },
    closeDia() {
      this.dialogVisible1 = false;
      this.row = null;
      //   this.treeData = JSON.parse(JSON.stringify(this._treeData));
      this.treeData = [];
      this.$refs.treeTableO.checkAll = false;
    },
    initList() {
      console.log("1");
    },
    getTime(time) {
      return this.dayjs(time).format("YYYY-MM-DD HH:mm:ss");
    },
    contentZh(ac, val) {
      let str = "";
      for (var key in val) {
        // str+=`<p>${key+":"+val[key]}<p>`;
        str += key + ",";
      }
      switch (ac) {
        case 1: {
          return `<p>新增：</p>` + str;
        }
        case 2: {
          return `<p>修改:</p>` + str;
        }
        case 3: {
          return `<p>删除:</p>` + str;
        }
      }
    },
    getRQ(val) {
      return help.getRQ(val);
    },
    Bind(offset) {
      if (offset == 1) this.page = 1;
      this.loading = true;
      let data = {
        page: offset,
        limit: 8,
      };
      if (this.userName != "" && this.userName != null) {
        data.user = this.userName;
      }
      if (this.type != "/" && this.type != "全部") {
        data.plateRouter = this.type;
      }
      this.getJournalList(data).then(async (res) => {
        if (res.code == "success") {
          this.tableData.splice(0, this.tableData.length);
          this.tableData = res.result.docs;
          this.total = parseInt(res.result.total);
          this.limit = 8;
        } else {
          this.$message.error(res.msg);
        }
        this.loading = false;
      });
    },
    handleSizeChange(val) {
      this.Bind(val);
    },
    handleClick(row) {
      this.datas = row;
      this.dialogFormVisible = true;
    },
    Refush() {
      this.userName = "";
      this.type = "/";
      this.Bind(1);
    },
    formok() {
      this.dialogFormVisible = false;
    },
  },
};
</script>
<style lang='scss' scoped>
::v-deep .el-date-editor .el-range-separator {
  padding: 0;
}
.query {
  .topna {
    margin-top: 20px;
  }
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

.minH {
  max-height: 560px;
  overflow-y: scroll;
}
</style>