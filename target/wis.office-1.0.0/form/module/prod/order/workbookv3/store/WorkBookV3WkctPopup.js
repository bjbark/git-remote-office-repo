Ext.define('module.prod.order.workbookv3.store.WorkBookV3WkctPopup', { extend:'Axt.data.Store',
	model :'module.prod.order.workbookv3.model.WorkBookV3WkctPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/prod/basic/wkctmast/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});