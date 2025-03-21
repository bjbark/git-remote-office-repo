Ext.define('module.stock.close.goodsstocklist.store.GoodsStockList', { extend:'Axt.data.Store',
	model	: 'module.stock.close.goodsstocklist.model.GoodsStockList',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/stock/close/goodsstocklist/get/search.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});