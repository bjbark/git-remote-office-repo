Ext.define('module.custom.iypkg.prod.workbookv2.store.WorkBookV2CvicPopup', { extend:'Axt.data.Store',
	model :'module.custom.iypkg.prod.workbookv2.model.WorkBookV2CvicPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/prod/cvic/cvicmast/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});