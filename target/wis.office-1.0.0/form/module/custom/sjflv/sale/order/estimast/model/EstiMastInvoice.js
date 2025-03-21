Ext.define( 'module.custom.sjflv.sale.order.estimast.model.EstiMastInvoice', {
	extend : 'module.custom.sjflv.sale.order.estimast.model.EstiMastMaster',
	associations: [{
		type : 'hasMany',
		model : 'module.custom.sjflv.sale.order.estimast.model.EstiMastDetail',
		associationKey : 'product',
		name : 'product'
	}]
});
