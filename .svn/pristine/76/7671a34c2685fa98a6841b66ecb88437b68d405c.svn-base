import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Select,
  Input
} from 'antd'

const Item = Form.Item
const Option = Select.Option

/*
添加分类的form组件
 */
class AddForm extends Component {

  static propTypes = {
    setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
 
  }

  componentWillMount () {
    this.props.setForm(this.props.form)
  }

  render() {
    //const {numbers, prices,status} = this.props
    const { getFieldDecorator } = this.props.form

    return (
      <Form>
        <Item>
          {
            getFieldDecorator('numbers', {
              initialValue: '',
              rules: [
                {required: true, message: '套餐次数必须输入'}
              ]
            })(
              <Input placeholder='请输入套餐次数'/>
            )
          }
        </Item>
        <Item>
          {
            getFieldDecorator('prices', {
              initialValue: '',
              rules: [
                {required: true, message: '套餐价格必须输入'}
              ]
            })(
              <Input placeholder='请输入套餐价格'/>
            )
          }
        </Item>
        <Item>
          {
            getFieldDecorator('status', {
              initialValue: '',
        
            })(
              <Select>
                <Option value='0'>不启用</Option>
                <Option value="1">启用</Option>
              </Select>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(AddForm)