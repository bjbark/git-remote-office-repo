Ext.define('module.custom.iypkg.eis.eisreport13.store.EisReport131', { extend:'Axt.data.Store',
	model : 'module.custom.iypkg.eis.eisreport13.model.EisReport131',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/iypkg/eis/eisreport13/get/search1.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});