Ext.define('lookup.popup.store.WkfwPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.WkfwPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/prod/basic/prodlineroute/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});