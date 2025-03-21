Ext.define('lookup.popup.store.CarPopup', { extend:'Axt.data.Store',
	model		: 'lookup.popup.model.CarPopup',
	pageSize	: 100,
	proxy		: {
		api	: {
			read   : _global.api_host_info + "/system/basic/carmast/get/lookup.do",
		},
		actionMethods: {
			read	: 'POST', update	: 'POST'
		},
		extraParams:{
			token : _global.token_id
		}
	}
});

