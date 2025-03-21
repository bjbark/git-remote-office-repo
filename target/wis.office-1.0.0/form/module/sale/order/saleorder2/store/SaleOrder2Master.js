Ext.define('module.sale.order.saleorder2.store.SaleOrder2Master', { extend:'Axt.data.Store',
	model: 'module.sale.order.saleorder2.model.SaleOrder2Master',
	autoLoad: false,
//	pageSize: Const.SELECT.rows,
	pageSize: 100,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/sale/order/saleorder2/get/search.do",
			update: _global.api_host_info + "/system/sale/order/saleorder2/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
