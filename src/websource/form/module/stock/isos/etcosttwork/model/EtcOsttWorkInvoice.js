Ext.define( 'module.stock.isos.etcosttwork.model.EtcOsttWorkInvoice', {
	extend: 'module.stock.isos.etcosttwork.model.EtcOsttWorkMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.stock.isos.etcosttwork.model.EtcOsttWorkDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
