Ext.define('module.custom.dhtec.prod.workentry.store.WorkEntryWkctPopup', { extend:'Axt.data.Store',
	model :'module.custom.dhtec.prod.workentry.model.WorkEntryWkctPopup',
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