Ext.define('module.custom.sjflv.sale.export.exptinvoice.store.ExptInvoiceDetail1', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.sale.export.exptinvoice.model.ExptInvoiceDetail1',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/custom/sjflv/sale/export/exptinvoice/get/detail.do",
			update	: _global.location.http() + "/custom/sjflv/sale/export/exptinvoice/set/record.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});