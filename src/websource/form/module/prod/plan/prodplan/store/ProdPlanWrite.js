Ext.define('module.prod.plan.prodplan.store.ProdPlanWrite', { extend:'Axt.data.Store',
	model: 'module.prod.plan.prodplan.model.ProdPlan1',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/prod/plan/prodplan/get/write.do"
		},
		actionMethods: { read : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});