Ext.define( 'module.custom.sjflv.sale.sale.salework.model.SaleWorkInvoice', {
	extend: 'module.custom.sjflv.sale.sale.salework.model.SaleWorkWorkerMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.custom.sjflv.sale.sale.salework.model.SaleWorkWorkerDetail',
		associationKey: 'product',
		name: 'product'
	}]
});