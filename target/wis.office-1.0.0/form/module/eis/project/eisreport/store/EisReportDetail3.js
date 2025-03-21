Ext.define('module.eis.project.eisreport.store.EisReportDetail3', { extend:'Axt.data.Store',
	model : 'module.eis.project.eisreport.model.EisReportDetail3',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/eis/project/eisreport/get/search4.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});