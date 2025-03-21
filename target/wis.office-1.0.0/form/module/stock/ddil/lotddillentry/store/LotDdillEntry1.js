Ext.define('module.stock.ddil.lotddillentry.store.LotDdillEntry1', { extend:'Axt.data.Store',
	model	: 'module.stock.ddil.lotddillentry.model.LotDdillEntry1',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/stock/ddil/lotddillentry/get/search1.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});