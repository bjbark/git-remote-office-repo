Ext.define( 'module.custom.sjflv.sale.export.exptpayment.model.ExptPaymentInvoice', {
	extend: 'module.custom.sjflv.sale.export.exptpayment.model.ExptPaymentWorkerDetail',
	associations: [{
		type: 'hasMany',
		model: 'module.custom.sjflv.sale.export.exptpayment.model.ExptPaymentWorkerMaster',
		associationKey: 'product',
		name: 'product'
	}]
});