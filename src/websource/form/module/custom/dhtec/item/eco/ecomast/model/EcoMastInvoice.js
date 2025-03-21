Ext.define( 'module.custom.dhtec.item.eco.ecomast.model.EcoMastInvoice', {
	extend: 'module.custom.dhtec.item.eco.ecomast.model.EcoMastMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.custom.dhtec.item.eco.ecomast.model.EcoMastDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
