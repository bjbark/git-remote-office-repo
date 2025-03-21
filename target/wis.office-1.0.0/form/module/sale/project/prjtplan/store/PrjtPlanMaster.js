Ext.define('module.sale.project.prjtplan.store.PrjtPlanMaster', { extend:'Axt.data.Store',
	model : 'module.sale.project.prjtplan.model.PrjtPlanMaster',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/cvic/prjtplan/get/mastersearch.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});