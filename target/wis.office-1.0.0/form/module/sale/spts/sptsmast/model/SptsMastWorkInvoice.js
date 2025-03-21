Ext.define( 'module.sale.spts.sptsmast.model.SptsMastWorkInvoice', {
	extend: 'module.sale.spts.sptsmast.model.SptsMastWorkerDetail',
	associations: [{
		type: 'hasMany',
		model: 'module.sale.spts.sptsmast.model.SptsMastWorkerMaster',
		associationKey: 'product',
		name: 'product'
	}]
});