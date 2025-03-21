Ext.define('module.custom.komec.prod.prodplan.store.ProdPlanMaster2', { extend:'Axt.data.Store',
	model: 'module.custom.komec.prod.prodplan.model.ProdPlanListerMaster2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: false,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/komec/prod/prodplan/get/search2.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
