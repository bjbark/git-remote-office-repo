Ext.define('module.stock.isos.goodsrettwork.store.GoodsRettWorkWorkerLister', { extend:'Axt.data.Store',
	model	: 'module.stock.isos.goodsrettwork.model.GoodsRettWorkWorkerLister',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/stock/goodsrettwork/get/ostt.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});