Ext.define('module.custom.dhtec.prod.workentry.store.WorkEntryProrPopup', { extend:'Axt.data.Store',
	model :'module.custom.dhtec.prod.workentry.model.WorkEntryProrPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/prod/plan/prodplan/get/search2.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});