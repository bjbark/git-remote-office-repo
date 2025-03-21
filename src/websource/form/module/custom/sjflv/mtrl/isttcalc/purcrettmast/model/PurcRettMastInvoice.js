Ext.define( 'module.custom.sjflv.mtrl.isttcalc.purcrettmast.model.PurcRettMastInvoice', {
	extend		: 'module.custom.sjflv.mtrl.isttcalc.purcrettmast.model.PurcRettMastWorkerMaster',
	associations: [{
		type	: 'hasMany',
		model	: 'module.custom.sjflv.mtrl.isttcalc.purcrettmast.model.PurcRettMastWorkerLister',
		associationKey: 'product',
		name	: 'product'
	}]
});
