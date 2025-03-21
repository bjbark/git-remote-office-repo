Ext.define('module.prod.plan.prodplanv2.store.ProdPlanV21', { extend:'Axt.data.Store',
	model: 'module.prod.plan.prodplanv2.model.ProdPlanV21',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/prod/plan/prodplanv2/get/search1.do",
//			update: _global.api_host_info + "/system/prod/plan/prodplanv2/set/invoice.do"
		},
		actionMethods: { read : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});