Ext.define('module.workshop.sale.order.estimast.store.EstiMastCopy', { extend:'Axt.data.Store',
	model: 'module.workshop.sale.order.estimast.model.EstiMast',
	pageSize: 20,
	proxy:{
		api:{
			read	: _global.location.http() + "/workshop/sale/order/estimast/get/search.do",
			update	: _global.location.http() + "/workshop/sale/order/estimast/set/records.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});