Ext.define('module.custom.komec.prod.prodplan.store.ProdPlanMaster', { extend:'Axt.data.Store',
	model: 'module.custom.komec.prod.prodplan.model.ProdPlanListerMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/komec/prod/prodplan/get/search.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
