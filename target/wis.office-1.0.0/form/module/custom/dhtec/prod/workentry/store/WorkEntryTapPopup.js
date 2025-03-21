Ext.define('module.custom.dhtec.prod.workentry.store.WorkEntryTapPopup', { extend:'Axt.data.Store',
	model :'module.custom.dhtec.prod.workentry.model.WorkEntryTapPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			update   : _global.api_host_info + "/system/custom/dhtec/prod/workentry/set/Tap.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});