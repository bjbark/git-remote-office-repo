Ext.define('module.prod.order.workbookv5.store.WorkBookV5UserPopup', { extend:'Axt.data.Store',
	model :'module.prod.order.workbookv5.model.WorkBookV5UserPopup',
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