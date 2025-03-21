Ext.define('module.stock.close.isoslist.store.IsosList2', { extend:'Axt.data.Store',
	model	: 'module.stock.close.isoslist.model.IsosList',
	autoLoad: false,
	remoteSort	: true,
	proxy	: {
		api	: {
			read : _global.location.http() + "/stock/close/isoslist/get/search2.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});