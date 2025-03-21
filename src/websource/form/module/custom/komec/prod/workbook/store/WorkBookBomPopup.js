Ext.define('module.custom.komec.prod.workbook.store.WorkBookBomPopup', { extend:'Axt.data.Store',
	model :'module.custom.komec.prod.workbook.model.WorkBookBomPopup',
	autoLoad: false,
	pageSize: 100,
	proxy   : {
		api: {
			read   : _global.api_host_info + "/system/custom/komec/prod/workbook/get/getBom.do",
			update : _global.api_host_info + "/system/custom/komec/prod/workbook/set/setBom.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});