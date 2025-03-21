Ext.define('module.custom.iypkg.mtrl.po.purcordr2.store.PurcOrdr2', { extend:'Axt.data.Store',
	model	: 'module.custom.iypkg.mtrl.po.purcordr2.model.PurcOrdr2',
	pageSize: 200,
	proxy	: {
		api	: {
			read	: _global.location.http() + "/custom/iypkg/mtrl/po/purcordr2/get/search.do",
			update : _global.location.http() + "/custom/iypkg/mtrl/po/purcordr2/set/record.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});