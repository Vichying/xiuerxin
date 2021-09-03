/*
要求: 能根据接口文档定义接口请求
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise

基本要求: 能根据接口文档定义接口请求函数
 */
import jsonp from 'jsonp'
import {message} from 'antd'
import ajax from './ajax'

// const BASE = 'http://localhost:5000'
const BASE = 'http://114.113.149.156:8909/adminxex'
// const BASE = ''
// 登陆
/*
export function reqLogin(username, password) {
  return ajax('/login', {username, password}, 'POST')
}*/
export const getcodes = () => ajax(BASE + '/unifylogin/getcodes',{}, 'POST')
// 登录接口
export const reqLogin = (username, password,logintypes,codes) => ajax(BASE + '/unifylogin/unifylogins', {username, password,logintypes,codes}, 'POST')
// 获取个人信息
export const getuserinfo = (tokens) => ajax(BASE + '/unifylogin/personalinfos', {tokens}, 'POST')

// 获取一级/二级分类的列表
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list', {parentId})

// 规则类型列表
export const reqJudgmentTypes = () => ajax(BASE + '/manage/category/list', {},'POST')

// 公司行业分类列表获取一级/二级/三级分类的列表

export const reqIndustryCreate = (filter,orderby,column,offset,limit) => ajax(BASE + '/repairscompanyscodes/create', {filter,orderby,column,offset,limit},'POST')
export const reqIndustryModify = (filter,orderby,column,offset,limit) => ajax(BASE + '/repairscompanyscodes/modify', {filter,orderby,column,offset,limit},'POST')
export const reqIndustryList = (filter,orderby,column,offset,limit) => ajax(BASE + '/repairscompanyscodes/list', {filter,orderby,column,offset,limit},'POST')
export const reqIndustryDetails = (id) => ajax(BASE + '/repairscompanyscodes/details', {id},'POST')

// 字段类型列表
export const reqFieldType =  () => ajax(BASE + '/repairsinquirerulesfieldtags/list', {},'POST')

// 字段类型添加
export const reqAddFieldType =  (tits,codes) => ajax(BASE + '/repairsinquirerulesfieldtags/create', {tits,codes},'POST')

// 字段类型修改
export const reqUpdateFieldType =  (id,tits,codes,rules_types,status) => ajax(BASE + '/repairsinquirerulesfieldtags/modify', {id,tits,codes,rules_types,status},'POST')
//删除
export const reqFieldTypeDelete= (id) => ajax(BASE + '/repairsinquirerulesfieldtags/delete', {id},'POST')


// 数据类型列表
export const reqDataType =  () => ajax(BASE + '/repairsinquirerulesdatastypes/list', {},'POST')
//数据类型添加
export const reqDataTypeAdd =  (types_names,types_codes,rules_types,status) => ajax(BASE + '/repairsinquirerulesdatastypes/create', {types_names,types_codes,rules_types,status},'POST')
// 数据类型更新
export const reqDataTypeUpdate =  (id,types_names,types_codes) => ajax(BASE + '/repairsinquirerulesdatastypes/modify', {id,types_names,types_codes},'POST')
//删除
export const reqDataTypeDelete= (id) => ajax(BASE + '/repairsinquirerulesdatastypes/delete', {id},'POST')



// 添加分类
export const reqAddCategory = (categoryName, parentId) => ajax(BASE + '/manage/category/add', {categoryName, parentId}, 'POST')

// 更新分类
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax(BASE + '/manage/category/update', {categoryId, categoryName}, 'POST')

// 获取一个分类
export const reqCategory = (categoryId) => ajax(BASE + '/manage/category/info', {categoryId})

// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/manage/product/list', {pageNum, pageSize})

// 更新商品的状态(上架/下架)
export const reqUpdateStatus = (productId, status) => ajax(BASE + '/manage/product/updateStatus', {productId, status}, 'POST')



/*
搜索商品分页列表 (根据商品名称/商品描述)
searchType: 搜索的类型, productName/productDesc
 */
export const reqSearchProducts = ({pageNum, pageSize, searchName, searchType}) => ajax(BASE + '/manage/product/search', {
  pageNum,
  pageSize,
  [searchType]: searchName,
})

