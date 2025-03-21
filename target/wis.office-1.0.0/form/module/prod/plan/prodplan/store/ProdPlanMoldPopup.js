Ext.define('module.prod.plan.prodplan.store.ProdPlanMoldPopup', { extend:'Axt.data.Store',
	model :'module.prod.plan.prodplan.model.ProdPlanMoldPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/prod/mold/moldmast/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});