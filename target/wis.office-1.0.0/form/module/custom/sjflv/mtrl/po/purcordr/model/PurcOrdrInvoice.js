Ext.define( 'module.custom.sjflv.mtrl.po.purcordr.model.PurcOrdrInvoice', {
	extend: 'module.custom.sjflv.mtrl.po.purcordr.model.PurcOrdrMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.custom.sjflv.mtrl.po.purcordr.model.PurcOrdrDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
