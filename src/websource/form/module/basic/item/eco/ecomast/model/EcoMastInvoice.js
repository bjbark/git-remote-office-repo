Ext.define( 'module.basic.item.eco.ecomast.model.EcoMastInvoice', {
	extend: 'module.basic.item.eco.ecomast.model.EcoMastMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.basic.item.eco.ecomast.model.EcoMastDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
