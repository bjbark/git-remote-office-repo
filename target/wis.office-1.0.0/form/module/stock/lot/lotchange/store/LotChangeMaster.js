Ext.define('module.stock.lot.lotchange.store.LotChangeMaster', { extend:'Axt.data.Store',
	model : 'module.stock.lot.lotchange.model.LotChangeMaster',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/stock/lot/lotchange/get/mastersearch.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});