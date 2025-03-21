Ext.define('lookup.popup.store.UserPopup', { extend:'Axt.data.Store',

	model :'lookup.popup.model.UserPopup',
	autoLoad: false,
//	pageSize: 17,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/user/usermast/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});