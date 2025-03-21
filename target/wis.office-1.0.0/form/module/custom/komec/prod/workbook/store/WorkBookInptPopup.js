Ext.define('module.custom.komec.prod.workbook.store.WorkBookInptPopup', { extend:'Axt.data.Store',
	model :'module.custom.komec.prod.workbook.model.WorkBookInpt',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/custom/komec/prod/workbook/get/inptsearch.do",
			update  : _global.api_host_info + "/system/custom/komec/prod/workbook/set/isos.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});


