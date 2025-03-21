Ext.define( 'module.sale.project.prjtwork.model.PrjtWorkInvoice', {
		extend: 'module.sale.project.prjtwork.model.PrjtWorkMaster',
		associations: [{
			type: 'hasMany',
			model: 'module.sale.project.prjtwork.model.PrjtWorkPay',
			associationKey: 'product',
			name: 'product'
		}]
	});

