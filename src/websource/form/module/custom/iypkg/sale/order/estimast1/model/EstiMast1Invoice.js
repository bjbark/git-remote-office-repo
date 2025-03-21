Ext.define( 'module.custom.iypkg.sale.order.estimast1.model.EstiMast1Invoice', {
	extend : 'module.custom.iypkg.sale.order.estimast1.model.EstiMast1Master',
	associations: [{
		type : 'hasMany',
		model : 'module.custom.iypkg.sale.order.estimast1.model.EstiMast1Detail',
		associationKey : 'product',
		name : 'product'
	}]
});
