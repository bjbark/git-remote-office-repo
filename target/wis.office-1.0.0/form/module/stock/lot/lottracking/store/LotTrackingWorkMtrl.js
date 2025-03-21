Ext.define('module.stock.lot.lottracking.store.LotTrackingWorkMtrl', { extend:'Axt.data.Store',
	model : 'module.stock.lot.lottracking.model.LotTrackingWorkMtrl',
	pageSize : 20,
	proxy : {
		api : {
			 read	: _global.location.http() + "/stock/lot/lottracking/get/workmtrl.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});