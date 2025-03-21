Ext.define( 'module.custom.hantop.sale.estientry.model.EstiEntryInvoice', {
	extend : 'module.custom.hantop.sale.estientry.model.EstiEntryMaster',
	associations: [{
		type : 'hasMany',
		model : 'module.custom.hantop.sale.estientry.model.EstiEntryDetail',
		associationKey : 'product',
		name : 'product'
	}]
});
