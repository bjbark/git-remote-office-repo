Ext.define('module.custom.kitec.prod.prodplan.store.ProdPlan2', { extend:'Axt.data.Store',
	model	: 'module.custom.kitec.prod.prodplan.model.ProdPlan2',
	pageSize: 200,
	proxy	: {
		api	: {
			read	: _global.api_host_info + "/system/custom/kitec/prod/prodplan/get/search2.do",
//			update	: _global.api_host_info + "/mtrl/po/purcisttwork/set/record.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});