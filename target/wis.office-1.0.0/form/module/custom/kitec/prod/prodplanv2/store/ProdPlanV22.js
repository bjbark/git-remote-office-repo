Ext.define('module.custom.kitec.prod.prodplanv2.store.ProdPlanV22', { extend:'Axt.data.Store',
	model: 'module.custom.kitec.prod.prodplanv2.model.ProdPlanV22',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/kitec/prod/prodplanv2/get/search2.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});