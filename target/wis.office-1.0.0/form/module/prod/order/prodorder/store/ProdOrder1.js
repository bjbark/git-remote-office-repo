Ext.define('module.prod.order.prodorder.store.ProdOrder1', { extend:'Axt.data.Store',
	model	: 'module.prod.order.prodorder.model.ProdOrder1',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/prod/order/prodorder/get/search1.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});