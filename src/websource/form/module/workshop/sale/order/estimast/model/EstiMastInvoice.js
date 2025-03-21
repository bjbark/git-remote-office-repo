Ext.define( 'module.workshop.sale.order.estimast.model.EstiMastInvoice', {
	extend: 'module.workshop.sale.order.estimast.model.EstiMastMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.workshop.sale.order.estimast.model.EstiMastDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
