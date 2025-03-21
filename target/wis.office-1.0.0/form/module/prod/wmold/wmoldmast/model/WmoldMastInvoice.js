Ext.define( 'module.prod.wmold.wmoldmast.model.WmoldMastInvoice', {
	extend: 'module.prod.wmold.wmoldmast.model.WmoldMast',
	associations: [{
		type: 'hasMany',
		model: 'module.prod.wmold.wmoldmast.model.WmoldMastMove',
		associationKey: 'product',
		name: 'product'
	}]
});
