Ext.define('module.custom.dhtec.prod.workentry.store.WorkEntryMtrlPopup', { extend:'Axt.data.Store',
	model :'module.custom.dhtec.prod.workentry.model.WorkEntryMtrlPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/dhtec/prod/workentry/get/lotisossum.do",
			update : _global.api_host_info + "/system/custom/dhtec/prod/workentry/set/bookmtrl.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});