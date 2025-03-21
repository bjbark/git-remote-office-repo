Ext.define('module.custom.inkopack.prod.prodplan.store.ProdPlan1', { extend:'Axt.data.Store',
	model: 'module.custom.inkopack.prod.prodplan.model.ProdPlan1',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/inkopack/prod/prodplan/get/search1.do",
		},
		actionMethods: { read : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
