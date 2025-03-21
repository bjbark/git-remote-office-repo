Ext.define( 'module.custom.iypkg.sale.order.estimast2.model.EstiMast2Invoice3', {
	extend : 'module.custom.iypkg.sale.order.estimast2.model.EstiMast2Master',
	associations: [{
		type : 'hasMany',
		model : 'module.custom.iypkg.sale.order.estimast2.model.EstiMast2Detail3',
		associationKey : 'product',
		name : 'product'
	}]
});
