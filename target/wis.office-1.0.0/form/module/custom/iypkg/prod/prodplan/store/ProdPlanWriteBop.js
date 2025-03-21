Ext.define('module.custom.iypkg.prod.prodplan.store.ProdPlanWriteBop', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.prod.prodplan.model.ProdPlanWriteBop',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/prod/prodplan/get/writebop.do",
			update: _global.api_host_info + "/system/custom/iypkg/prod/prodplan/set/write.do"
		},
		actionMethods: { read : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});