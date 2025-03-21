Ext.define('module.stock.close.mtrlstocklist.store.MtrlStockList', { extend:'Axt.data.Store',
	model	: 'module.stock.close.mtrlstocklist.model.MtrlStockList',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/stock/close/mtrlstocklist/get/search.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});