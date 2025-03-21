Ext.define('module.sale.order.estimast.store.EstiMastInvoice', { extend:'Axt.data.Store',
	model: 'module.sale.order.estimast.model.EstiMastInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/sale/order/estimast/get/invoice.do",
			update: _global.api_host_info + "/system/sale/order/estimast/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
