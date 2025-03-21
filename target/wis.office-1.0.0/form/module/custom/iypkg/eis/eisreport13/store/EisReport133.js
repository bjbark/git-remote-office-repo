Ext.define('module.custom.iypkg.eis.eisreport13.store.EisReport133', { extend:'Axt.data.Store',
	model : 'module.custom.iypkg.eis.eisreport13.model.EisReport133',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/iypkg/eis/eisreport13/get/search3.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});