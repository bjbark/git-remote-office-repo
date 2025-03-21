Ext.define('module.custom.komec.stock.isos.prodnotwork.store.ProdNotWork', { extend:'Axt.data.Store',
	model	: 'module.custom.komec.stock.isos.prodnotwork.model.ProdNotWork',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/custom/komec/stock/isos/prodnotwork/get/search.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});