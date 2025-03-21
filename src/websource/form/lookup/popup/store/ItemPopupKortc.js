Ext.define('lookup.popup.store.ItemPopupKortc', { extend:'Axt.data.Store',
	model :'lookup.popup.model.ItemPopupKortc',
	autoLoad: false,
	remoteSort: true,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/kortc/item/itemmast/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});