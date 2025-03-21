Ext.define( 'module.custom.sjflv.mtrl.imp.estimast.model.EstiMastInvoice', {
	extend : 'module.custom.sjflv.mtrl.imp.estimast.model.EstiMastMaster',
	associations: [{
		type : 'hasMany',
		model : 'module.custom.sjflv.mtrl.imp.estimast.model.EstiMastDetail',
		associationKey : 'product',
		name : 'product'
	}]
});
