Ext.define('module.custom.komec.mtrl.po.purcisttwork.store.PurcIsttWorkDetail', { extend:'Axt.data.Store',
	model	: 'module.custom.komec.mtrl.po.purcisttwork.model.PurcIsttWorkDetail',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/mtrl/po/purcisttwork/get/detail.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});