Ext.define('module.custom.iypkg.prod.prodplan.store.ProdPlanDetail3', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.prod.prodplan.model.ProdPlan',
	pageSize:  100,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/prod/prodplan/get/detail3.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
