Ext.define( 'module.custom.sjflv.sale.order.saleorder.model.SaleOrderInvoice', {
	extend: 'module.custom.sjflv.sale.order.saleorder.model.SaleOrderMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.custom.sjflv.sale.order.saleorder.model.SaleOrderDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
