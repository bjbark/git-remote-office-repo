Ext.define('module.custom.iypkg.stock.ddil.ddilmake.store.DdilMake1', { extend:'Axt.data.Store',
	model	: 'module.custom.iypkg.stock.ddil.ddilmake.model.DdilMake1',
	pageSize: 500,
	proxy	: {
		api	: {
			read : _global.location.http() + "/custom/iypkg/stock/ddil/ddilmake/get/search1.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});