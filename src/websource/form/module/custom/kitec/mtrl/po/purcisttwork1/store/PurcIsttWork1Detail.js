Ext.define('module.custom.kitec.mtrl.po.purcisttwork1.store.PurcIsttWork1Detail', { extend:'Axt.data.Store',
	model	: 'module.custom.kitec.mtrl.po.purcisttwork1.model.PurcIsttWork1Detail',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/custom/kitec/mtrl/po/purcisttwork1/get/detail.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});