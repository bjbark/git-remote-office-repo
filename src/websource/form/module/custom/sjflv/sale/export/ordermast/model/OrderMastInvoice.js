Ext.define( 'module.custom.sjflv.sale.export.ordermast.model.OrderMastInvoice', {
	extend: 'module.custom.sjflv.sale.export.ordermast.model.OrderMastMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.custom.sjflv.sale.export.ordermast.model.OrderMastDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
