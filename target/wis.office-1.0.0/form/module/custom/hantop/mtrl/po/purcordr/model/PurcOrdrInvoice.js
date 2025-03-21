Ext.define( 'module.custom.hantop.mtrl.po.purcordr.model.PurcOrdrInvoice', {
	extend: 'module.custom.hantop.mtrl.po.purcordr.model.PurcOrdrMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.custom.hantop.mtrl.po.purcordr.model.PurcOrdrDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
