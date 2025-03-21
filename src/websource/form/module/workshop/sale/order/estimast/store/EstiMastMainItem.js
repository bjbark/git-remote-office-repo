Ext.define('module.workshop.sale.order.estimast.store.EstiMastMainItem', { extend:'Axt.data.Store',
	model : 'module.workshop.sale.order.estimast.model.EstiMastMainItem',
	pageSize : 20,
	proxy : {
		api : {
			 read	: _global.location.http() + "/workshop/sale/order/estimast/get/indx.do",
			 update	: _global.location.http() + "/workshop/sale/order/estimast/set/prnt_indx.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});