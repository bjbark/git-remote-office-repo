Ext.define( 'module.prod.wmold.wmoldlist.model.WmoldListInvoice', {
	extend: 'module.prod.wmold.wmoldlist.model.WmoldList',
	associations: [{
		type: 'hasMany',
		model: 'module.prod.wmold.wmoldlist.model.WMoldListMove',
		associationKey: 'product',
		name: 'product'
	}]
});
