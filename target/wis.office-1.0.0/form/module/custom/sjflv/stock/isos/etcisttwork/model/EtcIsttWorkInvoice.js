Ext.define( 'module.custom.sjflv.stock.isos.etcisttwork.model.EtcIsttWorkInvoice', {
	extend		: 'module.custom.sjflv.stock.isos.etcisttwork.model.EtcIsttWorkMaster',
	associations: [{
		type	: 'hasMany',
		model	: 'module.custom.sjflv.stock.isos.etcisttwork.model.EtcIsttWorkDetail',
		associationKey: 'product',
		name	: 'product'
	}]
});
