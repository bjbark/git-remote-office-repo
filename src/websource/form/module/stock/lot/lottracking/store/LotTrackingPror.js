Ext.define('module.stock.lot.lottracking.store.LotTrackingPror', { extend:'Axt.data.Store',
	model : 'module.stock.lot.lottracking.model.LotTrackingPror',
	pageSize : 20,
	proxy : {
		api : {
			 read	: _global.location.http() + "/stock/lot/lottracking/get/pror.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});