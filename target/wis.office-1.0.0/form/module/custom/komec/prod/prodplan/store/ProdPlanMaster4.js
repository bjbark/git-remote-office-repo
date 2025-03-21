Ext.define('module.custom.komec.prod.prodplan.store.ProdPlanMaster4', { extend:'Axt.data.Store',
	model: 'module.custom.komec.prod.prodplan.model.ProdPlanListerMaster4',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: false,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/komec/prod/prodplan/get/search4.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
