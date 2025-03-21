Ext.define('module.prod.project.prjtprodplan2.store.PrjtProdPlan2Detail3', { extend:'Axt.data.Store',
	model : 'module.prod.project.prjtprodplan2.model.PrjtProdPlan2Detail3',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/project/prjtprodplan2/get/search3.do",
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});