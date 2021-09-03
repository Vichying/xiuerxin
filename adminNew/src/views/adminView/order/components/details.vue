<template>
    <div class="details">
        <ul>
            <li><p><span>订单用户：</span><span>{{datas.admins}}</span></p></li>
            <li><p><span>用户手机：</span><span>{{datas.cellphones}}</span></p></li>
            <li><p><span>订单编号：</span><span>{{datas.orders_sn}}</span></p></li>
            <li><p><span>订单类型：</span><span>{{datas.credits_types==1||datas.credits_types==2?'信用体检':datas.credits_types==3?'信用修复':datas.credits_types==4?'套餐充值':datas.credits_types}}</span></p></li>
            <li><p><span>订单价格：</span><span>{{datas.payments_amounts}}元</span></p></li>
            <li><p><span>订单创建时间：</span><span>{{datas.creates_times}}</span></p></li>
            <li><p><span>支付状态：</span><span> {{datas.orders_status==1?'已下单':datas.orders_status==2?'已支付':datas.orders_status==3?'已取消':datas.orders_status}}</span></p></li>
            <li><p><span>订单完成时间：</span><span>{{datas.payments_times}}</span></p></li>
        </ul>
    </div>
</template>
<script>
import {mapActions} from 'vuex'
import help from '@/assets/js/common.js'
export default {
    data(){
        return{
            datas:{},
        }
    },
    props:{
        ids:{
            type:Number
        },
        // phone:{
        //     type:String
        // }
    },
    created(){
        this.bind()
    },
    methods:{
        ...mapActions({
            getOrderDetails:'loginModule/getOrderDetails',
        }),
        bind(){
            const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
            });
           this.getOrderDetails({id:this.ids,token:this.$store.state.token}).then(res=>{
              if(res.code==1){
                   this.datas=res.data;
                   loading.close();
              }else{
                   loading.close();
                   this.$message.error(res.msg);
              }
           })
        },
        getRQ(val){
          return help.getRQ(val)
        }
    }
}
</script>
<style lang="scss" scoped>
.details{
    ul{
        width: 95%;
        margin: 0 auto;
        li{
            p{
                display: flex;
                justify-content: space-between;
                font-size: 16px;
                color: #666;
                padding-left: 50px;
                span{
                    display: block;
                    width:50%;
                }
            }
           list-style: none;
           padding: 15px 0;
           border-bottom: 1px solid #ccc;
        }
    }
}
</style>