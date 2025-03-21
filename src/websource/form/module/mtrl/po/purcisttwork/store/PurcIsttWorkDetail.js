Ext.define('module.mtrl.po.purcisttwork.store.PurcIsttWorkDetail', { extend:'Axt.data.Store',
	model	: 'module.mtrl.po.purcisttwork.model.PurcIsttWorkDetail',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/mtrl/po/purcisttwork/get/detail.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});