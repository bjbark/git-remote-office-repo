Ext.define('module.custom.hjsys.sale.order.saleorder.store.SaleOrderItem1', { extend:'Axt.data.Store',
	model : 'module.custom.hjsys.sale.order.saleorder.model.SaleOrderItem1',
	pageSize : 100,
	proxy : {
		api : {
			 read	: _global.location.http() + "/custom/hjsys/sale/order/saleorder/get/SearchLister3.do"
			,update : _global.location.http() + "/custom/hjsys/sale/order/saleorder/set/item1.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});