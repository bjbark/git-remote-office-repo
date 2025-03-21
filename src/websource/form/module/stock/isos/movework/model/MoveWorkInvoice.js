Ext.define( 'module.stock.isos.movework.model.MoveWorkInvoice', {
	extend: 'module.stock.isos.movework.model.MoveWorkMaster',
	associations: [{
		type: 'hasMany',
		model: 'module.stock.isos.movework.model.MoveWorkDetail',
		associationKey: 'product',
		name: 'product'
	}]
});
