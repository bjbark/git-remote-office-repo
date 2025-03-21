Ext.define('lookup.popup.store.ItemSpecPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.ItemPopup',
	autoLoad: false,
	remoteSort: true,
//	pageSize: 16,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/item/itemmast/get/lookupspec.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});