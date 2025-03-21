Ext.define( 'module.custom.kortc.sale.order.sordermast.model.SorderMastInvoice', {
	extend : 'module.custom.kortc.sale.order.sordermast.model.SorderMastMaster',
	associations: [{
		type : 'hasMany',
		model : 'module.custom.kortc.sale.order.sordermast.model.SorderMastDetail',
		associationKey : 'product',
		name : 'product'
	}]
});
