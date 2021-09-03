import React,{Component} from 'react'
import {Table,Select,Button,Input,Card} from 'antd'
import './order.less'
import {reqOrderList,reqOrderSearchList,reqUserinfoDetails} from '../../api'
import LinkButton from '../../components/link-button'
import moment from 'moment'
import {PAGE_SIZE} from '../../utils/constants'
/*
Home路由组件
 */

export default class Orderlist extends Component {

  state = {
    listall: [], // 所有用户列表
    loading: false,
    total:0,
    searchName: '', // 搜索的关键字
    searchType: 'orders_status', // 根据哪个字段搜索
    cellphones:''
  }

  getUserinfo = async (users_id) => {
    
    const result =  await reqUserinfoDetails(users_id)
    let datal
    if(result.code===1){
      //console.log("测试",result)
      datal=result.data

      //console.log("测试---",datal.cellphones)
     return datal.cellphones
    }
  }


  async  fetchBananas(users_id) {

    return reqUserinfoDetails(users_id)
      .then(res => {
        if (res.status >= 400) {
          throw new Error("Bad response from server")
        }
      })
      .then(res => {
        return res.data
      })
  
  }


  getOrderlists = async (pageNum) =>{
    this.pageNum = pageNum // 保存pageNum, 让其它方法可以看到
    const {searchName, searchType} = this.state

    let result
    if (searchName) {
      const obj = {
        'orders_sn ':searchName
      }
       result =  await reqOrderSearchList(obj)
    }else { // 一般分页请求
        result = await reqOrderList(pageNum, PAGE_SIZE)
      }
     

  //console.log('0000001110',result)
  if (result.code===1) {
    const listall = result.data.list
    let data
    listall.forEach((item)=>{
      //item.cellphones=this.getUserinfo(item.users_id)
     
     item.cellphones='待更新'
    })
 

    this.setState({
      listall:listall
    })
  


  }
 }

 componentDidMount (){
   this.getOrderlists()
   this.getUserinfo()
  // console.log("00**-*-*",this.getUserinfo(1))
 }
render() {
  //console.log(this.state)
  const {listall,loading,searchType, searchName} = this.state
  const dataSource = listall
  console.log("这是数据包",dataSource)

  

 


  
  const title = (
    <span>
      <Input
        placeholder='输入单号'
        style={{width: 300, margin: '0 15px'}}
        value={searchName}
        onChange={event => this.setState({searchName:event.target.value})}
      />
      <Button type='primary' onClick={() => this.getOrderlists(1)}>搜索</Button>
    </span>
  )
  
  const columns = [
    {
      title: 'ID号',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '用户手机',
      dataIndex: 'cellphones',
      render: (users_id) => {
        let phone =this.getUserinfo(users_id)
        console.log(phone,"22222222")
       return (
         {phone}
       )
      }

    },
    {
      title: '订单号',
      dataIndex: 'orders_sn',
      key: 'orders_sn'
    },
    {
      title: '订单类型',
      dataIndex: 'credits_types',
      render: (credits_types) => {
        let userMessage;
      if (credits_types==='1') {
       userMessage = (
             <span>信用体检</span>
        )
      } else if (credits_types==='2'){
          userMessage = (
           <span>企业搜索</span>
         )
      }else if (credits_types==='3'){
        userMessage = (
         <span>信用修复</span>
       )
    }else if (credits_types==='4'){
      userMessage = (
       <span>套餐充值</span>
     )
  }
        return (
            <span>{userMessage}</span>
        )
       
      }
    },
    {
      title: '下单时间',
      dataIndex: 'creates_times',
      render: (creates_times) => { 
        return (
            <span>{moment(parseInt(creates_times+'000')).format('YYYY-MM-DD HH:mm:ss')}</span>
        )
      }
    
    },
    {
      title: '支付状态',
      dataIndex: 'orders_status',
      render: (orders_status) => { 
        return (
            <span>{orders_status==='1'?'待支付':(orders_status==='2'?'已支付':'已取消')}</span>
        )
      }
    },
    {
      title: '操作',
      render: (order) => {
        return (
        <span size="middle">
          <LinkButton onClick={() => this.props.history.push('/order/detail', {order})}>详情</LinkButton>
        </span>
        )
        }
    },
  ];
  
  
  return (
    <Card  title={title} >
     <Table rowKey="id" dataSource={dataSource} columns={columns} loading={loading} />
    </Card>
  )
}
}
