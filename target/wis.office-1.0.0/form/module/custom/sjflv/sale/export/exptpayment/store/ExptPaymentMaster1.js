Ext.define('module.custom.sjflv.sale.export.exptpayment.store.ExptPaymentMaster1', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.sale.export.exptpayment.model.ExptPaymentMaster1',
	pageSize: 100,
	proxy	: {
		api	: {
			read   : _global.location.http() + "/custom/sjflv/sale/export/exptpayment/get/search.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});