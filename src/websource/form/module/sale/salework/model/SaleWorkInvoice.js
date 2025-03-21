Ext.define('module.sale.salework.model.SaleWorkInvoice',{ extend: 'module.sale.salework.model.SaleWorkMaster',

	associations: [{
	    type           : 'hasMany',
	    model          : 'module.sale.salework.model.SaleWorkDetail',
	    associationKey : 'product',
	    name           : 'product'
	}]
});
