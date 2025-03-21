Ext.define('lookup.popup.store.FabcPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.FabcPopup',
	autoLoad: false,
	remoteSort: true,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/iypkg/item/fabcmast/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});