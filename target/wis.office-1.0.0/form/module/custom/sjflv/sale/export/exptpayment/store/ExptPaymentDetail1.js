Ext.define('module.custom.sjflv.sale.export.exptpayment.store.ExptPaymentDetail1', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.sale.export.exptpayment.model.ExptPaymentDetail1',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/custom/sjflv/sale/export/exptpayment/get/detail1.do",
			update	: _global.location.http() + "/custom/sjflv/sale/export/exptpayment/set/record.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});