Ext.define('module.custom.hjsys.eis.eisreport.store.EisReportDetail1', { extend:'Axt.data.Store',
	model : 'module.custom.hjsys.eis.eisreport.model.EisReportDetail1',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/hjsys/eis/eisreport/get/searchDetail.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});