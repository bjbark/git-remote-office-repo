Ext.define('module.prod.order.workbookv3.store.WorkBookV3ProrPopup', { extend:'Axt.data.Store',
	model :'module.prod.order.workbookv3.model.WorkBookV3ProrPopup',
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