Ext.define('module.prod.project.prjtprodplan1.store.PrjtProdPlan1Master', { extend:'Axt.data.Store',
	model : 'module.prod.project.prjtprodplan1.model.PrjtProdPlan1Master',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/cvic/prjtprodplan1/get/mastersearch.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});