Ext.define('module.stock.lot.lottracking.store.LotTrackingProd', { extend:'Axt.data.Store',
	model : 'module.stock.lot.lottracking.model.LotTrackingProd',
	pageSize : 20,
	proxy : {
		api : {
			 read	: _global.location.http() + "/stock/lot/lottracking/get/prod.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});