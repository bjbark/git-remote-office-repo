Ext.define('module.prod.order.otodwork.store.OtodWorkInvoice', { extend:'Axt.data.Store',
	model: 'module.prod.order.otodwork.model.OtodWorkInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/prod/order/otodwork/get/search.do",
			update: _global.api_host_info + "/system/prod/order/otodwork/set/invoice2.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
