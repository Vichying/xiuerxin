import React,{Component} from 'react'
import {Table,Select,Button,Input,Card,Icon,message} from 'antd'
import './judgment.less'
import {reqJudgment,reqJudgmentModify,reqJudgmentDetail,reqJudgmentDelete} from '../../api'
import LinkButton from '../../components/link-button'

/*
Home路由组件
 */

export default class Judgmentlist extends Component {
    state = {
        loading:false,
        judgmentdata:[],
    }


  deleteJudgment = async(id) =>{
    this.setState({loading: false})

    console.log(id,"删除测试")
    const obj = {
      'id ':id
    }
    const result =  await reqJudgmentDelete(obj)
    console.log('0000001110',result)
    if (result.code===1) {
      message.success(`删除成功!`)
      this.getJudgment()
    }else{
      message.error(`删除失败!`)
      this.getJudgment()
    }
  }




    getJudgment = async () =>{
      this.setState({loading: false})
      const result =  await reqJudgment()
      //console.log('0000001110',result)
      if (result.code===1) {
        const judgmentdata = result.data.list
        //console.log('0000000',result.data.list)
        this.setState({
          judgmentdata
        })
      }
     }
    
     componentDidMount (){
       this.getJudgment()
     }
    render() {
      const {judgmentdata,loading,searchType, searchName,id} = this.state
      const dataSource = judgmentdata
        const extra = (
            <Button type='primary' onClick={() => this.props.history.push('/judgment/judgmentadd')}>
              <Icon type='plus'/>
              添加规则
            </Button>
          )

          const columns = [
            {
              title: 'ID号',
              dataIndex: 'id',
              key: 'id',
              width:'8%',
            },
            {
              title: '规则名',
              dataIndex: 'name',
              width:'10%',
              render: (name) => { 
                let uMessage;
                if (name==='') {
                uMessage = ( <span>暂无</span>)
              } else{
                 uMessage = (<span>{name}</span>)
                 }
                return (
                    <span>{uMessage}</span>
                )
              }
            },
            {
              title: '过滤内容',
              dataIndex: 'filtering_content',
            },
            {
              title: '是否可修复',
              dataIndex: 'type',
              width:'10%',
              render: (type) => { 
                let uMessage;
                if (type==='1') {
                  uMessage = (<span>不可修复</span>)
                } else{
                uMessage = (<span>严重</span>)
                }
                return (
                    <span>{uMessage}</span>
                )
              }
            
            },
            {
              title: '是否包含',
              dataIndex: 'filtering_content_type',
              width:'10%',
              render: (filtering_content_type) => { 
                console.log(filtering_content_type,"传值")
                let uMessage;
                if (filtering_content_type ==='0') {
                uMessage=(<span>包含</span>)
                } else{
                uMessage= (<span>不包含</span>)
                }
                return (
                    <span>{uMessage}</span>
                )
              }
            
            },
            {
              title: '状态',
              dataIndex: 'status',
              width:'10%',
              render: (status) => { 
                console.log(status,"传值")
                let uMessage;
                if (status ==='0') {
                uMessage=(<span>未使用</span>)
                } else if(status ==='1'){
                uMessage= (<span>使用中</span>)
                }
                return (
                    <span>{uMessage}</span>
                )
              }
            
            },
            {
              title: '功能操作',
              width:'15%',
              render: (judgmentdata) => {
                return (
                <span size="middle">
                  <LinkButton onClick={() => this.props.history.push('/judgment/judgmentaddupdate', {judgmentdata})}>修改</LinkButton>
                  <LinkButton onClick={() => this.deleteJudgment(judgmentdata.id)}>删除</LinkButton>
                </span>
                )
                }
            },
          ];
        return (
            <Card  extra={extra}>
             <Table rowKey="id" dataSource={dataSource} columns={columns} loading={loading} />
            </Card>
          )

    }

}