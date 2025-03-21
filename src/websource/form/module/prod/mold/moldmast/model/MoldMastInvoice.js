Ext.define( 'module.prod.mold.moldmast.model.MoldMastInvoice', {
	extend: 'module.prod.mold.moldmast.model.MoldMast',
	associations: [{
		type: 'hasMany',
		model: 'module.prod.mold.moldmast.model.MoldMastMove',
		associationKey: 'product',
		name: 'product'
	}]
});
