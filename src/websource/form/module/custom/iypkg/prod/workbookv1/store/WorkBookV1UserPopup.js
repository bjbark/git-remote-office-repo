Ext.define('module.custom.iypkg.prod.workbookv1.store.WorkBookV1UserPopup', { extend:'Axt.data.Store',
	model :'module.custom.iypkg.prod.workbookv1.model.WorkBookV1UserPopup',
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