Ext.define( 'module.prod.plan.rsvdorder.model.RsvdOrderInvoice', {
	extend: 'module.prod.plan.rsvdorder.model.RsvdOrderMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.prod.plan.rsvdorder.model.RsvdOrderDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
