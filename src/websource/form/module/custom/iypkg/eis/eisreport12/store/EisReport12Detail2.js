Ext.define('module.custom.iypkg.eis.eisreport12.store.EisReport12Detail2', { extend:'Axt.data.Store',
	model : 'module.custom.iypkg.eis.eisreport12.model.EisReport12Detail2',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/iypkg/eis/eisreport12/get/detail2.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});