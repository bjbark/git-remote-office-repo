Ext.define('module.prod.order.workbookv4.store.WorkBookV4ProrPopup', { extend:'Axt.data.Store',
	model :'module.prod.order.workbookv4.model.WorkBookV4ProrPopup',
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