Ext.define('module.prod.plan.prodplanv2.store.ProdPlanV22', { extend:'Axt.data.Store',
	model: 'module.prod.plan.prodplanv2.model.ProdPlanV22',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/prod/plan/prodplanv2/get/search2.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});