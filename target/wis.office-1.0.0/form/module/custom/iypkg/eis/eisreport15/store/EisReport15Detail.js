Ext.define('module.custom.iypkg.eis.eisreport15.store.EisReport15Detail', { extend:'Axt.data.Store',
	model : 'module.custom.iypkg.eis.eisreport15.model.EisReport15Detail',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/iypkg/eis/eisreport15/get/detail.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});