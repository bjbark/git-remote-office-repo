Ext.define( 'module.custom.sjflv.sale.order.estimast2.model.EstiMast2Invoice', {
	extend : 'module.custom.sjflv.sale.order.estimast2.model.EstiMast2Master',
	associations: [{
		type : 'hasMany',
		model : 'module.custom.sjflv.sale.order.estimast2.model.EstiMast2Detail',
		associationKey : 'product',
		name : 'product'
	}]
});
