Ext.define( 'module.custom.sjflv.stock.isos.goodsosttwork.model.GoodsOsttWorkInvoice', {
	extend: 'module.custom.sjflv.stock.isos.goodsosttwork.model.GoodsOsttWorkWorkerDetail',
	associations: [{
		type: 'hasMany',
		model: 'module.custom.sjflv.stock.isos.goodsosttwork.model.GoodsOsttWorkWorkerMaster',
		associationKey: 'product',
		name: 'product'
	}]
});