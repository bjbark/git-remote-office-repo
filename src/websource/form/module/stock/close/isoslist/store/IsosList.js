Ext.define('module.stock.close.isoslist.store.IsosList', { extend:'Axt.data.Store',
	model	: 'module.stock.close.isoslist.model.IsosList',
	autoLoad: false,
	remoteSort	: true,
	proxy	: {
		api	: {
			read : _global.location.http() + "/stock/close/isoslist/get/search.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});