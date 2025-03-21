Ext.define( 'module.prod.mold.moldlist.model.MoldListInvoice', {
	extend: 'module.prod.mold.moldlist.model.MoldList',
	associations: [{
		type: 'hasMany',
		model: 'module.prod.mold.moldlist.model.MoldListMove',
		associationKey: 'product',
		name: 'product'
	}]
});
