Ext.define('module.prod.plan.prodplan.store.ProdPlanBasePopup', { extend:'Axt.data.Store',
	model :'module.prod.plan.prodplan.model.ProdPlanBasePopup',
	autoLoad: false,
	pageSize: 100,
	proxy   : {
		api: {
			read   : _global.api_host_info + "/system/basic/basemast/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});