Ext.define('module.custom.hjsys.sale.order.saleorder.store.SaleOrderItem2', { extend:'Axt.data.Store',
	model : 'module.custom.hjsys.sale.order.saleorder.model.SaleOrderItem2',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/hjsys/sale/order/saleorder/get/SearchLister4.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});