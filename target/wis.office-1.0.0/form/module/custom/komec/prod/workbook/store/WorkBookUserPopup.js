Ext.define('module.custom.komec.prod.workbook.store.WorkBookUserPopup', { extend:'Axt.data.Store',
	model :'module.custom.komec.prod.workbook.model.WorkBookUserPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/user/usermast/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});