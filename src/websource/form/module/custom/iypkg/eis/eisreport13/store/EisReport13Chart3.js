Ext.define('module.custom.iypkg.eis.eisreport13.store.EisReport13Chart3', { extend:'Axt.data.Store',
	model : 'module.custom.iypkg.eis.eisreport13.model.EisReport13Chart3',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/iypkg/eis/eisreport13/get/chart3.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});