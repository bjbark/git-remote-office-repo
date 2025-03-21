Ext.define('module.custom.inkopack.prod.pdodlist.store.PdodListMaster', { extend:'Axt.data.Store',
	model : 'module.custom.inkopack.prod.pdodlist.model.PdodListMaster',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/inkopack/prod/pdodlist/get/search1.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});