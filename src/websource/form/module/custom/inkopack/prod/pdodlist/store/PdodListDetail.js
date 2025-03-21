Ext.define('module.custom.inkopack.prod.pdodlist.store.PdodListDetail', { extend:'Axt.data.Store',
	model : 'module.custom.inkopack.prod.pdodlist.model.PdodListDetail',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/inkopack/prod/pdodlist/get/search2.do",
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});