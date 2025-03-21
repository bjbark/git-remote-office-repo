Ext.define('module.sale.project.prjtchange.model.PrjtChangeInvoice', {
		extend: 'module.sale.project.prjtchange.model.PrjtChangeDetail5',
		associations: [{
			type: 'hasMany',
			model: 'module.sale.project.prjtchange.model.PrjtChangePay',
			associationKey: 'product',
			name: 'product'
		}]
	});

