Ext.define('module.stock.lot.lottracking.store.LotTrackingAcpt', { extend:'Axt.data.Store',
	model : 'module.stock.lot.lottracking.model.LotTrackingAcpt',
	pageSize : 20,
	proxy : {
		api : {
			 read	: _global.location.http() + "/stock/lot/lottracking/get/acpt.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});