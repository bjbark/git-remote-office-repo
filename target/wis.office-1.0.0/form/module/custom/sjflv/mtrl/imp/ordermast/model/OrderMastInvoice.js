Ext.define( 'module.custom.sjflv.mtrl.imp.ordermast.model.OrderMastInvoice', {
	extend: 'module.custom.sjflv.mtrl.imp.ordermast.model.OrderMastMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.custom.sjflv.mtrl.imp.ordermast.model.OrderMastDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