// 搜索商品分页列表 (根据商品描述)
/*export const reqSearchProducts2 = ({pageNum, pageSize, searchName}) => ajax(BASE + '/manage/product/search', {
  pageNum,
  pageSize,
  productDesc: searchName,
})*/

// 删除指定名称的图片
export const reqDeleteImg = (name) => ajax(BASE + '/manage/img/delete', {name}, 'POST')

// 添加/修改商品
export const reqAddOrUpdateProduct = (product) => ajax(BASE + '/manage/product/' + ( product._id?'update':'add'), product, 'POST')
// 修改商品
// export const reqUpdateProduct = (product) => ajax(BASE + '/manage/product/update', product, 'POST')


// 获取所有角色的列表
export const reqRoles = () => ajax(BASE + '/systemsrolesstructures/list',{},'POST')
// 添加角色
export const reqAddRole = (tits) => ajax(BASE + '/systemsrolesstructures/create', {tits}, 'POST')
// 添加角色
export const reqUpdateRole = (role) => ajax(BASE + '/systemsrolesstructures/modify', role, 'POST')


// 获取所有用户的列表
export const reqUsers = () => ajax(BASE + '/usermains/list',{},'POST')
// 删除指定用户
export const reqDeleteUser = (userId) => ajax(BASE + '/usermains/delete', {userId}, 'POST')
// 添加/更新用户
export const reqAddOrUpdateUser = (user) => ajax(BASE + '/manage/user/'+(user.id ? 'update' : 'add'), user, 'POST')

// 订单列表
export const reqOrderList = () => ajax(BASE + '/ordersmains/list',{}, 'POST')
export const reqOrderSearchList = (filter) => ajax(BASE + '/ordersmains/list',{filter}, 'POST')
// 订单详情
export const reqOrderDetails = (id) => ajax(BASE + '/ordersmains/details',{id}, 'POST')

// 规则判断

export const reqJudgment = () => ajax(BASE + '/repairsinquirerules/list',{}, 'POST')

// 规则判断详情
export const reqJudgmentCreate = (type,name, filtering_content, filtering_content_type	, datas_1,datas_2,datas_3,datas_4,datas_5,datas_6,datas_7,datas_8,datas_9,datas_10,datas_11,datas_12,datas_13,status) => ajax(BASE + '/repairsinquirerules/create',{type,name, filtering_content, filtering_content_type	, datas_1,datas_2,datas_3,datas_4,datas_5,datas_6,datas_7,datas_8,datas_9,datas_10,datas_11,datas_12,datas_13,status}, 'POST')
export const reqJudgmentDetail = (id) => ajax(BASE + '/repairsinquirerules/details',{id}, 'POST')
export const reqJudgmentModify = (id,type,name, filtering_content, filtering_content_type, datas_1, datas_2,datas_3,datas_4,datas_5,datas_6,datas_7,datas_8,datas_9,datas_10,datas_11,datas_12,datas_13,status) => ajax(BASE + '/repairsinquirerules/modify',{id,type,name, filtering_content, filtering_content_type, datas_1, datas_2,datas_3,datas_4,datas_5,datas_6,datas_7,datas_8,datas_9,datas_10,datas_11,datas_12,datas_13,status}, 'POST')
export const reqJudgmentDelete = (id) => ajax(BASE + '/repairsinquirerules/delete',{id}, 'POST')
//修复套餐 创建、修改、列表、详情

export const reqRechargeCreate = (numbers, prices,status) => ajax(BASE + '/repairsinquirepaymentsgroups/create',{numbers, prices,status}, 'POST')
export const reqRechargeModify = (id,numbers, prices,status) => ajax(BASE + '/repairsinquirepaymentsgroups/modify',{id,numbers, prices,status}, 'POST')
export const reqRechargeList = () => ajax(BASE + '/repairsinquirepaymentsgroups/list',{}, 'POST')
export const reqRechargeDetails = (id) => ajax(BASE + '/repairsinquirepaymentsgroups/details',{id}, 'POST')


//获取前台用户信息
export const reqUserinfoDetails = (id) => ajax(BASE + '/usersmains/details',{id}, 'POST')