Ext.define('module.eis.project.costreport.store.CostReportMaster1', { extend:'Axt.data.Store',
	model : 'module.eis.project.costreport.model.CostReportMaster1',
	pageSize : 1000,
	proxy : {
		api : {
			read	: _global.location.http() + "/eis/project/costreport/get/search1.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});