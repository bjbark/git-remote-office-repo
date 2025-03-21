Ext.define( 'module.custom.sjflv.sale.export.report.model.ReportInvoice', {
	extend: 'module.custom.sjflv.sale.export.report.model.ReportWorkerDetail',
	associations: [{
		type: 'hasMany',
		model: 'module.custom.sjflv.sale.export.report.model.ReportWorkerMaster',
		associationKey: 'product',
		name: 'product'
	}]
});