Ext.define('module.custom.inkopack.prod.workentry.store.WorkEntryUserPopup', { extend:'Axt.data.Store',
	model :'module.custom.inkopack.prod.workentry.model.WorkEntryUserPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/custom/incopack/prod/workentry/get/user.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});