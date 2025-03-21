Ext.define('lookup.popup.store.HdcoPopup', { extend:'Axt.data.Store',

	model :'lookup.popup.model.HdcoPopup',
	autoLoad: false,
//	pageSize: 17,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/basic/hdcomast/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});