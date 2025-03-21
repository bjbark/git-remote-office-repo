Ext.define('module.custom.kitec.prod.prodplan.store.ProdPlan', { extend:'Axt.data.Store',
	model	: 'module.custom.kitec.prod.prodplan.model.ProdPlan',
	pageSize: 200,
	proxy	: {
		api	: {
			read	: _global.api_host_info + "/system/custom/kitec/prod/prodplan/get/search.do",
//			update	: _global.api_host_info + "/mtrl/po/purcisttwork/set/record.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});