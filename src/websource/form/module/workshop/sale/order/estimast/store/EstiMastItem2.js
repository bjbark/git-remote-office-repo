Ext.define('module.workshop.sale.order.estimast.store.EstiMastItem2', { extend:'Axt.data.Store',
	model : 'module.workshop.sale.order.estimast.model.EstiMastItem2',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/hjsys/sale/order/estimast/get/SearchLister4.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});