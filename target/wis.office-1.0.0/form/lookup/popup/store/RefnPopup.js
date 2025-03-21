Ext.define('lookup.popup.store.RefnPopup', { extend:'Axt.data.Store',

	model :'lookup.popup.model.RefnPopup',
	autoLoad: false,
//	pageSize: 17,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/basic/refnmast/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});