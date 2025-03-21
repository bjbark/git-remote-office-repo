Ext.define('module.custom.kitec.prod.workentry.store.WorkEntryBasePopup', { extend:'Axt.data.Store',
	model :'module.custom.kitec.prod.workentry.model.WorkEntryBasePopup',
	autoLoad: false,
	pageSize: 100,
	proxy   : {
		api: {
			read   : _global.api_host_info + "/system/basic/basemast/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});