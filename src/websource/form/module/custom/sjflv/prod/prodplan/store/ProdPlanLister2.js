Ext.define('module.custom.sjflv.prod.prodplan.store.ProdPlanLister2', { extend:'Axt.data.Store',

	model: 'module.custom.sjflv.prod.prodplan.model.ProdPlanLister2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/custom/sjflv/prod/prodplan/get/search2.do",
			update	: _global.api_host_info + "/system/custom/sjflv/prod/prodplan/set/prodplan.do",
		},
		actionMethods: {
			read	: 'POST' ,
			update	: 'POST'
		},
		extraParams:{
			token : _global.token_id
		}
	}
});
