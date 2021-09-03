import React,{PureComponent}from "react";
import {Card,Modal,Radio,Table, Form, Input, Button,Checkbox,Select,Divider, TreeSelect,Icon,message} from 'antd';
import {reqJudgment,reqJudgmentModify,reqJudgmentDetail,reqIndustryList,reqFieldType,reqDataType} from '../../api'
import LinkButton from '../../components/link-button'
import select from 'react-select'

const Item = Form.Item
const { TextArea } = Input

 class JudgmentAddUpdate extends PureComponent {

  state = {
    data:[], // 规则详情
    datatypes:[], //数据类型
    fieldtypes:[], //字段类型
    industrys:[], //行业类别
    judgmentdata:[]
    
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
    
    console.log(product)
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
data_zhuanhua(datas){
  if(datas === null){
    return(datas)
  } else {
    return(datas.join())
  }
}
submit = () => {
  // 进行表单验证, 如果通过了, 才发送请求
  this.props.form.validateFields(async (error, values) => {
    if (!error) {

      // 1. 收集数据, 并封装成product对象
      const {type,name, filtering_content, filtering_content_type	, datas_1,datas_2,datas_3,datas_4,datas_5,datas_6,datas_7,datas_8,datas_9,datas_10,datas_11,datas_12,datas_13,status} = values
    
     
      // const imgs = this.pw.current.getImgs()
      // const detail = this.editor.current.getDetail()

      //const product = {id,type,name, filtering_content, filtering_content_type, datas_1, datas_2,datas_3,datas_4,datas_5,datas_6,datas_7,datas_8,datas_9,datas_10,datas_11,datas_12,datas_13}

      // 如果是更新, 需要添加_id
      //if(this.isUpdate) {
       const id = this.props.location.state.judgmentdata.id
       
      //}
     //console.log(datas_1.join())
      
     
     //const datas1 = this.data_zhuanhua(datas_1)

      console.log("1111",id)
      // 2. 调用接口请求函数去添加/更新
      //const result = await reqJudgmentModify(id,type,name, filtering_content, filtering_content_type, this.data_zhuanhua(datas_1), this.data_zhuanhua(datas_2),this.data_zhuanhua(datas_3),this.data_zhuanhua(datas_4),this.data_zhuanhua(datas_5),this.data_zhuanhua(datas_6),this.data_zhuanhua(datas_7),this.data_zhuanhua(datas_8),this.data_zhuanhua(datas_9),this.data_zhuanhua(datas_10),this.data_zhuanhua(datas_11),this.data_zhuanhua(datas_12),this.data_zhuanhua(datas_13),status)
      const result = await reqJudgmentModify(id,type,name, filtering_content, filtering_content_type, this.data_zhuanhua(datas_1),status)

      // 3. 根据结果提示
      if (result.code===1) {
        message.success(`修改成功!`)
        this.props.history.goBack()
      } else {
        message.error(`修改失败!`)
      }
    }
  })
}

//权限列表
// render_jurisdiction1(){
//   return this.Mobx.jurisdiction.map((info,index)=>{
//       return <div key={index}>
//         <Checkbox 
//       onChange={this.onCheckAllChange.bind(this,index)} 
//       checked={info.indeterminate}
//       >
//       {info.desc}
//       </Checkbox>
//       <Checkbox.Group style={{marginLeft:'20px',marginTop:'20px'}}  options={info.child} value={this.Mobx.operator.access_id} onChange={this.onChange.bind(this,index)} />
//       <Divider></Divider>
//    </div>
//     }
// )
//   }

//   render_jurisdiction2(){
//     return( <p style={{width: '310px',textAlign: 'center',margin:'12px auto'}}>该账号是系统的管理员，默认拥有所有权限</p> )
// }



// async qr_add_staff(obj){
//   let  qr_add_staff =await Netx.qr_add_staff(obj);
//     if(qr_add_staff.status===1){//成功的标记
//      message.success(qr_add_staff.info.tips);
//      this.props.form.resetFields();
//      this.Mobx.ResetOperator();
//      let  shuju=this.Mobx.jurisdiction
//      for(var i=0;i<shuju.length;i++){
//          shuju[i].indeterminate=false
//      }
//      this.props.camel();
//    }else{//失败的标记
//      message.error(qr_add_staff.info.tips);  
//  }
//   this.props.refresh(); 
// }

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
        <span>修改规则</span>
      </span>
    )
 
    const {name,type,filtering_content,filtering_content_type,industry_involved,datas_1,datas_2,datas_3,datas_4,datas_5,datas_6,datas_7,datas_8,datas_9,datas_10,datas_11,datas_12,datas_13,status} = this.props.location.state.judgmentdata
    console.log(datas_1,"00000")
    const industrys =this.state.industrys
    console.log(industrys,'行业代码')
    console.log(this.data_panduan(datas_1),'12322')

   
    const numbersArr1 =this.data_panduan(datas_1)
    const numbersArr2 = this.data_panduan(datas_2)
    const numbersArr3 = this.data_panduan(datas_3)
    const numbersArr4 = this.data_panduan(datas_4)
    const numbersArr5 = this.data_panduan(datas_5)
    const numbersArr6 = this.data_panduan(datas_6)
    const numbersArr7 = this.data_panduan(datas_7)
    const numbersArr8 = this.data_panduan(datas_8)
    const numbersArr9 = this.data_panduan(datas_9)
    const numbersArr10 = this.data_panduan(datas_10)
    const numbersArr11 = this.data_panduan(datas_11)
    const numbersArr12 = this.data_panduan(datas_12)
    const numbersArr13 = this.data_panduan(datas_13)

    const fieldtypes=this.state.fieldtypes
    console.log(numbersArr1,"11")
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
                initialValue: name,
              })(<Input placeholder='请输入规则名'/>)
            }
          </Item>
          <Item label="规则类型(必选)">
          {getFieldDecorator('type', {
                initialValue: type,
              })(
          <Radio.Group name="type"  >
              <Radio value="1" name="type">不可修复</Radio>
              <Radio value="2" name="type">严重</Radio>
          </Radio.Group>
           )}
          </Item>
          <Item label="过滤关键词(非必填)">
            {getFieldDecorator('filtering_content', {
                initialValue: filtering_content,

              })(<TextArea placeholder="请输入过滤关键词使用英文,分割" row="10" />)
            }
           <span>(关键词使用英文,分割)</span>
          </Item>
          <Item label="是否包含(必选)">
          {getFieldDecorator('filtering_content_type', {
                initialValue: filtering_content_type,
              })(
          <Radio.Group name="filtering_content_type" >
           <Radio value="0">包含</Radio>
           <Radio value="1">不包含</Radio>
          </Radio.Group>
              )}
          </Item>
          <Item label="行业类别">
          <Select
          name="type"
      closeMenuOnSelect={false}
      defaultValue={[1,2]}
      isMulti
      options={industrys}
    />
            {/* {industry_involved} */}
            {/* <TreeSelect></TreeSelect> */}
          </Item>
          <Item label="字段选择">
          {getFieldDecorator('datas_1', {
            initialValue: numbersArr1,
              })(<Checkbox.Group
          name="datas_1"
      options={arraydatalist}
      
    />)}
          </Item>
          {/* <Item label="失信老赖名单执行公开信息">
          {getFieldDecorator('datas_2', {
            initialValue: numbersArr2,
              })(
          <Checkbox.Group 
          name="datas_2"
           options={arraydatalist}
         
          />)}
          </Item>
          <Item label="限制高消费名单">
          {getFieldDecorator('datas_3', {
            initialValue: numbersArr3,
          })(<Checkbox.Group 
          name="datas_3"
           options={arraydatalist}
         
          />)}
          </Item>
          <Item label="限制出入境名单">
          {getFieldDecorator('datas_4', {
            initialValue: numbersArr4,
          })(<Checkbox.Group 
          name="datas_4"
           options={arraydatalist}
        
          />)}
          </Item>
          <Item label="民商事裁判文书">
          {getFieldDecorator('datas_5', {
            initialValue: numbersArr5,
          })(<Checkbox.Group 
          name="datas_5"
           options={arraydatalist}
          
          />)}
          </Item>
          <Item label="民商事审判流程">
          {getFieldDecorator('datas_6', {
            initialValue: numbersArr6,
          })(<Checkbox.Group 
          name="datas_6"
           options={arraydatalist}
         
          />)}
          </Item>
          <Item label="罪犯及嫌疑人名单">
          {getFieldDecorator('datas_7', {
            initialValue: numbersArr7,
          })(<Checkbox.Group 
          name="datas_7"
           options={arraydatalist}
          
          />)}
          </Item>
          <Item label="行政违法记录">
          {getFieldDecorator('datas_8', {
            initialValue: numbersArr8,
          })(<Checkbox.Group 
          name="datas_8"
           options={arraydatalist}
          
          />)}
          </Item>
          <Item label="欠税名单">
          {getFieldDecorator('datas_9', {
            initialValue: numbersArr9,
          })(<Checkbox.Group 
          name="datas_9"
           options={arraydatalist}
          
          />)}
          </Item>
          <Item label="纳税非正常户">
          {getFieldDecorator('datas_10', {
            initialValue: numbersArr10,
          })(<Checkbox.Group 
          name="datas_10"
           options={arraydatalist}
         
          />)}
          </Item>
          <Item label="或有负债">
          {getFieldDecorator('datas_11', {
            initialValue: numbersArr11,
          })(<Checkbox.Group 
          name="datas_11"
           options={arraydatalist}
          
          />)}
          </Item>
          <Item label="终本案件">
          {getFieldDecorator('datas_12', {
            initialValue: numbersArr12,
          })(<Checkbox.Group 
          name="datas_12"
           options={arraydatalist}
         
          />)}
          </Item>
          <Item label="司法协助">
          {getFieldDecorator('datas_13', {
            initialValue: numbersArr13,
          })(<Checkbox.Group 
          name="datas_13"
           options={arraydatalist}
          
          />)}
          </Item> */}
          <Item label="是否启用">
          {getFieldDecorator('status', {
                initialValue: status,
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
export default Form.create()(JudgmentAddUpdate)