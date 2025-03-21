Ext.define( 'module.custom.komec.sale.order.saleorder.model.SaleOrderInvoice', {
	extend: 'module.custom.komec.sale.order.saleorder.model.SaleOrderMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.custom.komec.sale.order.saleorder.model.SaleOrderDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
