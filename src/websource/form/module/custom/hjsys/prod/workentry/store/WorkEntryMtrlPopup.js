Ext.define('module.custom.hjsys.prod.workentry.store.WorkEntryMtrlPopup', { extend:'Axt.data.Store',
	model :'module.custom.hjsys.prod.workentry.model.WorkEntryMtrlPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/hjsys/prod/workentry/get/mtrlstock.do",
			update : _global.api_host_info + "/system/custom/hjsys/prod/workentry/set/isos.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});