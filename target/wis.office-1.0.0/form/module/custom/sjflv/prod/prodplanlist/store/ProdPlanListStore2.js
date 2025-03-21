Ext.define('module.custom.sjflv.prod.prodplanlist.store.ProdPlanListStore2', { extend:'Axt.data.Store',

	model	: 'module.custom.sjflv.prod.prodplanlist.model.ProdPlanListModel2',
	pageSize: 200,
	groupField: 'item_code',
	proxy	: {
		api	: {
			read: _global.api_host_info + "/system/custom/sjflv/prod/prodplanlist/get/search2.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});