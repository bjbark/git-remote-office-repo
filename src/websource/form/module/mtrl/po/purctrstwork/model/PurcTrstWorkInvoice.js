Ext.define( 'module.mtrl.po.purctrstwork.model.PurcTrstWorkInvoice', {
	extend: 'module.mtrl.po.purctrstwork.model.PurcTrstWorkMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.mtrl.po.purctrstwork.model.PurcTrstWorkDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
