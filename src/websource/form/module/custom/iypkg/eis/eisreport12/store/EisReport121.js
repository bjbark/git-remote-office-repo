Ext.define('module.custom.iypkg.eis.eisreport12.store.EisReport121', { extend:'Axt.data.Store',
	model : 'module.custom.iypkg.eis.eisreport12.model.EisReport121',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/iypkg/eis/eisreport12/get/search1.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});