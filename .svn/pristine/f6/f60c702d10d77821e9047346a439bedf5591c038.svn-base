import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  Radio
} from 'antd'

const Item = Form.Item

/*
更新分类的form组件
 */
class UpdateForm extends Component {

  static propTypes = {
    numbers: PropTypes.string.isRequired,
    prices: PropTypes.string.isRequired,
    status:PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired
  }

  componentWillMount () {
    // 将form对象通过setForm()传递父组件
    this.props.setForm(this.props.form)
  }

  render() {

    const {numbers,prices,status} = this.props
    const { getFieldDecorator } = this.props.form

    return (
      <Form>
        <Item>
          {
            getFieldDecorator('numbers', {
              initialValue: numbers,
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
              initialValue: prices,
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
              initialValue: status,
           
            })(
              <Radio.Group name="status"  value={status}>
              <Radio value="1" name="type">不可修复</Radio>
              <Radio value="2" name="type">严重</Radio>
          </Radio.Group>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(UpdateForm)