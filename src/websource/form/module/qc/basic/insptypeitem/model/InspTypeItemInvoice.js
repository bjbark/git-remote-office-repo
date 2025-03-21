Ext.define( 'module.qc.basic.insptypeitem.model.InspTypeItemInvoice', {
	extend: 'module.qc.basic.insptypeitem.model.InspTypeItemMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.qc.basic.insptypeitem.model.InspTypeItemDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
