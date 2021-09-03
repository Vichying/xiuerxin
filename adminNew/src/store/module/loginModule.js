import api from '../../api/index';
import config from '@/assets/config.json';
import router from "../../router/index";
const state = {
	userInfo: {
		id: '',
		name: ''
	}
}
const mutations = {

}
const getters = {

}


const actions = {


	getLoginCode({
		rootState,
		commit
	}) { //code
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

	getRoutes({
		rootState,
		commit
	}) { // 获取菜单栏列表
		return new Promise((resolve, reject) => {
			api.get(`${config.https.api}/adminxex/unifylogin/menuslists`, rootState.header)
				.then(data => {
					resolve(data);
				}).catch((err) => {
					console.log(err);
				});
		});
	},
	getLoginCode({
		rootState,
		commit
	}) { //code
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
	getuserInfo({
		rootState,
		commit
	}, opt) { //获取用户信息
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
	loginUser({
		rootState,
		commit
	}, opt) { //登入
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/account/login`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	async getOrderList({
		rootState,
		commit
	}, opt) { //订单列表
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/order/list`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	getOrderDetails({
		rootState,
		commit
	}, opt) { //订单详情
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/order/detail`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	orderProt({
		rootState,
		commit
	}, opt) { //订单导出
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/order/export`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	getSetmealList({
		rootState,
		commit
	}, opt) { //套餐列表
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
	modifySetmeal({
		rootState,
		commit
	}, opt) { //修改套餐
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
	insertSetmeal({
		rootState,
		commit
	}, opt) { //新增套餐
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
	deleteSetmeal({
		rootState,
		commit
	}, opt) { //删除套餐
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
	getEmainsList({
		rootState,
		commit
	}, opt) { //审核列表
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
	getUsersmains({
		rootState,
		commit
	}, opt) { //用户id
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
	getZhuti({
		rootState,
		commit
	}, opt) { //主体id
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
	getEmainDetails1({
		rootState,
		commit
	}, opt) { //审核详情--基本信息
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
	getEmainDetails2({
		rootState,
		commit
	}, opt) { //审核详情--法人以及申请人信息
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
	getEmainDetails3({
		rootState,
		commit
	}, opt) { //审核详情--材料修复
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
	getEmainDetails4({
		rootState,
		commit
	}, opt) { //审核详情--培训
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
	uploadFile({
		rootState,
		commit
	}, opt) { //文件上传
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
	updateDetails2({
		rootState,
		commit
	}, opt) { //修改保存基本信息
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
	updateDetails3({
		rootState,
		commit
	}, opt) { //修改材料修改
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
	updateDetails4({
		rootState,
		commit
	}, opt) { //培训
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
	updateDetails1({
		rootState,
		commit
	}, opt) { //审核
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
	getUserphone({
		rootState,
		commit
	}, opt) { //获取用户电话
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
	getFieldList({
		rootState,
		commit
	}, opt) { //规则字段类型列表
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
	updateField({
		rootState,
		commit
	}, opt) { //规则字段类型修改
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
	insertField({
		rootState,
		commit
	}, opt) { //规则字段类型添加
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
	deleteField({
		rootState,
		commit
	}, opt) { //规则字段类型删除
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
	getDataType({
		rootState,
		commit
	}, opt) { //规则数据类型-列表
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
	insertDataType({
		rootState,
		commit
	}, opt) { //规则数据类型添加
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
	updayeDataType({
		rootState,
		commit
	}, opt) { //规则数据类型修改
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
	deleteDataType({
		rootState,
		commit
	}, opt) { //规则数据类型删除
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
	ruleList({
		rootState,
		commit
	}, opt) { //规则管理列表
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
	gethangruleList({
		rootState,
		commit
	}, opt) { //规则管理行业分类
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
	getzhiruleList({
		rootState,
		commit
	}, opt) { //规则管理字段选择
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
	insertRuleList({
		rootState,
		commit
	}, opt) { //规则管理添加
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
	updateRuleList({
		rootState,
		commit
	}, opt) { //规则管理修改
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
	deleteRuleList({
		rootState,
		commit
	}, opt) { //规则管理删除
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
	getCostList({
		rootState,
		commit
	}, opt) { //费用管理-列表
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
	insertCostList({
		rootState,
		commit
	}, opt) { //费用管理-添加
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
	deleteCostList({
		rootState,
		commit
	}, opt) { //费用管理-删除
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/sysconfigcost/delete`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	updateCostList({
		rootState,
		commit
	}, opt) { //费用管理-修改
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/sysconfigcost/update`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	getAdminList({
		rootState,
		commit
	}, opt) { //管理员列表
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/systemsaccountsloginstypes/list`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	insertAdmin({
		rootState,
		commit
	}, opt) { //管理员添加
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/systemsaccountsloginstypes/create`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	chekAdmin({
		rootState,
		commit
	}, opt) { //管理员用户验证
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/systemsaccountsloginstypes/list`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	deleteAdmin({
		rootState,
		commit
	}, opt) { //管理员删除
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/systemsaccountsloginstypes/delete`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	updateAdmin({
		rootState,
		commit
	}, opt) { //管理员修改
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/systemsaccountsloginstypes/modify`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	getArtTypeList({
		rootState,
		commit
	}, opt) { //文章类型列表
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/creditarticletype/list`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	insertArtType({
		rootState,
		commit
	}, opt) { //文章类型添加
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/creditarticletype/create`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	updateArtType({
		rootState,
		commit
	}, opt) { //文章类型修改
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/creditarticletype/modify`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	getArtSourceList({
		rootState,
		commit
	}, opt) { //文章来源列表
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/creditarticlesource/list`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	insertArtSource({
		rootState,
		commit
	}, opt) { //文章来源添加
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/creditarticlesource/create`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	updateArtSource({
		rootState,
		commit
	}, opt) { //文章来源修改
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/creditarticlesource/modify`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	getArtList({
		rootState,
		commit
	}, opt) { //文章管理列表
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/creditarticle/list`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	insertArt({
		rootState,
		commit
	}, opt) { //文章管理添加
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/creditarticle/create`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	updateArt({
		rootState,
		commit
	}, opt) { //文章管理编辑
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/creditarticle/modify`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	deleteArt({
		rootState,
		commit
	}, opt) { //文章管理删除
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/creditarticle/delete`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	getJournalList({
		rootState,
		commit
	}, opt) { // 获取操作日志
		return new Promise((resolve, reject) => {
			let url = `${config.nhttp.api}/api/journal?page=${opt.page}&limit=${opt.limit}`;
			if (opt.user != '' && opt.user != null) {
				url += `&user=${opt.user}`;
			}
			if (opt.plateRouter != '' && opt.plateRouter != null) {
				url += `&plateRouter=${opt.plateRouter}`;
			}
			api.get(url, )
				.then(data => {
					if (data.data) {
						resolve(data.data);
					}
				}).catch((err) => {
					console.log(err);
				});
		});
	},
	insertJournal({
		rootState,
		commit
	}, opt) { //操作日志新增
		return new Promise((resolve, reject) => {
			api.post(`${config.nhttp.api}/api/journal`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},

	// 后台-菜单管理-列表
	getSysmenusList({
		rootState,
		commit
	}, opt) {
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/sysmenus/list`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},

	// 后台-菜单管理-删除
	sysmenusDelete({
		rootState,
		commit
	}, opt) {
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/sysmenus/delete`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},

	// 后台-菜单管理-详情
	sysmenusDetail({
		rootState,
		commit
	}, opt) {
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/sysmenus/detail`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},

	// 后台-菜单管理-修改
	sysmenusUpdate({
		rootState,
		commit
	}, opt) {
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/sysmenus/update`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},

	// 后台-菜单管理-添加
	sysmenusCreate({
		rootState,
		commit
	}, opt) {
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/sysmenus/create`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},

	// 后台-角色管理-列表
	getSysrolesList({
		rootState,
		commit
	}, opt) {
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/sysroles/list`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},

	// 后台-角色管理-添加
	sysrolesCreate({
		rootState,
		commit
	}, opt) {
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/sysroles/create`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},


	// 后台-角色管理-编辑
	sysrolesUpdate({
		rootState,
		commit
	}, opt) {
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/sysroles/update`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},

	// 后台-角色管理-详情
	sysrolesDetail({
		rootState,
		commit
	}, opt) {
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/sysroles/detail`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},

	//后台-角色管理-删除（逻辑删除）
	sysrolesDelete({
		rootState,
		commit
	}, opt) {
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/sysroles/delete`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},

	//后台-角色管理-更新状态
	sysrolesStatus({
		rootState,
		commit
	}, opt) {
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/sysroles/updatestatus`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	//后台-菜单管理-树列表
	sysrolesTreelist({
		rootState,
		commit
	}, opt) {
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/sysmenus/treelist`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	// 后台-员工管理-列表
	getAccountList({
		rootState,
		commit
	}, opt) {
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/account/list`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	// 后台-员工管理-修改
	accountUpdate({
		rootState,
		commit
	}, opt) {
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/account/update`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},
	// 后台-员工管理-添加
	accountCreate({
		rootState,
		commit
	}, opt) {
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/account/create`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},

	// 后台-员工管理-详情
	accountDetail({
		rootState,
		commit
	}, opt) {
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/account/detail`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},

	// 后台-员工管理-删除
	accountDelete({
		rootState,
		commit
	}, opt) {
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/account/delete`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},

	// 后台-员工管理-状态更新
	accountStatusChange({
		rootState,
		commit
	}, opt) {
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/account/updatestatus`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},

	// 后台-账号管理-更新
	userUpdate({
		rootState,
		commit
	}, opt) {
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/user/update`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},

	// 后台-账号管理-新增
	userCreate({
		rootState,
		commit
	}, opt) {
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/user/create`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},

	// 后台-账号管理-列表
	getUserList({
		rootState,
		commit
	}, opt) {
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/user/list`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},

	// 后台-账号管理-删除
	UserDelete({
		rootState,
		commit
	}, opt) {
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/user/delete`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},

	getMenusLists({
		rootState,
		commit
	}, opt) {
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/account/authcheck`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},

	// 账号管理-创建时输入账号模糊查询出用户列表
	searchList({
		rootState,
		commit
	}, opt) {
		return new Promise((resolve, reject) => {
			api.post(`${config.https.api}/adminxex/user/createlist`, opt).then(data => {
				if (data.data) {
					resolve(data.data);
				}
			}).catch((err) => {
				console.log(err);
			});
		});
	},

}
export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters,
}