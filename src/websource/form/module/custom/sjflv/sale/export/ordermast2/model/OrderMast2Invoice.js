Ext.define( 'module.custom.sjflv.sale.export.ordermast2.model.OrderMast2Invoice', {
	extend: 'module.custom.sjflv.sale.export.ordermast2.model.OrderMast2InvoiceMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.custom.sjflv.sale.export.ordermast2.model.OrderMast2InvoiceDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
