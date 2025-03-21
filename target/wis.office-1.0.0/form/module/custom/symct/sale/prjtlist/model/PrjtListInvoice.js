Ext.define( 'module.custom.symct.sale.prjtlist.model.PrjtListInvoice', {
		extend: 'module.custom.symct.sale.prjtlist.model.PrjtListMaster',
		associations: [{
			type: 'hasMany',
			model: 'module.custom.symct.sale.prjtlist.model.PrjtListPay',
			associationKey: 'product',
			name: 'product'
		}]
	});

