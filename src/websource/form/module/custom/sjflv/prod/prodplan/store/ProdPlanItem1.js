Ext.define('module.custom.sjflv.prod.prodplan.store.ProdPlanItem1', { extend:'Axt.data.Store',
	model : 'module.custom.sjflv.prod.prodplan.model.ProdPlanItem1',
	pageSize : 100,
	proxy : {
		api : {
			read   : _global.api_host_info + "/system/custom/sjflv/prod/prodplan/get/item1.do",
			update : _global.api_host_info + "/system/custom/sjflv/prod/prodplan/set/item1.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});