Ext.define('module.custom.iypkg.eis.eisreport13.store.EisReport13Chart2', { extend:'Axt.data.Store',
	model : 'module.custom.iypkg.eis.eisreport13.model.EisReport13Chart2',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/iypkg/eis/eisreport13/get/chart2.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});