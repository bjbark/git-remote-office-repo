Ext.define( 'module.custom.hjsys.sale.order.saleorder.model.SaleOrderInvoice', {
	extend: 'module.custom.hjsys.sale.order.saleorder.model.SaleOrderMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.custom.hjsys.sale.order.saleorder.model.SaleOrderDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
