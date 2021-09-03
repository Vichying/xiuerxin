<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      border
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="费用类型" width="120" prop="type">
      </el-table-column>
      <el-table-column prop="price" label="价格（元）"> </el-table-column>
      <el-table-column prop="main" label="主体" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="status" label="状态"> </el-table-column>
      <el-table-column prop="create_time" label="创建时间"> </el-table-column>
      <el-table-column prop="option" label="操作" width="200">
        <template>
          <el-link type="primary" >修改</el-link>
          <el-link type="primary"  @click="deleteMenu"
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
export default {
  data() {
    return {
      isLoad: false,
      page: 1,
      size: 10,
      total: 0,
      tableData: [
        {
          type: 1,
          price: 1,
          main: "aa",
          status: "bb",
          create_time: "2020-05-12",
        },
        {
          type: 1,
          price: 1,
          main: "aa",
          status: "bb",
          create_time: "2020-05-12",
        },
      ],
      multipleSelection: [],
    };
  },
  computed: {},
  created() {},
  methods: {
    deleteMenu() {
      this.$confirm("是否删除费用？", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
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

::v-deep .el-link--inner{
  margin: 0 8px;
  display: inline-block;
}

</style>