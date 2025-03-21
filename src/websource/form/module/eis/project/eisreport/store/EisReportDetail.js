Ext.define('module.eis.project.eisreport.store.EisReportDetail', { extend:'Axt.data.Store',
	model : 'module.eis.project.eisreport.model.EisReportDetail',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/eis/project/eisreport/get/search2.do",
			update : _global.location.http() + "/prod/cvic/eisreport/set/detail.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});