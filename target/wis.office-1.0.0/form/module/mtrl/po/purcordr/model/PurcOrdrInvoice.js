Ext.define( 'module.mtrl.po.purcordr.model.PurcOrdrInvoice', {
	extend: 'module.mtrl.po.purcordr.model.PurcOrdrMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.mtrl.po.purcordr.model.PurcOrdrDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
