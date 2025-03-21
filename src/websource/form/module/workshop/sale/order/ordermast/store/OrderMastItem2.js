Ext.define('module.workshop.sale.order.ordermast.store.OrderMastItem2', { extend:'Axt.data.Store',
	model : 'module.workshop.sale.order.ordermast.model.OrderMastItem2',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/hjsys/sale/order/ordermast/get/SearchLister4.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});