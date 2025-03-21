Ext.define('module.workshop.sale.order.ordermast.store.OrderMastItem1', { extend:'Axt.data.Store',
	model : 'module.workshop.sale.order.ordermast.model.OrderMastItem1',
	pageSize : 100,
	proxy : {
		api : {
			 read	: _global.location.http() + "/custom/hjsys/sale/order/ordermast/get/SearchLister3.do"
			,update : _global.location.http() + "/custom/hjsys/sale/order/ordermast/set/item1.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});