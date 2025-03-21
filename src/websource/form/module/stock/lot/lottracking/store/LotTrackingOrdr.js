Ext.define('module.stock.lot.lottracking.store.LotTrackingOrdr', { extend:'Axt.data.Store',
	model : 'module.stock.lot.lottracking.model.LotTrackingOrdr',
	pageSize : 20,
	proxy : {
		api : {
			 read	: _global.location.http() + "/stock/lot/lottracking/get/ordr.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});