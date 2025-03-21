Ext.define( 'module.sale.order.saleorder2.model.SaleOrder2Invoice', {
	extend: 'module.sale.order.saleorder2.model.SaleOrder2Master',
	associations: [{
		type: 'hasMany',
		model: 'module.sale.order.saleorder2.model.SaleOrder2Detail',
		associationKey: 'product',
		name: 'product'
	}]
});
