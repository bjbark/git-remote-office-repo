Ext.define('module.custom.sjflv.sale.export.exptpayment.store.ExptPaymentWorkerLister', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.sale.export.exptpayment.model.ExptPaymentWorkerMaster',
	pageSize: 100,
	proxy	: {
		api	: {
			read   : _global.location.http() + "/custom/sjflv/sale/export/exptpayment/get/workerlister.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});