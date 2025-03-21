Ext.define('module.custom.komec.mtrl.po.purcisttwork.store.PurcIsttWorkExprMaster', { extend:'Axt.data.Store',
	model	: 'module.custom.komec.mtrl.po.purcisttwork.model.PurcIsttWorkMaster',
	pageSize: 100,
	proxy	: {
		api	: {
			read	: _global.location.http() + "/mtrl/po/purcisttwork/get/exprmaster.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});