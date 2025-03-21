Ext.define( 'module.stock.isos.prodosttwork.model.ProdOsttWorkInvoice', {
	extend: 'module.stock.isos.prodosttwork.model.ProdOsttWorkMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.stock.isos.prodosttwork.model.ProdOsttWorkDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
