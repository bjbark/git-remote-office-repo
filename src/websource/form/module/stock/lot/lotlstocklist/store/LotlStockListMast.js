Ext.define('module.stock.lot.lotlstocklist.store.LotlStockListMast', { extend:'Axt.data.Store',
	model : 'module.stock.lot.lotlstocklist.model.LotlStockListMast',
	pageSize : 99999,
	proxy : {
		api : {
			read	: _global.location.http() + "/stock/lot/lotlstocklist/get/mastersearch.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});