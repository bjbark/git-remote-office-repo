Ext.define('module.custom.sjflv.sale.export.report.store.ReportDetail1', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.sale.export.report.model.ReportDetail1',
	pageSize: 200,
	proxy	: {
		api	: {
//			read : _global.location.http() + "/.custom.sjflv.sale.export.report/get/detail1.do",
//			update	: _global.location.http() + "/.custom.sjflv.sale.export.report/set/record.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});