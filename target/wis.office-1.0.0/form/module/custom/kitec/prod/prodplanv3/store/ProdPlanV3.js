Ext.define('module.custom.kitec.prod.prodplanv3.store.ProdPlanV3', { extend:'Axt.data.Store',
	model	: 'module.custom.kitec.prod.prodplanv3.model.ProdPlanV3',
	pageSize: 100,
	proxy	: {
		api	: {
			read : _global.location.http() + "/custom/kitec/prod/prodplanv3/get/search.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});