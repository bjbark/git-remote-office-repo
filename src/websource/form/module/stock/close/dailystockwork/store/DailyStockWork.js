Ext.define('module.stock.close.dailystockwork.store.DailyStockWork', { extend:'Axt.data.Store',
	model	: 'module.stock.close.dailystockwork.model.DailyStockWork',
	pageSize: 19,
	proxy	: {
		api	: {
			read	: _global.location.http() + "/stock/close/dailystockwork/get/search.do",
			update	: _global.location.http() + "/stock/close/dailystockwork/set/record.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});