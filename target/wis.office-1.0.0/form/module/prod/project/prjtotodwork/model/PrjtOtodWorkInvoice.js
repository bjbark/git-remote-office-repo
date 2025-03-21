Ext.define( 'module.prod.project.prjtotodwork.model.PrjtOtodWorkInvoice', {
	extend: 'module.prod.project.prjtotodwork.model.PrjtOtodWorkMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.prod.project.prjtotodwork.model.PrjtOtodWorkDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
