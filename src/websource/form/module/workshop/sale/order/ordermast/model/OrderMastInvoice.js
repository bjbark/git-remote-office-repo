Ext.define( 'module.workshop.sale.order.ordermast.model.OrderMastInvoice', {
	extend: 'module.workshop.sale.order.ordermast.model.OrderMastMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.workshop.sale.order.ordermast.model.OrderMastDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
