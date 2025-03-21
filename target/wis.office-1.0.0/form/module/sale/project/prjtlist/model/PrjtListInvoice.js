Ext.define( 'module.sale.project.prjtlist.model.PrjtListInvoice', {
		extend: 'module.sale.project.prjtlist.model.PrjtListMaster',
		associations: [{
			type: 'hasMany',
			model: 'module.sale.project.prjtlist.model.PrjtListPay',
			associationKey: 'product',
			name: 'product'
		}]
	});

