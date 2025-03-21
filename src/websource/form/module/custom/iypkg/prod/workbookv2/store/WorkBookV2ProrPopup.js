Ext.define('module.custom.iypkg.prod.workbookv2.store.WorkBookV2ProrPopup', { extend:'Axt.data.Store',
	model :'module.custom.iypkg.prod.workbookv2.model.WorkBookV2ProrPopup',
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