Ext.define('module.custom.symct.prod.workentry.store.WorkCvicPopup', { extend:'Axt.data.Store',

	model :'module.custom.symct.prod.workentry.model.WorkCvicPopup',
	autoLoad: false,
//	pageSize: 17,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/prod/basic/wkctcvicmast/get/detailsearch.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});