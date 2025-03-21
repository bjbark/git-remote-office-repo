Ext.define( 'module.custom.sjflv.sale.export.blmast.model.BlMastInvoice', {
	extend: 'module.custom.sjflv.sale.export.blmast.model.BlMastWorkerDetail',
	associations: [{
		type: 'hasMany',
		model: 'module.custom.sjflv.sale.export.blmast.model.BlMastWorkerEditor',
		associationKey: 'product',
		name: 'product'
	}]
});