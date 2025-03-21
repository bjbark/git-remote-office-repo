Ext.define('module.custom.sjflv.prod.prodplanmtrl.store.ProdPlanMtrlStore1', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.prod.prodplanmtrl.model.ProdPlanMtrlModel1',
	pageSize: 200,
	proxy	: {
		api	: {
			read: _global.api_host_info + "/system/custom/sjflv/prod/prodplanmtrl/get/search1.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});