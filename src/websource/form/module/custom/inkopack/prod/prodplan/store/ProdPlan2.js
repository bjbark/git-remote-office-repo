Ext.define('module.custom.inkopack.prod.prodplan.store.ProdPlan2', { extend:'Axt.data.Store',
	model: 'module.custom.inkopack.prod.prodplan.model.ProdPlan2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/inkopack/prod/prodplan/get/search2.do",
			update	: _global.api_host_info + "/system/custom/inkopack/prod/prodplan/set/plan.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});