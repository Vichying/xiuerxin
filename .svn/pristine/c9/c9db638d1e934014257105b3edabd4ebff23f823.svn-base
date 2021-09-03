import React,{PureComponent}from "react";
import {Card,Modal,Radio,Table, Form, Input, Button,Checkbox,Select,Divider, TreeSelect,Icon,message} from 'antd';
import {reqJudgmentCreate,reqJudgmentModify,reqJudgmentDetail,reqIndustryList,reqFieldType,reqDataType} from '../../api'
import LinkButton from '../../components/link-button'
import select from 'react-select'

const Item = Form.Item
const { TextArea } = Input

 class JudgmentAdd extends PureComponent {

  state = {
    data:[], // 规则详情
    datatypes:[], //数据类型
    fieldtypes:[], //字段类型
    industrys:[], //行业类别
  }

  
    /*
  异步获取数据
  async函数的返回值是一个新的promise对象, promise的结果和值由async的结果来决定
   */
  getDataTypes = async (id) => {
    const result = await reqDataType(id)   // {status: 0, data: categorys}
    if (result.code===1) {
      const datatypes = result.data.list
      // 所有数据
      this.setState({
      datatypes
      })
    }
  }
  /*
  异步获取字段
  async函数的返回值是一个新的promise对象, promise的结果和值由async的结果来决定
   */
  getFieldTypes = async (id) => {
    const result = await reqFieldType(id)   // {status: 0, data: categorys}
    if (result.code===1) {
      const fieldtypes = result.data.list
      // 所有字段
      this.setState({
        fieldtypes
        })
    }
  }
  getIndustrys = async (parentId) => {
    const obj = {
      'parentId':parentId
    }
    const result = await reqIndustryList(obj)   // {status: 0, data: categorys}
    if (result.code===1) {
      const industrys = result.data.list
      // 如果是一级分类列表
      // if (parentId==='0') {
        this.setState({
          industrys
          })

      // } else { // 二级列表
      //   return industrys  // 返回二级列表 ==> 当前async函数返回的promsie就会成功且value为categorys
      // }
    }
  }
  
  componentWillMount () {
    // 取出携带的state
    const product = this.props.location.state  // 如果是添加没值, 否则有值
    
    //console.log(product.order)
    this.getDataTypes()
    this.getFieldTypes()
    this.getIndustrys()
    // 保存是否是更新的标识
    //this.isUpdate = !!product
    // 保存商品(如果没有, 保存是{})
    //this.product = product || {}
  }

//修改提交
handleSubmit=(e)=>{
  e.preventDefault();
  this.props.form.validateFields((err, values) => {
  
})
}

submit = () => {
  
  // 进行表单验证, 如果通过了, 才发送请求
  this.props.form.validateFields(async (error, values) => {
    if (!error) {
      
      // 1. 收集数据, 并封装成product对象
      const {type,name, filtering_content, filtering_content_type,status} = values
      
      const {datas_1, datas_2,datas_3,datas_4,datas_5,datas_6,datas_7,datas_8,datas_9,datas_10,datas_11,datas_12,datas_13}= values

      console.log(datas_1,"判断初始值")
      console.log(this.data_zhuanhua(datas_1),"0000000000000")
    
     
      // 2. 调用接口请求函数去添加/更新
      //const result = await reqJudgmentCreate(type,name, filtering_content, filtering_content_type, this.data_zhuanhua(datas_1), this.data_zhuanhua(datas_2),this.data_zhuanhua(datas_3),this.data_zhuanhua(datas_4),this.data_zhuanhua(datas_5),this.data_zhuanhua(datas_6),this.data_zhuanhua(datas_7),this.data_zhuanhua(datas_8),this.data_zhuanhua(datas_9),this.data_zhuanhua(datas_10),this.data_zhuanhua(datas_11),this.data_zhuanhua(datas_12),this.data_zhuanhua(datas_13),status)
      const result = await reqJudgmentCreate(type,name, filtering_content, filtering_content_type, this.data_zhuanhua(datas_1),status)

      // 3. 根据结果提示
      if (result.code===1) {
        message.success(`添加成功!`)
        this.props.history.goBack()
      } else {
        message.error(`添加失败!`)
      }
    }
  })
}



data_zhuanhua =(datas) =>{
  if(datas=== null || datas === undefined){
    return(datas='')
  } else {
    return(datas.join())
  }
}


data_panduan(datas){
  if(datas === null){
    return(datas)
  } else {
    return(datas.split(','))
  }
}

  render() {

   // 指定Item布局的配置对象
   const formItemLayout = {
    labelCol: { span: 3 },  // 左侧label的宽度
    wrapperCol: { span: 12 }, // 右侧包裹的宽度
  }


     // 头部左侧标题
     const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type='arrow-left' style={{fontSize: 20}}/>
        </LinkButton>
        <span>添加规则</span>
      </span>
    )
 
    // const {name,type,filtering_content,filtering_content_type,industry_involved,datas_1,datas_2,datas_3,datas_4,datas_5,datas_6,datas_7,datas_8,datas_9,datas_10,datas_11,datas_12,datas_13} = this.props.location.state
    // console.log(datas_1,"00000")
    const industrys =this.state.industrys
    // console.log(industrys,'行业代码')
    // console.log(this.data_panduan(datas_1),'12322')

   
   

    const fieldtypes=this.state.fieldtypes

    const {getFieldDecorator} = this.props.form


    const arraydatalist =fieldtypes.map((fieldtypes) => {
      return { label: fieldtypes.tits, value: fieldtypes.id }
  })

  console.log(arraydatalist,"00000")
 
    let Enable=null;
    if(this.props.default==="非默认"){
      Enable=(
          <Item 
            style={{textAlign:'right',marginBottom:'0px'}}
            wrapperCol={{ span: 12 }}
          >
          {getFieldDecorator('status',{ valuePropName: 'checked',initialValue:this.Mobx.operator.status || false, })(
              <Checkbox >
            启用
            </Checkbox>
            )}
          </Item>
        )
    }



    return(

    <Card title={title}>
       <Form {...formItemLayout}>
       <Item label="规则名(非必填)">
            {
              getFieldDecorator('name', {
                initialValue:''
              })(<Input placeholder='请输入规则名'/>)
            }
          </Item>
          <Item label="规则类型(必选)">
          {getFieldDecorator('type', {
                initialValue: ''
              })(
          <Radio.Group name="type"  >
              <Radio value="1" name="type">不可修复</Radio>
              <Radio value="2" name="type">严重</Radio>
          </Radio.Group>)
  }
          </Item>
          <Item label="过滤关键词(非必填)">
            {getFieldDecorator('filtering_content', {
                initialValue: ''
              })(<TextArea placeholder="请输入过滤关键词使用英文,分割" row="10" />)
            }
           <span>(关键词使用英文,分割)</span>
          </Item>
          <Item label="是否包含(必选)">
          {getFieldDecorator('filtering_content_type', {
                initialValue: ''
              })(
          <Radio.Group name="filtering_content_type"  >
           <Radio value="0">包含</Radio>
           <Radio value="1">不包含</Radio>
          </Radio.Group>
              )}
          </Item>
          <Item label="行业类别">
          <Select
      closeMenuOnSelect={false}
     
      defaultValue={[1,2]}
      isMulti
      options={industrys}
    />
            {/* {industry_involved} */}
            {/* <TreeSelect></TreeSelect> */}
          </Item>
          <Item label="字段选择">
          {getFieldDecorator('datas_1')(
          <Checkbox.Group
          name="datas_1"
           options={arraydatalist}
           
         />)}
          </Item>
          {/* <Item label="失信老赖名单执行公开信息">
          {getFieldDecorator('datas_2')(
          <Checkbox.Group
          name="datas_2"
           options={arraydatalist}
         />)}
          </Item>
          <Item label="限制高消费名单">
          {getFieldDecorator('datas_3')(
          <Checkbox.Group
          name="datas_3"
           options={arraydatalist}
         />)}
          </Item>
          <Item label="限制出入境名单">
          {getFieldDecorator('datas_4')(
          <Checkbox.Group
          name="datas_4"
           options={arraydatalist}
         />)}
          </Item>
          <Item label="民商事裁判文书">
          {getFieldDecorator('datas_5')(
          <Checkbox.Group
          name="datas_5"
           options={arraydatalist}
         />)}
          </Item>
          <Item label="民商事审判流程">
          {getFieldDecorator('datas_6')(
          <Checkbox.Group
          name="datas_6"
           options={arraydatalist}
         />)}
          </Item>
          <Item label="罪犯及嫌疑人名单">
          {getFieldDecorator('datas_7')(
          <Checkbox.Group
          name="datas_7"
           options={arraydatalist}
         />)}
          </Item>
          <Item label="行政违法记录">
          {getFieldDecorator('datas_8')(
          <Checkbox.Group
          name="datas_8"
           options={arraydatalist}
         />)}
          </Item>
          <Item label="欠税名单">
          {getFieldDecorator('datas_9')(
          <Checkbox.Group
          name="datas_9"
           options={arraydatalist}
         />)}
          </Item>
          <Item label="纳税非正常户">
          {getFieldDecorator('datas_10')(
          <Checkbox.Group
          name="datas_10"
           options={arraydatalist}
         />)}
          </Item>
          <Item label="或有负债">
          {getFieldDecorator('datas_11')(
          <Checkbox.Group
          name="datas_11"
           options={arraydatalist}
         />)}
          </Item>
          <Item label="终本案件">
          {getFieldDecorator('datas_12')(
          <Checkbox.Group
          name="datas_12"
           options={arraydatalist}
         />)}
          </Item>
          <Item label="司法协助">
            
          {getFieldDecorator('datas_13')(
          <Checkbox.Group
          name="datas_13"
           options={arraydatalist}
         />)}
          </Item> */}
          <Item label="是否启用">
          {getFieldDecorator('status', {
                initialValue: '',
              })(
          <Radio.Group name="status" >
           <Radio value="0">不启用</Radio>
           <Radio value="1">启用</Radio>
          </Radio.Group>
              )}
          </Item>
          <Item>
            <Button type='primary' onClick={this.submit}>提交</Button>
          </Item>
       </Form>
     </Card>
    )

  }

}
export default Form.create()(JudgmentAdd)