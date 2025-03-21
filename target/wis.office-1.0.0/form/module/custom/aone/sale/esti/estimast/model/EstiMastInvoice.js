Ext.define( 'module.custom.aone.sale.esti.estimast.model.EstiMastInvoice', {
	extend : 'module.custom.aone.sale.esti.estimast.model.EstiMastMaster',
	associations: [{
		type : 'hasMany',
		model : 'module.custom.aone.sale.esti.estimast.model.EstiMastDetail',
		associationKey : 'product',
		name : 'product'
	}]
});
