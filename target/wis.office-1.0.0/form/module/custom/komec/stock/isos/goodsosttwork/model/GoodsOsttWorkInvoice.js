Ext.define( 'module.custom.komec.stock.isos.goodsosttwork.model.GoodsOsttWorkInvoice', {
	extend: 'module.custom.komec.stock.isos.goodsosttwork.model.GoodsOsttWorkWorkerDetail',
	associations: [{
		type: 'hasMany',
		model: 'module.custom.komec.stock.isos.goodsosttwork.model.GoodsOsttWorkWorkerMaster',
		associationKey: 'product',
		name: 'product'
	}]
});