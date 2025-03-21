Ext.define('module.stock.lot.lotlstocklist.store.LotlStockListDetail', { extend:'Axt.data.Store',
	model : 'module.stock.lot.lotlstocklist.model.LotlStockListDetail',
	pageSize : 99999,
	proxy : {
		api : {
			read	: _global.location.http() + "/stock/lot/lotlstocklist/get/detailsearch.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});