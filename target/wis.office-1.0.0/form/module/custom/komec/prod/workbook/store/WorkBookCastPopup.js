Ext.define('module.custom.komec.prod.workbook.store.WorkBookCastPopup', { extend:'Axt.data.Store',
	model :'module.custom.komec.prod.workbook.model.WorkBookCastPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/komec/prod/workbook/get/getCast.do",
			update : _global.api_host_info + "/system/custom/komec/prod/workbook/set/setCast.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});