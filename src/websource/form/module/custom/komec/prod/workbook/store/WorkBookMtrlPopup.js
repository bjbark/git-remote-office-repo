Ext.define('module.custom.komec.prod.workbook.store.WorkBookMtrlPopup', { extend:'Axt.data.Store',
	model :'module.custom.komec.prod.workbook.model.WorkBookMtrlPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/komec/prod/workbook/get/workmtrl.do",
			update : _global.api_host_info + "/system/custom/komec/prod/workbook/set/bookmtrl.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id , stor_id : _global.stor_id }
	}
});