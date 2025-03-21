Ext.define('module.prod.order.prodnotlist.store.ProdNotList', { extend:'Axt.data.Store',
	model	: 'module.prod.order.prodnotlist.model.ProdNotList',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/prod/order/prodnotlist/get/search.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});