Ext.define('module.prod.order.prodorderv2.store.ProdOrderV2Detail', { extend:'Axt.data.Store',
	model	: 'module.prod.order.prodorderv2.model.ProdOrderV2Detail',
	pageSize: 200,
	proxy	: {
		api	: {
			read	: _global.location.http() + "/prod/order/prodorderv2/get/detail.do",
			update	: _global.location.http() + "/prod/order/prodorderv2/set/detail.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});