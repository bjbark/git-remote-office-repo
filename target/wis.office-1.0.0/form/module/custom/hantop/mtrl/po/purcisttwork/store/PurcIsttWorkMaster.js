Ext.define('module.custom.hantop.mtrl.po.purcisttwork.store.PurcIsttWorkMaster', { extend:'Axt.data.Store',
	model	: 'module.custom.hantop.mtrl.po.purcisttwork.model.PurcIsttWorkMaster',
	pageSize: 100,
	proxy	: {
		api	: {
			read	: _global.location.http() + "/custom/hantop/mtrl/po/purcisttwork/get/master.do",
			update	: _global.location.http() + "/custom/hantop/mtrl/po/purcisttwork/set/delete.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});