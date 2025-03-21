Ext.define('module.custom.kitec.prod.workentry.store.WorkEntryMtrlPopup', { extend:'Axt.data.Store',
	model :'module.custom.kitec.prod.workentry.model.WorkEntryMtrlPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/kitec/prod/workentry/get/lotisossum.do",
			update : _global.api_host_info + "/system/custom/kitec/prod/workentry/set/bookmtrl.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});