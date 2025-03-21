Ext.define( 'module.prod.order.lotchange.model.LotChangeInvoice', {
	extend: 'module.prod.order.lotchange.model.LotChangeMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.prod.order.lotchange.model.LotChangeDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
