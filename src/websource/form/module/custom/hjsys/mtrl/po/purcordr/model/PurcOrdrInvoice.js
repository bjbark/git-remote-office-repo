Ext.define( 'module.custom.hjsys.mtrl.po.purcordr.model.PurcOrdrInvoice', {
	extend: 'module.custom.hjsys.mtrl.po.purcordr.model.PurcOrdrMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.custom.hjsys.mtrl.po.purcordr.model.PurcOrdrDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
