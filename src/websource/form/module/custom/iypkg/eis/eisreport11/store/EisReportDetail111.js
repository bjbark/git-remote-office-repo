Ext.define('module.custom.iypkg.eis.eisreport11.store.EisReportDetail111', { extend:'Axt.data.Store',
	model : 'module.custom.iypkg.eis.eisreport11.model.EisReportDetail111',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/iypkg/eis/eisreport11/get/detail1.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});