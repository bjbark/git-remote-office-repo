Ext.define( 'module.custom.hjsys.mtrl.po.purcordr.model.PurcOrdrInvoice2', {
	extend: 'module.custom.hjsys.mtrl.po.purcordr.model.PurcOrdrMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.custom.hjsys.mtrl.po.purcordr.model.PurcOrdrDetail2',
		associationKey: 'product',
		name: 'product'
	}]
});
