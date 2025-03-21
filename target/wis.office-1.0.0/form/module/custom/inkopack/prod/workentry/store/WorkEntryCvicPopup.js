Ext.define('module.custom.inkopack.prod.workentry.store.WorkEntryCvicPopup', { extend:'Axt.data.Store',
	model :'module.custom.inkopack.prod.workentry.model.WorkEntryCvicPopup',
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