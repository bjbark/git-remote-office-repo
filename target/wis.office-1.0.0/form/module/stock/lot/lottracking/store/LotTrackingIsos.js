Ext.define('module.stock.lot.lottracking.store.LotTrackingIsos', { extend:'Axt.data.Store',
	model : 'module.stock.lot.lottracking.model.LotTrackingIsos',
	pageSize : 100,
	proxy : {
		api : {
			 read	: _global.location.http() + "/stock/lot/lottracking/get/isos.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});