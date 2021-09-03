import React, {Component} from 'react'
import {
  Card,
  Table,
  Button,
  Icon,
  message,
  Modal
} from 'antd'

import LinkButton from '../../components/link-button'
import {reqFieldType, reqUpdateFieldType, reqAddFieldType,reqFieldTypeDelete} from '../../api'
import AddForm from './fieldtype-add-form'
import UpdateForm from './fieldtype-update-form'

/*
规则类型路由
 */
export default class JudgmentFieldType extends Component {

  state = {
    loading: false, // 是否正在获取数据中
    categorys: [], // 一级分类列表
    subCategorys: [], // 二级分类列表
    parentId: '0', // 当前需要显示的分类列表的父分类ID
    parentName: '', // 当前需要显示的分类列表的父分类名称
    showStatus: 0, // 标识添加/更新的确认框是否显示, 0: 都不显示, 1: 显示添加, 2: 显示更新
  }

  /*
  初始化Table所有列的数组
   */
  initColumns = () => {
    this.columns = [
      {
        title: '字段类型名称',
        dataIndex: 'tits', // 显示数据对应的属性名
      },
      {
        title: '字段类型代码',
        dataIndex: 'codes', // 显示数据对应的属性名
      },
      // {
      //   title: '字段规则类型状态',
      //   dataIndex: 'rules_types', // 显示数据对应的属性名
      //   render: (rules_types) => {
      //     let userMessage;
      //   if (rules_types==='0') {
      //    userMessage = (
      //          <span>无</span>
      //     )
      //   } else if (rules_types==='1'){
      //       userMessage = (
      //        <span>字符包含</span>
      //      )
      //   }else if (rules_types==='2'){
      //     userMessage = (
      //      <span>类似于案由</span>
      //    )
      // }
      //     return (
      //         <span>{userMessage}</span>
      //     )
         
      //   }
      // },
      {
        title: '字段类型状态',
        dataIndex: 'status', // 显示数据对应的属性名
        render: (status) => {
          let userMessage;
        if (status==='0') {
         userMessage = (
               <span>未启用</span>
          )
        } else if (status==='1'){
            userMessage = (
             <span>启用中</span>
           )
        }
          return (
              <span>{userMessage}</span>
          )
         
        }
      },
      {
        title: '操作',
        width: 300,
        render: (category) => ( // 返回需要显示的界面标签
          <span>
            <LinkButton onClick={() => this.showUpdate(category)}>修改</LinkButton>
            <LinkButton onClick={() => this.deleteFieldType(category.id)}>删除</LinkButton>
          </span>
        )
      }
    ]
  }

  deleteFieldType = async(id) =>{
    this.setState({loading: false})

    console.log(id,"删除测试")
    const obj = {
      'id ':id
    }
    const result =  await reqFieldTypeDelete(obj)
    console.log('0000001110',result)
    if (result.code===1) {
      message.success(`删除成功!`)
      this.getCategorys()
    }else{
      message.error(`删除失败!`)
      this.getCategorys()
    }
  }

  /*
  异步获取一级/二级分类列表显示
  parentId: 如果没有指定根据状态中的parentId请求, 如果指定了根据指定的请求
   */
  getCategorys = async (parentId) => {

    // 在发请求前, 显示loading
    this.setState({loading: true})
    parentId = parentId || this.state.parentId
    // 发异步ajax请求, 获取数据
    const result = await reqFieldType(parentId)
    // 在请求完成后, 隐藏loading
    this.setState({loading: false})

    if(result.code===1) {
      // 取出分类数组
      const categorys = result.data.list
      this.setState({
        categorys
      })
    } else {
      message.error('获取规则类型列表失败')
    }
  }


  /*
  显示指定一级分类列表
   */
  showCategorys = () => {
    // 更新为显示一列表的状态
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: []
    })
  }

  /*
  响应点击取消: 隐藏确定框
   */
  handleCancel = () => {
    // 清除输入数据
    this.form.resetFields()
    // 隐藏确认框
    this.setState({
      showStatus: 0
    })
  }

  /*
  显示添加的确认框
   */
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }

  /*
  添加分类
   */
  addCategory = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        // 隐藏确认框
        this.setState({
          showStatus: 0
        })

        // 收集数据, 并提交添加分类的请求categoryTypes
        const {categoryName,categoryCode,categoryTypes,categoryStatus} = values
        // 清除输入数据
        this.form.resetFields()
        const result = await reqAddFieldType(categoryName, categoryCode,categoryStatus)
        if(result.code===1) {
          message.success(`添加成功!`)
            // 重新获取当前分类列表显示
            this.getCategorys()
        
        }
      }
    })
  }


  /*
  显示修改的确认框
   */
  showUpdate = (category) => {
    // 保存分类对象
    this.category = category
    // 更新状态
    this.setState({
      showStatus: 2
    })
  }

  /*
  更新分类
   */
  updateCategory = () => {
    console.log('updateCategory()')
    // 进行表单验证, 只有通过了才处理
    this.form.validateFields(async (err, values) => {
      if(!err) {
        // 1. 隐藏确定框
        this.setState({
          showStatus: 0
        })

        // 准备数据
        const categoryId = this.category.id
        const {categoryName} = values
        const {categoryCode} = values
        const {categoryTypes} = values
        const {categoryStatus} = values
       
        // 清除输入数据
        this.form.resetFields()

        // 2. 发请求更新分类
        const result = await reqUpdateFieldType(categoryId, categoryName,categoryCode,categoryTypes,categoryStatus)
        if (result.code===1) {
          // 3. 重新显示列表
          this.getCategorys()
        }
      }
    })


  }



  /*
  为第一次render()准备数据
   */
  componentWillMount () {
    this.initColumns()
  }

  /*
  执行异步任务: 发异步ajax请求
   */
  componentDidMount () {
    // 获取一级分类列表显示
    this.getCategorys()
  }

  render() {

    // 读取状态数据
    const {categorys, subCategorys, parentId, parentName, loading, showStatus} = this.state
    // 读取指定的分类
    const category = this.category || {} // 如果还没有指定一个空对象

    // card的左侧
    const title = parentId === '0' ? '规则字段类型列表' : (
      <span>
        <LinkButton onClick={this.showCategorys}>规则字段类型列表</LinkButton>
        <Icon type='arrow-right' style={{marginRight: 5}}/>
        <span>{parentName}</span>
      </span>
    )
    // Card的右侧
    const extra = (
      <Button type='primary' onClick={this.showAdd}>
        <Icon type='plus'/>
        添加
      </Button>
    )

    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey='id'
          loading={loading}
          dataSource={parentId==='0' ? categorys : subCategorys}
          columns={this.columns}
          pagination={{defaultPageSize: 10, showQuickJumper: true}}
        />

        <Modal
          title="添加类型"
          visible={showStatus===1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <AddForm
            categorys={categorys}
            parentId={parentId}
            setForm={(form) => {this.form = form}}
          />
        </Modal>

        <Modal
          title="更新类型"
          visible={showStatus===2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <UpdateForm
            categoryName={category.tits}
            categoryCode={category.codes}
            categoryTypes={category.rules_types}
            categoryStatus={category.status}
            setForm={(form) => {this.form = form}}
          />
        </Modal>
      </Card>
    )
  }
}