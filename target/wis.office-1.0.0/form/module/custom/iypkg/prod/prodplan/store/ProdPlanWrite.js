Ext.define('module.custom.iypkg.prod.prodplan.store.ProdPlanWrite', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.prod.prodplan.model.ProdPlanWrite',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/prod/prodplan/get/write.do",
			update: _global.api_host_info + "/system/custom/iypkg/prod/prodplan/set/write.do"
		},
		actionMethods: { read : 'POST' , update : 'POST' , max : 'POST'},
		extraParams:{
			token : _global.token_id
		}
	}
});