Ext.define('module.prod.order.workbookv5.store.WorkBookV5CvicPopup', { extend:'Axt.data.Store',
	model :'module.prod.order.workbookv5.model.WorkBookV5CvicPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/prod/cvic/cvicmast/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});