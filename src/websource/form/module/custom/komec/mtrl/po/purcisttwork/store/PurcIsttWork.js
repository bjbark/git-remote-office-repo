Ext.define('module.custom.komec.mtrl.po.purcisttwork.store.PurcIsttWork', { extend:'Axt.data.Store',
	model	: 'module.custom.komec.mtrl.po.purcisttwork.model.PurcIsttWork',
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