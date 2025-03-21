Ext.define('module.custom.aone.sale.order.sordersumlist2.store.SorderSumList2', { extend:'Axt.data.Store',
	model	: 'module.custom.aone.sale.order.sordersumlist2.model.SorderSumList2',
	pageSize: 200,
	proxy	: {
		api	: {
			read	: _global.location.http() + "/mtrl/po/purcisttwork/get/search.do",
			update	: _global.location.http() + "/mtrl/po/purcisttwork/set/record.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});