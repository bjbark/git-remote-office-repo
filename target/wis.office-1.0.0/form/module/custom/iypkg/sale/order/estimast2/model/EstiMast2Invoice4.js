Ext.define( 'module.custom.iypkg.sale.order.estimast2.model.EstiMast2Invoice4', {
	extend : 'module.custom.iypkg.sale.order.estimast2.model.EstiMast2Master',
	associations: [{
		type : 'hasMany',
		model : 'module.custom.iypkg.sale.order.estimast2.model.EstiMast2Detail4',
		associationKey : 'product',
		name : 'product'
	}]
});
