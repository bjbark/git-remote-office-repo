Ext.define('module.custom.iypkg.eis.eisreport12.store.EisReport12Chart1', { extend:'Axt.data.Store',
	model : 'module.custom.iypkg.eis.eisreport12.model.EisReport12Chart1',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/iypkg/eis/eisreport12/get/detail1.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});