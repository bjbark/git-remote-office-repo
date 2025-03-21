Ext.define('module.custom.aone.sale.order.sordersumlist2.store.SorderSumList2Master', { extend:'Axt.data.Store',
	model	: 'module.custom.aone.sale.order.sordersumlist2.model.SorderSumList2Master',
	pageSize: 100,
	proxy	: {
		api	: {
			read	: _global.location.http() + "/mtrl/po/purcisttwork/get/master.do",
			update	: _global.location.http() + "/mtrl/po/purcisttwork/set/delete.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});