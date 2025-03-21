Ext.define('module.stock.close.mtrlstocklist.store.MtrlStockListWrhs', { extend:'Axt.data.Store',
	model	: 'module.stock.close.mtrlstocklist.model.MtrlStockListWrhs',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/stock/close/mtrlstocklist/get/searchWrhs.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});