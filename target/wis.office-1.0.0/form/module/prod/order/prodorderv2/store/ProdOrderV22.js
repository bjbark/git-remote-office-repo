Ext.define('module.prod.order.prodorderv2.store.ProdOrderV22', { extend:'Axt.data.Store',
	model	: 'module.prod.order.prodorderv2.model.ProdOrderV22',
	pageSize: 200,
	proxy	: {
		api	: {
			read	: _global.location.http() + "/prod/order/prodorderv2/get/search2.do",
			update	: _global.location.http() + "/prod/order/prodorderv2/set/record.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});