Ext.define('module.custom.inkopack.eis.eisreport16.store.EisReport16Master', { extend:'Axt.data.Store',
	model : 'module.custom.inkopack.eis.eisreport16.model.EisReport16Master',
	pageSize : 15,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/incopack/eis/eisreport16/get/search.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});