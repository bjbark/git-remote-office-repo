Ext.define('module.custom.komec.prod.workbook.store.WorkBookWkctPopup', { extend:'Axt.data.Store',
	model :'module.custom.komec.prod.workbook.model.WorkBookWkctPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/prod/basic/wkctmast/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});