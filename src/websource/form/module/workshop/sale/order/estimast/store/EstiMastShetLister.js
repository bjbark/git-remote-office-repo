Ext.define('module.workshop.sale.order.estimast.store.EstiMastShetLister', { extend:'Axt.data.Store',
	model: 'module.workshop.sale.order.estimast.model.EstiMastShetLister',
	pageSize: 20,
	proxy:{
		api:{
			read	: _global.location.http()  + "/workshop/sale/order/estimast/get/shet.do",
			update	: _global.location.http() + "/workshop/sale/order/estimast/set/prnt_shet.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});