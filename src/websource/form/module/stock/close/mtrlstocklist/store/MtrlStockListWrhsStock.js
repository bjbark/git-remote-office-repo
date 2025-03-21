Ext.define('module.stock.close.mtrlstocklist.store.MtrlStockListWrhsStock', { extend:'Axt.data.Store',
	model	: 'module.stock.close.mtrlstocklist.model.MtrlStockListWrhs',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/stock/close/mtrlstocklist/get/searchWrhsStock.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});