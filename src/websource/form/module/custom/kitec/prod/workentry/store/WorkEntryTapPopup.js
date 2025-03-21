Ext.define('module.custom.kitec.prod.workentry.store.WorkEntryTapPopup', { extend:'Axt.data.Store',
	model :'module.custom.kitec.prod.workentry.model.WorkEntryTapPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			update   : _global.api_host_info + "/system/custom/kitec/prod/workentry/set/Tap.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});