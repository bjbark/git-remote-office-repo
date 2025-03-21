Ext.define('module.custom.sjflv.sale.export.exptpayment.store.ExptPaymentInvoice', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.sale.export.exptpayment.model.ExptPaymentInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/sale/export/exptinvoice/get/invoice.do",
			update: _global.api_host_info + "/system/custom/sjflv/sale/export/exptinvoice/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
