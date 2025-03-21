Ext.define('module.custom.iypkg.sale.order.saleorder.store.SaleOrderFabc', { extend:'Axt.data.Store',
	model		: 'module.custom.iypkg.sale.order.saleorder.model.SaleOrderFabc',
	autoLoad	: false,
	remoteSort	: true,
	pageSize	: 99999999,
	proxy		: {
		api		: {
			read	: _global.api_host_info + "/system/custom/iypkg/sale/order/saleorder/get/fabc.do",
			update	: _global.api_host_info + "/system/custom/iypkg/sale/order/saleorder/set/fabc.do"
		},
		actionMethods: {
			read	: 'POST',
			update	: 'POST'
		},
		extraParams:{
			token	: _global.token_id
		}
	}
});

