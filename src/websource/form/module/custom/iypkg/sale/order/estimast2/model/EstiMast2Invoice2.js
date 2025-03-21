Ext.define( 'module.custom.iypkg.sale.order.estimast2.model.EstiMast2Invoice2', {
	extend : 'module.custom.iypkg.sale.order.estimast2.model.EstiMast2Master',
	associations: [{
		type : 'hasMany',
		model : 'module.custom.iypkg.sale.order.estimast2.model.EstiMast2Detail2',
		associationKey : 'product',
		name : 'product'
	}]
});
