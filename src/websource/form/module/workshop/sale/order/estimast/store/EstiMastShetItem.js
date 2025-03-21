Ext.define('module.workshop.sale.order.estimast.store.EstiMastShetItem', { extend:'Axt.data.Store',
	model : 'module.workshop.sale.order.estimast.model.EstiMastShetItem',
	pageSize : 20,
	proxy : {
		api : {
			 read	: _global.location.http() + "/workshop/sale/order/estimast/get/shet2.do",
			 update	: _global.location.http() + "/workshop/sale/order/estimast/set/prnt_shet.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});