Ext.define('module.eis.project.eisreport.store.EisReportMaster', { extend:'Axt.data.Store',
	model : 'module.eis.project.eisreport.model.EisReportMaster',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/eis/project/eisreport/get/search.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});