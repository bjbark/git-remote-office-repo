Ext.define('module.prod.order.otodwork.store.OtodWorkMaster', { extend:'Axt.data.Store',
	model: 'module.prod.order.otodwork.model.OtodWorkMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/prod/order/otodwork/get/master.do"
//			update: _global.api_host_info + "/system/prod/project/otodwork/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
