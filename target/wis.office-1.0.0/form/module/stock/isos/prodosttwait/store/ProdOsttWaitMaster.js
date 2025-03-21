Ext.define('module.stock.isos.prodosttwait.store.ProdOsttWaitMaster', { extend:'Axt.data.Store',
	model	: 'module.stock.isos.prodosttwait.model.ProdOsttWaitMaster',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/stock/prodosttwait/get/master.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});