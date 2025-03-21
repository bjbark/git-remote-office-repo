Ext.define('lookup.popup.store.WkrnPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.WkrnPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/user/wkrnmast/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});