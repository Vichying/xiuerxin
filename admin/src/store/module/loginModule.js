import api from '../../api/index';
import config from '@/assets/config.json';
import router from "../../router/index";  
const state = {
	userInfo:{
		id:'',
		name:''
	}
}
const mutations = {

}
const getters = {
	
}
const actions = {
	getRoutes({ rootState, commit }) { // 获取菜单栏列表
		return new Promise((resolve, reject) => {
			api.get(`${config.https.api}/adminxex/unifylogin/menuslists`,rootState.header)
				.then(data => {
					resolve(data);
				}).catch((err) => {
					console.log(err);
				});
		});
	},
	getLoginCode({ rootState, commit }) { //code
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/unifylogin/getcodes`).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	getuserInfo({ rootState, commit }, opt) { //获取用户信息
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/unifylogin/personalinfos`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	loginUser({ rootState, commit }, opt) { //登入
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/unifylogin/unifylogins`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	async getOrderList({ rootState, commit }, opt) { //订单列表
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/ordersmains/list`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	getOrderDetails({ rootState, commit }, opt) { //订单详情
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/ordersmains/details`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	getSetmealList({ rootState, commit }, opt) { //套餐列表
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/repairsinquirepaymentsgroups/list`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	modifySetmeal({ rootState, commit }, opt) { //修改套餐
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/repairsinquirepaymentsgroups/modify`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	insertSetmeal({ rootState, commit }, opt) { //新增套餐
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/repairsinquirepaymentsgroups/create`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	deleteSetmeal({ rootState, commit }, opt) { //删除套餐
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/repairsinquirepaymentsgroups/delete`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	getEmainsList({ rootState, commit }, opt) { //审核列表
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/repairsinquiremains/list`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
    getUsersmains({ rootState, commit }, opt) { //用户id
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/usersmains/list`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	getZhuti({ rootState, commit }, opt) { //主体id
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/repairsinquiremains/list`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	getEmainDetails1({ rootState, commit }, opt) { //审核详情--基本信息
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/repairsinquiremains/details`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	getEmainDetails2({ rootState, commit }, opt) { //审核详情--法人以及申请人信息
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/repairsinquirebasicsinfos/details`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	getEmainDetails3({ rootState, commit }, opt) { //审核详情--材料修复
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/repairsinquirecasesinfos/list`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	getEmainDetails4({ rootState, commit }, opt) { //审核详情--培训
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/repairsinquirematerialsbasicsinfos/list`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	uploadFile({ rootState, commit }, opt) { //文件上传
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/api/filesup/files`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	updateDetails2({ rootState, commit }, opt) { //修改保存基本信息
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/repairsinquirebasicsinfos/modify`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	updateDetails3({ rootState, commit }, opt) { //修改材料修改
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/repairsinquirecasesinfos/modify`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	updateDetails4({ rootState, commit }, opt) { //培训
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/repairsinquirematerialsbasicsinfos/modify`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	updateDetails1({ rootState, commit }, opt) { //审核
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/repairsinquiremains/modify`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	getUserphone({ rootState, commit }, opt) { //获取用户电话
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/usersmains/details`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	getFieldList({ rootState, commit }, opt) { //规则字段类型列表
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/repairsinquirerulesfieldtags/list`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	updateField({ rootState, commit }, opt) { //规则字段类型修改
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/repairsinquirerulesfieldtags/modify`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	insertField({ rootState, commit }, opt) { //规则字段类型添加
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/repairsinquirerulesfieldtags/create`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	deleteField({ rootState, commit }, opt) { //规则字段类型删除
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/repairsinquirerulesfieldtags/delete`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	getDataType({ rootState, commit }, opt) { //规则数据类型-列表
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/repairsinquirerulesdatastypes/list`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	insertDataType({ rootState, commit }, opt) { //规则数据类型添加
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/repairsinquirerulesdatastypes/create`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	updayeDataType({ rootState, commit }, opt) { //规则数据类型修改
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/repairsinquirerulesdatastypes/modify`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	deleteDataType({ rootState, commit }, opt) { //规则数据类型删除
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/repairsinquirerulesdatastypes/delete`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	ruleList({ rootState, commit }, opt) { //规则管理列表
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/repairsinquirerules/list`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	gethangruleList({ rootState, commit }, opt) { //规则管理行业分类
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/repairscompanyscodes/list`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	getzhiruleList({ rootState, commit }, opt) { //规则管理字段选择
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/repairsinquirerulesfieldtags/list`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	insertRuleList({ rootState, commit }, opt) { //规则管理添加
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/repairsinquirerules/create`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	updateRuleList({ rootState, commit }, opt) { //规则管理修改
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/repairsinquirerules/modify`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	deleteRuleList({ rootState, commit }, opt) { //规则管理删除
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/repairsinquirerules/delete`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	getCostList({ rootState, commit }, opt) { //费用管理-列表
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/sysconfigcost/list`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	insertCostList({ rootState, commit }, opt) { //费用管理-添加
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/sysconfigcost/create`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	updateCostList({ rootState, commit }, opt) { //费用管理-修改
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/sysconfigcost/modify`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	}
}
export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters,
}