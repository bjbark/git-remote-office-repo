Ext.define('module.workshop.sale.order.estimast.store.EstiMastItem1', { extend:'Axt.data.Store',
	model : 'module.workshop.sale.order.estimast.model.EstiMastItem1',
	pageSize : 100,
	proxy : {
		api : {
			 read	: _global.location.http() + "/custom/hjsys/sale/order/estimast/get/SearchLister3.do"
			,update : _global.location.http() + "/custom/hjsys/sale/order/estimast/set/item1.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});