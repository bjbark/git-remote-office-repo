Ext.define('module.prod.plan.prodplan.store.ProdPlan2', { extend:'Axt.data.Store',
	model: 'module.prod.plan.prodplan.model.ProdPlan2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/prod/plan/prodplan/get/search2.do",
			update	: _global.api_host_info + "/system/prod/plan/prodplan/set/plan.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});