Ext.define('module.prod.order.otodwork.store.OtodWorkDetail', { extend:'Axt.data.Store',
	model: 'module.prod.order.otodwork.model.OtodWorkDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/prod/order/otodwork/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
