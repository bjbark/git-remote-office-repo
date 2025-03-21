Ext.define('module.prod.order.workbooklist.store.WorkBookListDetail', { extend:'Axt.data.Store',
	model: 'module.prod.order.workbooklist.model.WorkBookListDetail',
	autoLoad: false,
//	pageSize: Const.SELECT.rows,
	pageSize: 100,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/prod/order/workbooklist/get/detail.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
