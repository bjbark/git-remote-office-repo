Ext.define('module.custom.kitec.prod.workentry.store.WorkEntryUserPopup', { extend:'Axt.data.Store',
	model :'module.custom.kitec.prod.workentry.model.WorkEntryUserPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/user/usermast/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});