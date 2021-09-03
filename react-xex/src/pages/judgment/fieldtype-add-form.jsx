import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  Radio
} from 'antd'

const Item = Form.Item


/*
添加分类的form组件
 */
class AddForm extends Component {

  static propTypes = {
    setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
    categorys: PropTypes.array.isRequired, // 一级分类的数组
    parentId: PropTypes.string.isRequired, // 父分类的ID
  }

  componentWillMount () {
    this.props.setForm(this.props.form)
  }

  render() {
    const {categoryName,categoryCode,categoryTypes,categoryStatus} = this.props
    const { getFieldDecorator } = this.props.form

    return (
      <Form>
        <Item>
          {
            getFieldDecorator('categoryName', {
              initialValue: '',
              rules: [
                {required: true, message: '分类名称必须输入'}
              ]
            })(
              <Input placeholder='请输入分类名称'/>
            )
          }

        </Item>

        <Item>
          {
            getFieldDecorator('categoryCode', {
              initialValue: '',
              rules: [
                {required: true, message: '分类码名称必须输入'}
              ]
            })(
              <Input placeholder='请输入分类码拼音'/>
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

export default Form.create()(AddForm)