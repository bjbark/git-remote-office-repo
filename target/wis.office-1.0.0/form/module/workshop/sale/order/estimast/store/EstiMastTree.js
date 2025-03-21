Ext.define('module.workshop.sale.order.estimast.store.EstiMastTree', { extend:'Axt.data.Store',
	model : 'module.workshop.sale.order.estimast.model.EstiMastTree',
	autoLoad: false,
	root	: { expanded: false },
	proxy : {
		api : {
			read	: _global.location.http() + "/workshop/sale/order/estimast/get/tree.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	},
});