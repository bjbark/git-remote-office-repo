Ext.define('module.custom.iypkg.sale.order.saleorder.store.SaleOrderWkct', { extend:'Axt.data.Store',
	model		: 'module.custom.iypkg.sale.order.saleorder.model.SaleOrderWkct',
	autoLoad	: false,
	remoteSort	: true,
	pageSize	: 9999999,
	proxy		: {
		api		: {
			read	: _global.api_host_info + "/system/custom/iypkg/sale/order/saleorder/get/wkct.do",
			update	: _global.api_host_info + "/system/custom/iypkg/sale/order/saleorder/set/wkct.do"
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

