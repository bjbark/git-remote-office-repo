Ext.define('module.workshop.sale.order.ordermast.store.OrderMastSubItem', { extend:'Axt.data.Store',
	model : 'module.workshop.sale.order.ordermast.model.OrderMastSubItem',
	pageSize : 20,
	proxy : {
		api : {
			 read	: _global.location.http() + "/workshop/sale/order/ordermast/get/proc.do",
			 update	: _global.location.http() + "/workshop/sale/order/ordermast/set/proc.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});