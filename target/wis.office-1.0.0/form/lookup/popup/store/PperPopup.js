Ext.define('lookup.popup.store.PperPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.PperPopup',
	autoLoad: false,
	remoteSort: true,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/iypkg/item/ppermast/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});