Ext.define('module.workshop.sale.order.ordermast.store.OrderMastTree', { extend:'Axt.data.Store',
	model : 'module.workshop.sale.order.ordermast.model.OrderMastTree',
	autoLoad: false,
	root	: { expanded: false },
	proxy : {
		api : {
			read	: _global.location.http() + "/workshop/sale/order/ordermast/get/tree.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	},
});