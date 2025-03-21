Ext.define('module.custom.hantop.prod.workbookv1.store.WorkBookV1ProrPopup', { extend:'Axt.data.Store',
	model :'module.custom.hantop.prod.workbookv1.model.WorkBookV1ProrPopup',
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