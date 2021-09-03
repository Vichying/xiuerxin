<template>
    <div class="overview warp">
        <div class="title">当前  >>  {{this.$store.state.titles}}</div>
        <div class="con">
            <div class="conTitle">系统概况</div>
            <div class="content">
                <div class="conItem">
                    <p class="p1">订单总额</p>
                    <p class="p2">￥10000.00</p>
                    <div class="text">
                        <p>月同比<span>1%</span><i class="el-icon-top"></i></p>
                        <p>周同比<span>1%</span><i class="el-icon-top"></i></p>
                        <p>日同比<span>1%</span><i class="el-icon-bottom"></i></p>
                    </div>
                </div>
                  <div class="conItem">
                    <p class="p1">总访问量</p>
                    <p class="p2">10000</p>
                    <div class="text">
                        <p>月同比<span>1%</span><i class="el-icon-top"></i></p>
                        <p>周同比<span>1%</span><i class="el-icon-top"></i></p>
                        <p>日同比<span>1%</span><i class="el-icon-bottom"></i></p>
                    </div>
                </div>
                  <div class="conItem">
                    <p class="p1">用户总数</p>
                    <p class="p2">12312312</p>
                    <div class="text">
                        <p>月同比<span>1%</span><i class="el-icon-top"></i></p>
                        <p>周同比<span>1%</span><i class="el-icon-top"></i></p>
                        <p>日同比<span>1%</span><i class="el-icon-bottom"></i></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="main">
            <span>
                时间：
                 <el-date-picker
                    v-model="time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="Bind"
                    >
                 </el-date-picker>
            </span>
            <!-- <span>
                类型：
                <el-select v-model="channel" placeholder="请选择"  @change="Bind">
                    <el-option
                    v-for="item in channels"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </span> -->
             <span>
                周期：
                <el-select v-model="client" placeholder="请选择"  @change="Bind">
                    <el-option
                    v-for="item in clients"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value" >
                    </el-option>
                </el-select>
            </span>
            <div id="chart"></div>
        </div>
   </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";  
