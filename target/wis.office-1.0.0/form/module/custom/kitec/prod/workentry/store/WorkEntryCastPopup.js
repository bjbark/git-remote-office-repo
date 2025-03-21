Ext.define('module.custom.kitec.prod.workentry.store.WorkEntryCastPopup', { extend:'Axt.data.Store',
	model :'module.custom.kitec.prod.workentry.model.WorkEntryCastPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/kitec/prod/workentry/get/getCast.do",
			update : _global.api_host_info + "/system/custom/kitec/prod/workentry/set/setCast.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});