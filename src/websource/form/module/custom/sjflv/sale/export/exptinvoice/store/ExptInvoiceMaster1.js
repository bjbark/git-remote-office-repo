Ext.define('module.custom.sjflv.sale.export.exptinvoice.store.ExptInvoiceMaster1', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.sale.export.exptinvoice.model.ExptInvoiceMaster1',
	pageSize: 100,
	proxy	: {
		api	: {
			read   : _global.location.http() + "/custom/sjflv/sale/export/exptinvoice/get/search.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});