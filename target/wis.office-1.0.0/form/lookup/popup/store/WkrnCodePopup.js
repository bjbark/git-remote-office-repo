Ext.define('lookup.popup.store.WkrnCodePopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.WkrnCodePopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/user/laborate/get/codelookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});