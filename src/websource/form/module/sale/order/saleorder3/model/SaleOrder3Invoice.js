Ext.define( 'module.sale.order.saleorder3.model.SaleOrder3Invoice', {
	extend: 'module.sale.order.saleorder3.model.SaleOrder3Master',
	associations: [{
		type: 'hasMany',
		model: 'module.sale.order.saleorder3.model.SaleOrder3Detail',
		associationKey: 'product',
		name: 'product'
	}]
});
