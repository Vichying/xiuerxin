import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input
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
    const {categorys, categoryCode} = this.props
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
      </Form>
    )
  }
}

export default Form.create()(AddForm)