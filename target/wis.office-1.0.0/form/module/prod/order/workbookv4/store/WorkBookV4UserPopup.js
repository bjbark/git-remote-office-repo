Ext.define('module.prod.order.workbookv4.store.WorkBookV4UserPopup', { extend:'Axt.data.Store',
	model :'module.prod.order.workbookv4.model.WorkBookV4UserPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/prod/order/workbookv4/get/user.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});