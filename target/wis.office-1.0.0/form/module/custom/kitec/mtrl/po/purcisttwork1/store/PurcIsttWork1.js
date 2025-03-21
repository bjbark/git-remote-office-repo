Ext.define('module.custom.kitec.mtrl.po.purcisttwork1.store.PurcIsttWork1', { extend:'Axt.data.Store',
	model	: 'module.custom.kitec.mtrl.po.purcisttwork1.model.PurcIsttWork1',
	pageSize: 200,
	proxy	: {
		api	: {
			read	: _global.location.http() + "/custom/kitec/mtrl/po/purcisttwork1/get/search.do",
			update	: _global.location.http() + "/custom/kitec/mtrl/po/purcisttwork1/set/record.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});