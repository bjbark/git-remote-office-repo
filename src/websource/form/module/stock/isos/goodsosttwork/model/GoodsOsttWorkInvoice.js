Ext.define( 'module.stock.isos.goodsosttwork.model.GoodsOsttWorkInvoice', {
	extend: 'module.stock.isos.goodsosttwork.model.GoodsOsttWorkWorkerDetail',
	associations: [{
		type: 'hasMany',
		model: 'module.stock.isos.goodsosttwork.model.GoodsOsttWorkWorkerMaster',
		associationKey: 'product',
		name: 'product'
	}]
});