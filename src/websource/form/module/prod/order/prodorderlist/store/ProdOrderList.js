Ext.define('module.prod.order.prodorderlist.store.ProdOrderList', { extend:'Axt.data.Store',
	model	: 'module.prod.order.prodorderlist.model.ProdOrderList',
	pageSize: 100,
	proxy	: {
		api	: {
			read : _global.location.http() + "/prod/order/prodorderlist/get/search.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});