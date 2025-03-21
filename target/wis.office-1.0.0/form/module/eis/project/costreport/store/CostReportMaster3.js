Ext.define('module.eis.project.costreport.store.CostReportMaster3', { extend:'Axt.data.Store',
	model : 'module.eis.project.costreport.model.CostReportMaster3',
	pageSize : 1000,
	proxy : {
		api : {
			read	: _global.location.http() + "/eis/project/costreport/get/search3.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});