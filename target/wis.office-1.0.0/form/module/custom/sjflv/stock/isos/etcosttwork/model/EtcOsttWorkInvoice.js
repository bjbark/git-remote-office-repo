Ext.define( 'module.custom.sjflv.stock.isos.etcosttwork.model.EtcOsttWorkInvoice', {
	extend: 'module.custom.sjflv.stock.isos.etcosttwork.model.EtcOsttWorkMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.custom.sjflv.stock.isos.etcosttwork.model.EtcOsttWorkDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
