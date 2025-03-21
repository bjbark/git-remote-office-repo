Ext.define('module.custom.iypkg.prod.workbookv2.store.WorkBookV2UserPopup', { extend:'Axt.data.Store',
	model :'module.custom.iypkg.prod.workbookv2.model.WorkBookV2UserPopup',
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