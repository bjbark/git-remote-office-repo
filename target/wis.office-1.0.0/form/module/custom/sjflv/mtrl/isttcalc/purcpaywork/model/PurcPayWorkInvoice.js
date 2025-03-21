Ext.define( 'module.custom.sjflv.mtrl.isttcalc.purcpaywork.model.PurcPayWorkInvoice', {
	extend: 'module.custom.sjflv.mtrl.isttcalc.purcpaywork.model.PurcPayWorkWorkerMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.custom.sjflv.mtrl.isttcalc.purcpaywork.model.PurcPayWorkWorkerLister',
		associationKey: 'product',
		name: 'product'
	}]
});