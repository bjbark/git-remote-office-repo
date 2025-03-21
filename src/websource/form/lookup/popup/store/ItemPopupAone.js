Ext.define('lookup.popup.store.ItemPopupAone', { extend:'Axt.data.Store',
	model :'lookup.popup.model.ItemPopupAone',
	autoLoad: false,
	remoteSort: true,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/aone/item/itemmast/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});