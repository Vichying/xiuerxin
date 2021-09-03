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
    categoryName: PropTypes.string.isRequired,
    categoryCode: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired
  }
  state = {
    value: 1,
  }
  componentWillMount () {
    // 将form对象通过setForm()传递父组件
    this.props.setForm(this.props.form)
    const {
			form: { setFieldsValue, getFieldsValue }
		} = this.props;
		setFieldsValue({ "radio-group": "1" }) //第一次进页面设置Radio的默认选中项为item 1
		getFieldsValue()                     //{ "radio-group": "a" }
  }  
  onChange = e => {
    console.log('radio checked', e.target.value)
    this.setState({
      value: e.target.value,
    })
  }

  render() {

    const {categoryName,categoryCode,categoryTypes,categoryStatus} = this.props
    const { getFieldDecorator } = this.props.form

    return (
      <Form>
        <Item>
          {
            getFieldDecorator('categoryName', {
              initialValue: categoryName,
              rules: [
                {required: true, message: '分类名称必须输入'}
              ]
            })(
              <Input placeholder='请输入分类名称'/>
            )
          }
        </Item>
        <Item>
          {getFieldDecorator('categoryCode', {
              initialValue: categoryCode,
              rules: [
                {required: true, message: '分类名称必须输入'}
              ]
            })(
              <Input placeholder='请输入分类名称'/>
            )
          }
        </Item>
        {/* <Item>
        {getFieldDecorator('categoryTypes', {
              initialValue: categoryTypes,
              rules: [
                {required: true, message: '分类名称必须输入'}
              ]
            })(
            <Radio.Group onChange={this.onChange}  >
            <Radio value='0'>无</Radio>
            <Radio value='1'>字符包含</Radio>
            <Radio value='2'>类似案由</Radio>
          </Radio.Group>)}
        </Item> */}
        <Item>
          {
            getFieldDecorator('categoryStatus', {
              initialValue: categoryStatus,
              rules: [
                {required: true, message: '分类名称必须输入'}
              ]
            })(
            <Radio.Group onChange={this.onChange}  >
            <Radio value='0'>不启用</Radio>
            <Radio value='1'>启用</Radio>
          </Radio.Group>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(UpdateForm)