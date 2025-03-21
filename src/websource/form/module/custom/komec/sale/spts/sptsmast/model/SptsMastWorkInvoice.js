Ext.define( 'module.custom.komec.sale.spts.sptsmast.model.SptsMastWorkInvoice', {
	extend: 'module.custom.komec.sale.spts.sptsmast.model.SptsMastWorkerDetail',
	associations: [{
		type: 'hasMany',
		model: 'module.custom.komec.sale.spts.sptsmast.model.SptsMastWorkerMaster',
		associationKey: 'product',
		name: 'product'
	}]
});