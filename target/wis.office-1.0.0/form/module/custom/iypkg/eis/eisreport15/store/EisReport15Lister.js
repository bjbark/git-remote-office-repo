Ext.define('module.custom.iypkg.eis.eisreport15.store.EisReport15Lister', { extend:'Axt.data.Store',
	model : 'module.custom.iypkg.eis.eisreport15.model.EisReport15',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/iypkg/eis/eisreport15/get/search.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});