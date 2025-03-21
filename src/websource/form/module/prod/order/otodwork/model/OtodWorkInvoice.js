Ext.define( 'module.prod.order.otodwork.model.OtodWorkInvoice', {
	extend: 'module.prod.order.otodwork.model.OtodWorkMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.prod.order.otodwork.model.OtodWorkDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
