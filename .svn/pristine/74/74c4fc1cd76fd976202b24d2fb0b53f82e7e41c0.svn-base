import React, {Component} from 'react'
import {
  Card,
  Icon,
  List
} from 'antd'
import moment from 'moment'

import LinkButton from '../../components/link-button'
import {reqUserinfoDetails,reqOrderDetails} from '../../api'
import './order.less'
const Item = List.Item


/*
Order的详情子路由组件
 */
export default class OrderDetail extends Component {

  state = {
    data:[], // 订单详情
    cellphones:''
  }

  async componentDidMount () {

    // 得到当订单详情ID
    const {id,users_id} = this.props.location.state.order

      //console.log(this.props.location.state.order)
      // console.log("000000121212",id)
      const result = await reqOrderDetails(id)
      this.setState({data:result.data})
      //console.log('订单信息',result)
      const user = await reqUserinfoDetails(users_id)
      if(user.code===1){
      //console.log('用户信息',user)
      this.setState({cellphones:user.data.cellphones})
      }
      
      console.log('携带信息',this.props.location.state.order)

    
    
  }

  render() {

    // 读取携带过来的state数据
    const {orders_sn,orders_status,users_nicknames,checks_contents,payments_amounts,credits_types,creates_times,completes_times} = this.props.location.state.order
    const cellphones = this.state.cellphones
     //console.log(this.state.data)
    const title = (
      <span>
        <LinkButton>
          <Icon
            type='arrow-left'
            style={{marginRight: 10, fontSize: 20}}
            onClick={() => this.props.history.goBack()}
          />
        </LinkButton>

        <span>订单详情</span>
      </span>
    )
    return (
      <Card title={title} className='order-detail'>
        <List>
        <Item>
            <span className="left">订单用户:</span>
             <span>{users_nicknames}</span>
          </Item>
          <Item>
            <span className="left">用户手机:</span>
            <span>{cellphones}</span>
          </Item>
          {/* <Item>
            <span className="left">主体信息:</span>
            <span>{checks_contents}</span>
          </Item> */}
          <Item>
            <span className="left">订单编号:</span>
            <span>{orders_sn}</span>
          </Item>
          <Item>
            <span className="left">订单类型:</span>
            <span>{credits_types===1?'体检':(credits_types === 2 ? "修复" : "套餐充值")}</span>
          </Item>
          <Item>
            <span className="left">订单价格:</span>
            <span>{payments_amounts}元</span>
          </Item>
          <Item>
            <span className="left">订单创建时间:</span>
             <span>{moment(parseInt(creates_times+'000')).format('YYYY-MM-DD HH:mm:ss')}</span>
          </Item>
          <Item>
            <span className="left">支付状态:</span>
             <span>{orders_status==='1'?'待支付':(orders_status==='2'?'已支付':'已取消')}</span>
          </Item>
          <Item>
            <span className="left">订单完成时间:</span>
             <span>{moment(parseInt(completes_times+'000')).format('YYYY-MM-DD HH:mm:ss')}</span>
          </Item>
        </List>
      </Card>
    )
  }
}