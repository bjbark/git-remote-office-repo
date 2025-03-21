Ext.define('module.prod.order.prodorderv2.store.ProdOrderV21', { extend:'Axt.data.Store',
	model	: 'module.prod.order.prodorderv2.model.ProdOrderV21',
	autoLoad: false,
	pageSize: 100,
	remoteSort	: true,
	proxy	: {
		api	: {
			read : _global.location.http() + "/prod/order/prodorderv2/get/search1.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});