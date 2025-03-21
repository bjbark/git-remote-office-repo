Ext.define('module.custom.sjflv.prod.prodplanlist.store.ProdPlanListPopupStore1', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.prod.prodplanlist.model.ProdPlanListModel1',
	pageSize: 200,
	proxy	: {
		api	: {
			read: _global.api_host_info + "/system/custom/sjflv/prod/prodplanlist/get/event/details.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token: _global.token_id, hq_id: _global.hq_id }
	}
});