Ext.define( 'module.sale.order.estimast.model.EstiMastInvoice', {
	extend : 'module.sale.order.estimast.model.EstiMastMaster',
	associations: [{
		type : 'hasMany',
		model : 'module.sale.order.estimast.model.EstiMastDetail',
		associationKey : 'product',
		name : 'product'
	}]
});
