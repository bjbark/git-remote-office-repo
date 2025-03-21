Ext.define('module.custom.iypkg.eis.eisreport14.store.EisReport14Chart2', { extend:'Axt.data.Store',
	model : 'module.custom.iypkg.eis.eisreport14.model.EisReport14',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/iypkg/eis/eisreport14/get/chart2.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});