Ext.define( 'module.custom.hjsys.stock.goodsosttwork.model.GoodsOsttWorkInvoice', {
	extend: 'module.custom.hjsys.stock.goodsosttwork.model.GoodsOsttWorkWorkerDetail',
	associations: [{
		type: 'hasMany',
		model: 'module.custom.hjsys.stock.goodsosttwork.model.GoodsOsttWorkWorkerMaster',
		associationKey: 'product',
		name: 'product'
	}]
});