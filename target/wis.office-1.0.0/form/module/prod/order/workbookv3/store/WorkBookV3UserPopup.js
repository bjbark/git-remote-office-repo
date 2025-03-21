Ext.define('module.prod.order.workbookv3.store.WorkBookV3UserPopup', { extend:'Axt.data.Store',
	model :'module.prod.order.workbookv3.model.WorkBookV3UserPopup',
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