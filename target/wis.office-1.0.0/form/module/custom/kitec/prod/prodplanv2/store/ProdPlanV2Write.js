Ext.define('module.custom.kitec.prod.prodplanv2.store.ProdPlanV2Write', { extend:'Axt.data.Store',
	model: 'module.custom.kitec.prod.prodplanv2.model.ProdPlanV21',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/kitec/prod/prodplanv2/get/write.do",
			max  : _global.api_host_info + "/system/custom/kitec/prod/prodplanv2/get/max.do"
		},
		actionMethods: { read : 'POST' , update : 'POST' , max : 'POST'},
		extraParams:{
			token : _global.token_id
		}
	}
});