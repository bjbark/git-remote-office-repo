Ext.define('module.custom.iypkg.sale.order.saleorder.store.SaleOrder', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.sale.order.saleorder.model.SaleOrder',
	pageSize : 500,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/sale/order/saleorder/get/search.do",
			update: _global.api_host_info + "/system/custom/iypkg/sale/order/saleorder/set/record.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
