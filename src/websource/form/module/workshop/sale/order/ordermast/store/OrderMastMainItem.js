Ext.define('module.workshop.sale.order.ordermast.store.OrderMastMainItem', { extend:'Axt.data.Store',
	model : 'module.workshop.sale.order.ordermast.model.OrderMastMainItem',
	pageSize : 20,
	proxy : {
		api : {
			 read	: _global.location.http() + "/workshop/sale/order/ordermast/get/indx.do",
			 update	: _global.location.http() + "/workshop/sale/order/ordermast/set/prnt_indx.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});