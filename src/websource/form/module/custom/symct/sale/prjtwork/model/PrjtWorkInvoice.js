Ext.define( 'module.custom.symct.sale.prjtwork.model.PrjtWorkInvoice', {
		extend: 'module.custom.symct.sale.prjtwork.model.PrjtWorkMaster',
		associations: [{
			type: 'hasMany',
			model: 'module.custom.symct.sale.prjtwork.model.PrjtWorkPay',
			associationKey: 'product',
			name: 'product'
		}]
	});

