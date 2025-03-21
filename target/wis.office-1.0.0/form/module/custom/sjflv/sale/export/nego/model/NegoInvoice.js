Ext.define( 'module.custom.sjflv.sale.export.nego.model.NegoInvoice', {
	extend: 'module.custom.sjflv.sale.export.nego.model.NegoWorkerDetail',
	associations: [{
		type: 'hasMany',
		model: 'module.custom.sjflv.sale.export.nego.model.NegoWorkerEditor',
		associationKey: 'product',
		name: 'product'
	}]
});