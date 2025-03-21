Ext.define( 'module.item.ecomast.model.EcoMastInvoice', {
	extend: 'module.item.ecomast.model.EcoMastMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.item.ecomast.model.EcoMastDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
