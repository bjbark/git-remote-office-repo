Ext.define('module.prod.order.workbookv5.store.WorkBookV5ProrPopup', { extend:'Axt.data.Store',
	model :'module.prod.order.workbookv5.model.WorkBookV5ProrPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/prod/plan/prodplan/get/search2.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});