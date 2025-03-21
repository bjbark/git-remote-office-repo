Ext.define( 'module.custom.hantop.sale.saleorder.model.SaleOrderInvoice', {
	extend: 'module.custom.hantop.sale.saleorder.model.SaleOrderMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.custom.hantop.sale.saleorder.model.SaleOrderDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
