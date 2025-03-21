Ext.define('module.custom.iypkg.eis.eisreport11.store.EisReport112', { extend:'Axt.data.Store',
	model : 'module.custom.iypkg.eis.eisreport11.model.EisReport112',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/iypkg/eis/eisreport11/get/search2.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});