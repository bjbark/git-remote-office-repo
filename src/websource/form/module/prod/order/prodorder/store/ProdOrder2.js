Ext.define('module.prod.order.prodorder.store.ProdOrder2', { extend:'Axt.data.Store',
	model	: 'module.prod.order.prodorder.model.ProdOrder2',
	pageSize: 200,
	proxy	: {
		api	: {
			read	: _global.location.http() + "/prod/order/prodorder/get/search2.do",
			update	: _global.location.http() + "/prod/order/prodorder/set/record.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});