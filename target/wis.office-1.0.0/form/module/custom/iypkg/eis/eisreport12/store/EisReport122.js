Ext.define('module.custom.iypkg.eis.eisreport12.store.EisReport122', { extend:'Axt.data.Store',
	model : 'module.custom.iypkg.eis.eisreport12.model.EisReport122',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/iypkg/eis/eisreport12/get/search2.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});