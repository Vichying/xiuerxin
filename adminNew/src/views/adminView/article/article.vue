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
          <el-table-column prop="title" align="center" label="标题">
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="创建时间">
          </el-table-column>
          <el-table-column align="center" prop="recommend" label="是否推荐">
            <template slot-scope="scope">
              {{
                scope.row.recommend == "1"
                  ? "是"
                  : scope.row.recommend == "0"
                  ? "否"
                  : scope.row.recommend
              }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="types_id" label="文章类型">
            <template slot-scope="scope">
              {{ getNameType(scope.row.types_id) }}
            </template>
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
                >修改</el-button
              >
              <el-popconfirm
                title="确定删除吗？"
                @onConfirm="Delete(scope.row)"
                v-if="getAuthorityFunc('delete')"
              >
                <el-button slot="reference" type="text" size="small"
                  >删除</el-button
                >
              </el-popconfirm>
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
    <el-dialog width="60%" title="修改" :visible.sync="dialogFormVisible">
      <update
        :datas="formsdatas"
        v-if="dialogFormVisible"
        @formok="formok"
      ></update>
    </el-dialog>
    <el-dialog width="60%" title="添加" :visible.sync="dialogFormVisibles">
      <insert v-if="dialogFormVisibles" @formok="formoks"></insert>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import update from "./components/articleupdate.vue";
import insert from "./components/articleinsert.vue";
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
      typeList: [],
      source: [],
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
    this.getname();
    this.Bind(0);
    let data = {
      token: this.$store.state.token,
      column: ["*"],
      filter: {},
      offset: 0,
      limit: 0,
    };

    this.getArtSourceList(data).then((res) => {
      if (res.code == 1) {
        for (let i = 0; i < res.data.list.length; i++) {
          this.source.push({
            id: res.data.list[i].id,
            label: res.data.list[i].name,
          });
        }
      }
    });
  },
  methods: {
    ...mapActions({
      getArtList: "loginModule/getArtList",
      getArtTypeList: "loginModule/getArtTypeList",
      deleteArt: "loginModule/deleteArt",
      getArtSourceList: "loginModule/getArtSourceList",
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
    getSource(id) {
      for (let i = 0; i < this.source.length; i++) {
        if (id == this.source[i].id) {
          return this.source[i].label;
        }
      }
    },
    getRQ(val) {
      return help.getRQ(val);
    },
    getNameType(val) {
      for (let i = 0; i < this.typeList.length; i++) {
        if (this.typeList[i].id == val) {
          return this.typeList[i].name;
        }
      }
    },
    getname() {
      this.getArtTypeList({
        token: this.$store.state.token,
        column: ["*"], //控制返回字段 非必填
        filter: {
          //查询条件  非必填
          //id:id
        },
        offset: 0, //从第几条开始取， 0代表从第一条开始取
        limit: 0, //每页取多少条
      }).then((res) => {
        if (res.code == 1) {
          this.typeList = res.data.list;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    Delete(val) {
      // console.log(val)
      this.deleteArt({
        token: this.$store.state.token,
        id: [parseInt(val.id)],
      }).then((res) => {
        if (res.code == 1) {
          this.$message({
            message: "删除成功！",
            type: "success",
          });
          let data = {
            plate: "文章管理",
            plateRouter: "/article",
            user: this.$store.state.userInfo.identity_name,
            // userId:this.$store.state.user.info.userId,
            userId: 111,
            action: 3,
            time: new Date(),
            content: {
              文章标题: val.title,
              文章类型: this.getNameType(val.types_id),
              文章来源: this.getSource(val.source),
              是否推荐: parseInt(val.recommend) == 1 ? "是" : "否",
              推荐封面: `<img style="max-height: 100%;max-width: 100%;" src="${val.image_link_files.urls}"/>`,
              内容: val.contents,
            },
          };
          this.insertJournal(data);
          this.Bind(0);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    Bind(offset) {
      if (offset == 0) this.page = 1;
      this.loading = true;
      let data = {
        token: this.$store.state.token,
        column: ["*"],
        filter: {},
        " orderby": "updated_at desc",
        offset: offset,
        limit: 10,
      };
      this.getArtList(data).then(async (res) => {
        if (res.code == 1) {
          this.tableData.splice(0, this.tableData.length);
          this.tableData = res.data.list;
          this.total = parseInt(res.data.count);
          this.limit = 10;
        } else {
          this.$message.error(res.msg);
        }
        this.loading = false;
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

.maxh {
  max-height: 600px;
  overflow-y: scroll;
}
</style>