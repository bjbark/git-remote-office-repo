Ext.define('module.stock.close.stockclose.store.StockClose', { extend:'Axt.data.Store',
	model	: 'module.stock.close.stockclose.model.StockClose',
	proxy	: {
			api	: {
				read : _global.location.http() + "/stock/close/stockclose/get/search.do"
			},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});