Ext.define( 'module.stock.isos.goodsrettwork.model.GoodsRettWorkInvoice', {
	extend		: 'module.stock.isos.goodsrettwork.model.GoodsRettWorkWorkerMaster',
	associations: [{
		type	: 'hasMany',
		model	: 'module.stock.isos.goodsrettwork.model.GoodsRettWorkWorkerLister',
		associationKey: 'product',
		name	: 'product'
	}]
});
