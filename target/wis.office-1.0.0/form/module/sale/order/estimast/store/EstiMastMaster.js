Ext.define('module.sale.order.estimast.store.EstiMastMaster', { extend:'Axt.data.Store',
	model: 'module.sale.order.estimast.model.EstiMastMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/sale/order/estimast/get/search.do",
			update: _global.api_host_info + "/system/sale/order/estimast/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
