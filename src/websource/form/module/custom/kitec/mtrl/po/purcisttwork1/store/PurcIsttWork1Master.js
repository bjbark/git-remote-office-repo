Ext.define('module.custom.kitec.mtrl.po.purcisttwork1.store.PurcIsttWork1Master', { extend:'Axt.data.Store',
	model	: 'module.custom.kitec.mtrl.po.purcisttwork1.model.PurcIsttWork1Master',
	pageSize: 100,
	proxy	: {
		api	: {
			read	: _global.location.http() + "/custom/kitec/mtrl/po/purcisttwork1/get/master.do",
			update	: _global.location.http() + "/custom/kitec/mtrl/po/purcisttwork1/set/delete.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});