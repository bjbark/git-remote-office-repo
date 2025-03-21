Ext.define('module.stock.ddil.ddilmake.store.DdilMake2', { extend:'Axt.data.Store',
	model	: 'module.stock.ddil.ddilmake.model.DdilMake2',
	pageSize: 500,
	proxy	: {
		api	: {
			read	: _global.location.http() + "/stock/ddil/ddilmake/get/search2.do",
			update	: _global.location.http() + "/stock/ddil/ddilmake/set/record.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});