Ext.define('module.eis.project.costreport.store.CostReportMaster2', { extend:'Axt.data.Store',
	model : 'module.eis.project.costreport.model.CostReportMaster2',
	pageSize : 1000,
	proxy : {
		api : {
			read	: _global.location.http() + "/eis/project/costreport/get/search2.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});