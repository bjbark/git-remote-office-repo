Ext.define( 'module.custom.sjflv.sale.export.offermast.model.OfferMastInvoice', {
	extend: 'module.custom.sjflv.sale.export.offermast.model.OfferMastMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.custom.sjflv.sale.export.offermast.model.OfferMastDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
