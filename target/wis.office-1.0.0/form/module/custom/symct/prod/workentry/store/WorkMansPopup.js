Ext.define('module.custom.symct.prod.workentry.store.WorkMansPopup', { extend:'Axt.data.Store',
	model :'module.custom.symct.prod.workentry.model.WorkMansPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/prod/basic/wkctusermast/get/detailsearch.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});