Ext.define( 'module.stock.isos.etcisttwork.model.EtcIsttWorkInvoice', {
	extend		: 'module.stock.isos.etcisttwork.model.EtcIsttWorkMaster',
	associations: [{
		type	: 'hasMany',
		model	: 'module.stock.isos.etcisttwork.model.EtcIsttWorkDetail',
		associationKey: 'product',
		name	: 'product'
	}]
});
