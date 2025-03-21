Ext.define( 'module.workshop.mtrl.purchase.pordermast.model.PorderMastInvoice', {
	extend: 'module.workshop.mtrl.purchase.pordermast.model.PorderMastMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.sale.order.saleorder.model.SaleOrderDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
