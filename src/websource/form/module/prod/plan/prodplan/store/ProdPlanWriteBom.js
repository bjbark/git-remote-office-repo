Ext.define('module.prod.plan.prodplan.store.ProdPlanWriteBom', { extend:'Axt.data.Store',
	model: 'module.prod.plan.prodplan.model.ProdPlanWriteBom',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/prod/plan/prodplan/get/writebom.do",
			update: _global.api_host_info + "/system/prod/plan/prodplan/set/write.do"
		},
		actionMethods: { read : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});