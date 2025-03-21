Ext.define('module.stock.lot.lotchange.store.LotChangeDetail', { extend:'Axt.data.Store',
	model : 'module.stock.lot.lotchange.model.LotChangeDetail',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/stock/lot/lotchange/get/detailsearch.do",
			update	: _global.location.http() + "/stock/lot/lotchange/set/detail.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});