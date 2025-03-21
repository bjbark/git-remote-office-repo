Ext.define('module.stock.lot.lottracking.store.LotTrackingIstt', { extend:'Axt.data.Store',
	model : 'module.stock.lot.lottracking.model.LotTrackingIstt',
	pageSize : 20,
	proxy : {
		api : {
			 read	: _global.location.http() + "/stock/lot/lottracking/get/istt.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});