Ext.define( 'module.sale.order.saleorder.model.SaleOrderInvoice', {
	extend: 'module.sale.order.saleorder.model.SaleOrderMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.sale.order.saleorder.model.SaleOrderDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
