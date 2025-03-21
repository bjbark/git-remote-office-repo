Ext.define('module.custom.komec.prod.workbook.store.WorkBookLastEndPopup', { extend:'Axt.data.Store',
	model :'module.custom.komec.prod.workbook.model.WorkBookLastEndPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/custom/komec/prod/workbook/get/lastEnd.do",
//			update  : _global.api_host_info + "/system/custom/komec/prod/workbook/set/isos.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});