import help from '@/assets/js/common.js'
var echarts = require('echarts');
export default {
    name:'overview',
    data() {
        return {
            time:[],
            channel:1,
            channels:[
               {
                value: 1,
                label: '订单额'
                },
                {
                value: 2,
                label: '访问量'
                },
            ],
            client:0,
            clients:[
               {
                value: 0,
                label: '今日'
                },
                {
                value: 1,
                label: '本周'
                },
                 {
                value: 2,
                label: '本月'
                } ,
                 {
                value: 3,
                label: '本年'
                }
            ],
            datas:{},
            list:{},
        }
    },
    mounted(){
        this.getuserData();
    },
    created(){
      // console.log(help.getSJC('2020-01-22'))
      // this.Bind();
    //    this.getchannel().then((res)=>{
    //        if(res.code==0){
    //           for(let i=0;i<res.data.length;i++){
    //                this. channels.push(       {
    //                     value:res.data[i].id,
    //                     label:res.data[i].name
    //                })
    //           }
    //        }else{
    //             this.$message.error(res.msg);
    //        }
          
    //    })
    },
    methods:{
        ...mapActions({
           getOverview:'loginModule/getOverview',
           getchannel:"loginModule/getchannel"
        }),
        Bind(){
             let data={
                stime:0,
                etime:0,
                channel:this.channel,
                plat:this.client,
                page:0,
                output:'json'
            }
            if(this.time!=null&&this.time.length>0){
                data.stime= help.getSJC(this.time[0]);
                data.etime= help.getSJC(this.time[1]);
                console.log(help.getRQ(data.stime),help.getRQ(data.etime))
            }
            this.getOverview(data).then((res)=>{
                if(res.code==0){
                        this.datas=res.data;
                        this.list={
                            active:[],
                            date:[],
                            dau:[],
                            recharge:[],
                            register:[]
                        }
                        for(let i=0;i<this.datas.datas.length;i++){
                            this.list.active.push(this.datas.datas[i].active);
                            this.list.date.push(this.datas.datas[i].date);
                            this.list.dau.push(this.datas.datas[i].dau);
                            this.list.recharge.push(this.datas.datas[i].recharge);
                            this.list.register.push(this.datas.datas[i].register);
                        }
                        this.getuserData();
                }else{
                     this.$message.error(res.msg);
                }
           
            })
        },
        getuserData(){
          var myChart = echarts.init(document.getElementById('chart'));
          let option = {
                  title: {
                      text: ''
                  },
                  tooltip: {
                      trigger: 'axis'
                  },
                  legend: {
                      data: ['订单额', '访问量']
                  },
                  toolbox: {
                      show: true,
                      feature: {
                          dataView: {show: true, readOnly: false},
                          magicType: {show: true, type: ['line', 'bar']},
                          restore: {show: true},
                          saveAsImage: {show: true}
                      }
                  },
                  calculable: true,
                  xAxis: [
                      {
                          type: 'category', 
                          data:['0-2点','2-4点','4-6点','6-8点','8-10点','10-12点','12-14点']
                      }
                  ],
                  yAxis: [
                      {
                          type: 'value'
                      }
                  ],
                  series: [
                      {
                          name: '订单额',
                          type: 'bar',
                          data:[1,48,23,435,1231,2,321],
                          markPoint: {
                              data: [
                                  {type: 'max', name: '最大值'},
                                  {type: 'min', name: '最小值'}
                              ]
                          },
                          markLine: {
                              data: [
                                  {type: 'average', name: '平均值'}
                              ]
                          }
                      },
                      {
                          name: '访问量',
                          type: 'bar',
                          data:[26,78,45,67,22,89,89],
                          markLine: {
                              data: [
                                  {type: 'average', name: '平均值'}
                              ]
                          }
                      }
                 
                  ]
              };
            myChart.setOption(option);
        } 
    }
}
</script>
<style lang='scss' scoped>
::v-deep .el-icon-top{
    color:#4e4e7b;
} 
::v-deep .el-icon-bottom{
    color:#a91f46;
} 
::v-deep .el-date-editor .el-range-separator{
    padding: 0;
}
.overview{
    .title{
        width: 100%;
        background: #fff;
        font-size: 15px;
        color: #666;
        width: 100%;
        padding: 15px 20px;
    }
    .main{
         box-shadow: 0px 0px 8px 0px rgba(100, 100, 100, 0.17);
         background: #fff;
         margin-top: 10px;
         padding: 10px;
         span{
             padding: 0!important;
             margin-right: 10px;
         }
    }
    .con{
        width: 100%;
        background: #fff;
        box-shadow: 0px 0px 8px 0px rgba(100, 100, 100, 0.17);
        margin: 20px 0;
        padding: 10px 20px;
        box-sizing: border-box;
        padding-bottom: 30px;
        .conTitle{
            font-size: 18px;
            font-weight: bold;
            color: #333;
            margin-bottom: 15px;
        }
        .content{
            display: flex;
            justify-content: space-around;
           .conItem{
               width: 28%;
               background:#648cff;
               border-radius: 8px;
               color: #fff;
               text-align: center;
               padding:15px 10px;
               box-sizing: border-box;
               p{
                  &.p1{
                        font-size: 20px;
                        text-align: left;
                   }
                   &.p2{
                       font-size: 38px;
                       font-weight: bold;
                       margin:10px 0;
                       text-align: center;
                   }
                   span{
                       padding:0 2px;
                   }
               }
               .text{
                   display: flex;
                   justify-content: space-around;
                   font-size: 20px;
               }
               &:nth-child(1){
                   background:#ff7970;
               }
                &:nth-child(2){
                   background:#ffd344;
                }
           }
        }
    }
}
#chart{
    width: 80rem;
    margin: 30px auto;
    margin-top: 30px;
    height: 500px;
}
</style>