Ext.define('module.custom.sjflv.sale.export.report.store.ReportInvoice', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.sale.export.report.model.ReportInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
//			read  : _global.api_host_info + "/system/.custom.sjflv.sale.export.report/get/invoice.do",
//			update: _global.api_host_info + "/system/.custom.sjflv.sale.export.report/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
