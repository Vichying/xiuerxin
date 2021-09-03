import React, {Component} from 'react'
import {
  Card,
  Icon,
  List
} from 'antd'

import LinkButton from '../../components/link-button'
import {reqJudgmentDetail,reqIndustry,reqFieldType,reqDataType} from '../../api'

const Item = List.Item


/*
Product的详情子路由组件
 */
export default class JudgmentDetail extends Component {

  state = {
    cName1: '', // 一级分类名称
    cName2: '', // 二级分类名称
    judgmentDetail:[]
  }

  async componentDidMount () {

    // 得到当前商品的分类ID
    const {Id} = this.props.location.state
    if(Id==='0') { // 一级分类下的商品
      const result = await reqFieldType(Id)
      const cName1 = result.data.name
      this.setState({cName1})
    } else { // 二级分类下的商品
      /*
      //通过多个await方式发多个请求: 后面一个请求是在前一个请求成功返回之后才发送
      const result1 = await reqCategory(pCategoryId) // 获取一级分类列表
      const result2 = await reqCategory(categoryId) // 获取二级分类
      const cName1 = result1.data.name
      const cName2 = result2.data.name
      */

      // 一次性发送多个请求, 只有都成功了, 才正常处理
      const results = await Promise.all([reqFieldType(Id)])
      const cName1 = results[0].data.name
      this.setState({
        cName1
      })
    }

  }

  render() {

    // 读取携带过来的state数据
    const {name} = this.props.location.state
    // const {cName1, cName2} = this.state

    const title = (
      <span>
        <LinkButton>
          <Icon
            type='arrow-left'
            style={{marginRight: 10, fontSize: 20}}
            onClick={() => this.props.history.goBack()}
          />
        </LinkButton>

        <span>规则详情</span>
      </span>
    )
    return (
      <Card title={title} className='product-detail'>
        <List>
          <Item>
            <span className="left">规则名称:</span>
            <span>{name}</span>
          </Item>
          
        
     
      
        </List>
      </Card>
    )
  }
}