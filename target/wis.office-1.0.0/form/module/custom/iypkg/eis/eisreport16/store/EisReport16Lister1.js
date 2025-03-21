Ext.define('module.custom.iypkg.eis.eisreport16.store.EisReport16Lister1', { extend:'Axt.data.Store',
	model : 'module.custom.iypkg.eis.eisreport16.model.EisReport16',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/basic/bzplmast/get/search.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});