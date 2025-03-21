Ext.define('module.prod.plan.prodplan.store.ProdPlan3', { extend:'Axt.data.Store',
	model: 'module.prod.plan.prodplan.model.ProdPlan3',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/prod/plan/prodplan/get/search3.do",
			update	: _global.api_host_info + "/system/prod/plan/prodplan/set/search3.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});