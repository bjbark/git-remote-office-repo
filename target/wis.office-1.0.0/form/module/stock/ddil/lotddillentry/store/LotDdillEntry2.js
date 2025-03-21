Ext.define('module.stock.ddil.lotddillentry.store.LotDdillEntry2', { extend:'Axt.data.Store',
	model	: 'module.stock.ddil.lotddillentry.model.LotDdillEntry2',
	pageSize: 200,
	proxy	: {
		api	: {
			read	: _global.location.http() + "/stock/ddil/lotddillentry/get/search2.do",
			update	: _global.location.http() + "/stock/ddil/lotddillentry/set/record.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});