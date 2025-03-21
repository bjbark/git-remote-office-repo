Ext.define('module.prod.order.workbookv4.store.WorkBookV4CvicPopup', { extend:'Axt.data.Store',
	model :'module.prod.order.workbookv4.model.WorkBookV4CvicPopup',
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