Ext.define( 'module.custom.kortc.prod.rsvdorder.model.RsvdOrderInvoice', {
	extend: 'module.custom.kortc.prod.rsvdorder.model.RsvdOrderMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.custom.kortc.prod.rsvdorder.model.RsvdOrderDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
