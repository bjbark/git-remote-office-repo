Ext.define( 'module.custom.inkopack.sale.order.saleorder.model.SaleOrderInvoice', {
	extend: 'module.custom.inkopack.sale.order.saleorder.model.SaleOrderMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.custom.inkopack.sale.order.saleorder.model.SaleOrderDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
