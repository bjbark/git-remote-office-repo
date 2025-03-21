Ext.define('module.stock.isos.prodosttwait.store.ProdOsttWaitDetail', { extend:'Axt.data.Store',
	model	: 'module.stock.isos.prodosttwait.model.ProdOsttWaitDetail',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/stock/prodosttwait/get/detail.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});