Ext.define('module.prod.project.prjtprodplan2.store.PrjtProdPlan2Master', { extend:'Axt.data.Store',
	model : 'module.prod.project.prjtprodplan2.model.PrjtProdPlan2Master',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/cvic/prjtprodplan2/get/mastersearch.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});