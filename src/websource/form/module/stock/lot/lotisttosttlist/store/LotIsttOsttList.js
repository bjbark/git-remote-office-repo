Ext.define('module.stock.lot.lotisttosttlist.store.LotIsttOsttList', { extend:'Axt.data.Store',
	model : 'module.stock.lot.lotisttosttlist.model.LotIsttOsttList',
	pageSize : 9999999,
	proxy : {
		api : {
			read	: _global.location.http() + "/stock/lot/lotisttosttlist/get/search.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});