Ext.define( 'module.custom.sjflv.sale.export.exptinvoice.model.ExptInvoiceInvoice', {
	extend: 'module.custom.sjflv.sale.export.exptinvoice.model.ExptInvoiceWorkerDetail',
	associations: [{
		type: 'hasMany',
		model: 'module.custom.sjflv.sale.export.exptinvoice.model.ExptInvoiceWorkerMaster',
		associationKey: 'product',
		name: 'product'
	}]
});