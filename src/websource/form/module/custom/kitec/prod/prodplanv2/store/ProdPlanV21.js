Ext.define('module.custom.kitec.prod.prodplanv2.store.ProdPlanV21', { extend:'Axt.data.Store',
	model: 'module.custom.kitec.prod.prodplanv2.model.ProdPlanV21',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/kitec/prod/prodplanv2/get/search1.do",
//			update: _global.api_host_info + "/custom/kitec/prod/prodplanv2/set/invoice.do"
		},
		actionMethods: { read : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});