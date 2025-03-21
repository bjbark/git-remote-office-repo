Ext.define('module.sale.order.saleorder2.store.SaleOrder2Invoice', { extend:'Axt.data.Store',
	model: 'module.sale.order.saleorder2.model.SaleOrder2Invoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/sale/order/saleorder2/get/invoice.do",
			update: _global.api_host_info + "/system/sale/order/saleorder2/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
