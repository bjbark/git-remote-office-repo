Ext.define( 'module.custom.komec.stock.isos.prodosttwork.model.ProdOsttWorkInvoice', {
	extend: 'module.custom.komec.stock.isos.prodosttwork.model.ProdOsttWorkMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.custom.komec.stock.isos.prodosttwork.model.ProdOsttWorkDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
