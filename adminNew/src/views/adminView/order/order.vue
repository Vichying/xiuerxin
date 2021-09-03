<template>
  <div class="query warp">
    <div class="title">当前 >> {{ this.$store.state.titles }}</div>
    <div class="main">
      <span>
        <el-input
          v-model="ordersNumber"
          style="width: 300px"
          placeholder="订单号/审核人"
        ></el-input>
      </span>
      <span>
        订单状态：
        <!-- @change="Bind(0)" -->
        <el-select v-model="status" placeholder="请选择">
          <el-option
            v-for="item in statusType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </span>
      <span>
        订单类型：
        <!-- @change="Bind(0)" -->
        <el-select v-model="customer" placeholder="请选择">
          <el-option
            v-for="item in customers"
            :key="item.value"
            :label="item.label"
            :value="item.value"
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
      <span>
        <!-- <download-excel
          class="export-excel-wrapper"
          style="display: inline-block"
          :name="name"
          :data="json_data"
          :fields="json_fields"
          :type="fileType"
        >
          <el-button type="success" @click="prot">导出</el-button>
        </download-excel> -->
        <el-button @click="prot" type="success">导出</el-button>
      </span>

      <div class="topna">
        <span>
          <!-- @change="Bind(0)" -->
          <el-select v-model="timetype" placeholder="请选择">
            <el-option
              v-for="item in Times"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </span>
        <span>
          <el-date-picker
            v-model="time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </span>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          v-loading="loading"
          border
          style="width: 100%"
        >
          <el-table-column prop="id" align="center" label="ID号">
          </el-table-column>
          <el-table-column align="center" prop="cellphones" label="用户手机">
          </el-table-column>
          <el-table-column align="center" prop="orders_sn" label="订单号">
          </el-table-column>
          <el-table-column align="center" prop="credits_types" label="订单类型">
            <template slot-scope="scope">
              {{
                scope.row.credits_types == 1 || scope.row.credits_types == 2
                  ? "信用体检"
                  : scope.row.credits_types == 3
                  ? "信用修复"
                  : scope.row.credits_types == 4
                  ? "套餐充值"
                  : scope.row.credits_types
              }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="creates_times" label="下单时间">
          </el-table-column>
          <el-table-column align="center" prop="payments_times" label="支付时间">
          </el-table-column>
          <el-table-column align="center" prop="orders_status" label="支付状态">
            <template slot-scope="scope">
              {{
                scope.row.orders_status == 1
                  ? "已下单"
                  : scope.row.orders_status == 2
                  ? "已支付"
                  : scope.row.orders_status == 3
                  ? "已取消"
                  : scope.row.orders_status
              }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="review_name" label="审核人">
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
                >详情</el-button>
                     <el-button
                     v-if="scope.row.pdfs_urls&&scope.row.pdfs_urls!=''"
                 type="text"
                size="small">
                <a :href="scope.row.pdfs_urls" download="报告.zip" style="color: #409EFF;">下载报告</a></el-button>
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
    <el-dialog width="35%" title="订单详情" :visible.sync="dialogFormVisible">
      <datails
        :ids="formsdatas"
        :phone="phone"
        v-if="dialogFormVisible"
      ></datails>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import datails from "./components/details.vue";
import help from "@/assets/js/common.js";
import { export_json_to_excel} from '@/excel/Export2Excel'
export default {
  name: "order",
  data() {
    return {
      customer: 0,
      customers: [
        {
          value: 0,
          label: "全部",
        },
        {
          value: "4",
          label: "套餐充值",
        },
        {
          value: "3",
          label: "信用修复",
        },
        {
          value: "1,2",
          label: "信用体检",
        },
      ],
      status: 0,
      statusType: [
        {
          value: 0,
          label: "全部",
        },
        {
          value: 1,
          label: "已下单",
        },
        {
          value: 2,
          label: "已支付",
        },
        {
          value: 3,
          label: "已取消",
        },
      ],
      timetype: 1,
      Times: [
        {
          value: 1,
          label: "支付时间",
        },
        {
          value: 2,
          label: "下单时间",
        },
      ],
      time: [],
      tableData: [],
      dialogFormVisible: false,
      loading: true,
      total: 0,
      limit: 8,
      page: 1,
      formsdatas: 0,
      ordersNumber: "",
      phone: "",
      json_data: [],
      fileType: "xls",
      name: "订单列表",
      json_fields: {
        "产品名称": "project_name",
        "订单编号": "orders_sn",
        "客户手机": "cellphones",
        "客户id": "users_id",
        "实付金额": "payments_amounts",
        "结算金额": "settle_amounts",
        "入账金额": "account_amounts",
        "下单时间": "creates_times",
        "支付时间": "payments_times",
        "收款通道": "payments_type",
        "支付方式": "payments_codes",
        "产品类型": "credits_types", //产品类型
        "审核人": "review_name", //审核人
      },
    };
  },
  computed: {
    ...mapGetters({
      getAuthority: "getAuthority",
    }),
  },
  components: {
    datails,
  },
  mounted() {},
  created() {
    this.Bind(1);
    // this.prot();
  },
  methods: {
    ...mapActions({
      getOrderList: "loginModule/getOrderList",
      getOrderDetails: "loginModule/getOrderDetails",
      getUserphone: "loginModule/getUserphone",
      orderProt: "loginModule/orderProt",
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
    getuserphone(id) {
      let that = this;
      return new Promise(function (resolve, reject) {
        that.getUserphone({ id: id }).then((res) => {
          if (res.code == 1) {
            resolve(res.data.cellphones);
          } else {
            this.$message.error(res.msg);
            reject("reject return");
          }
        });
      });
    },
    getRQ(val) {
      return help.getRQ(val);
    },
    parserDate(dateData) {
      var date = new Date(dateData);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      const time = y + "-" + m + "-" + d;
      return time;
    },
    prot() {
      let data = {
        token: this.$store.state.token,
        date_type: this.timetype,
      };
      if (this.time.length > 0) {
        data.start_date = this.parserDate(this.time[0]);
        data.end_date = this.parserDate(this.time[1]);
      }
      if (this.status != 0) {
        data.orders_status = this.status;
      }
      if (this.customer != 0) {
        data.credits_types = this.customer.split(",");
      }
      if (this.ordersNumber != "" && this.ordersNumber != null) {
        data.keywords = this.ordersNumber;
      }
      console.log(data,'data')
      this.orderProt(data).then((res) => {
        if (res.code == 1) {
           this.json_data = res.data.exportList;
              let keys=['orders_sn','project_name','cellphones','users_id','payments_amounts','settle_amounts','account_amounts','creates_times','payments_times','payments_type','payments_codes','credits_types','review_name']
              const excelHeader = ['订单编号','产品名称','客户手机','客户id','实付金额','结算金额','入账金额','下单时间','支付时间','收款通道','支付方式','产品类型','审核人']
              let excelData=res.data.exportList.map(item=>keys.map(i=>item[i]||''));
              // console.log(excelData,'excelData');
              export_json_to_excel(excelHeader, excelData, '订单列表')
          //    this.$message.success('操作成功')
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
        date_type: this.timetype, //选择时间   1 支付时间   2 下单时间
        page: offset, //当前页数
        page_size: 10, //每页大小
      };
      if (this.time.length > 0) {
        data.start_date = this.parserDate(this.time[0]);
        data.end_date = this.parserDate(this.time[1]);
      }
      if (this.status != 0) {
        data.orders_status = this.status;
      }
      if (this.customer != 0) {
        data.credits_types = this.customer.split(",");
      }
      if (this.ordersNumber != "" && this.ordersNumber != null) {
        data.keywords = this.ordersNumber;
      }
      this.getOrderList(data).then(async (res) => {
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
      //    this.Bind((val-1)*this.limit)
      this.Bind(val);
    },
    handleClick(row) {
      this.formsdatas = parseInt(row.id);
      this.phone = row.phone;
      this.dialogFormVisible = true;
    },
    Refush() {
      this.ordersNumber = "";
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
</style>