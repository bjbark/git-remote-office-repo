Ext.define('module.prod.plan.prodplan.store.ProdPlan1', { extend:'Axt.data.Store',
	model: 'module.prod.plan.prodplan.model.ProdPlan1',
	autoLoad: false,
	pageSize: 10000,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/prod/plan/prodplan/get/search1.do",
//			update: _global.api_host_info + "/system/prod/plan/prodplan/set/invoice.do"
		},
		actionMethods: { read : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});