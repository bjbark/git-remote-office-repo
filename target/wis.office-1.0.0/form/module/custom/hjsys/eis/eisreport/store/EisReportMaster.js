Ext.define('module.custom.hjsys.eis.eisreport.store.EisReportMaster', { extend:'Axt.data.Store',
	model : 'module.custom.hjsys.eis.eisreport.model.EisReportMaster',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/hjsys/eis/eisreport/get/search.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});