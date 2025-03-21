Ext.define('lookup.popup.store.ItemPopupV3', { extend:'Axt.data.Store',
	model :'lookup.popup.model.ItemPopupV3',
	autoLoad: false,
	remoteSort: true,
//	pageSize: 16,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/item/itemmast/get/lookup3.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});