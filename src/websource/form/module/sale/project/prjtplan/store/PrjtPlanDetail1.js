Ext.define('module.sale.project.prjtplan.store.PrjtPlanDetail1', { extend:'Axt.data.Store',
	model : 'module.sale.project.prjtplan.model.PrjtPlanDetail1',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/cvic/prjtplan/get/detailsearch.do",
			update : _global.location.http() + "/prod/cvic/prjtplan/set/detail.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});