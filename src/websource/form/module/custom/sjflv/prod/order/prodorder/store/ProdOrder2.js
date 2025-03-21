Ext.define('module.custom.sjflv.prod.order.prodorder.store.ProdOrder2', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.prod.order.prodorder.model.ProdOrder2',
	pageSize: 200,
	proxy	: {
		api	: {
			read	: _global.location.http() + "/custom/sjflv/prod/prodorder/get/search2.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});