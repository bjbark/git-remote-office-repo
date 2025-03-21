Ext.define('module.custom.komec.prod.prodplan.store.ProdPlanMaster3', { extend:'Axt.data.Store',
	model: 'module.custom.komec.prod.prodplan.model.ProdPlanListerMaster3',
	pageSize: Const.SELECT.rows,
	remoteSort	: false,
	proxy:{
		api:{
			read 	 : _global.api_host_info + "/system/custom/komec/prod/prodplan/get/search3.do",
			update	 : _global.api_host_info + "/system/custom/komec/prod/prodplan/set/prorDelete.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
