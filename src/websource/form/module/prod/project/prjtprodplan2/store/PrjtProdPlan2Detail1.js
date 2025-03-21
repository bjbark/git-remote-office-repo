Ext.define('module.prod.project.prjtprodplan2.store.PrjtProdPlan2Detail1', { extend:'Axt.data.TreeStore',
	model : 'module.prod.project.prjtprodplan2.model.PrjtProdPlan2Detail1',
	autoLoad: false,
	root	: { expanded: false },
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/project/prjtprodplan2/get/search1.do",
			update	: _global.location.http() + "/prod/project/prjtprodplan2/set/search1.do",
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});