Ext.define('module.sale.order.saleorder3.store.SaleOrder3Master', { extend:'Axt.data.Store',
	model: 'module.sale.order.saleorder3.model.SaleOrder3Master',
	autoLoad: false,
//	pageSize: Const.SELECT.rows,
	pageSize: 100,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/sale/order/saleorder3/get/search.do",
			update: _global.api_host_info + "/system/sale/order/saleorder3/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
