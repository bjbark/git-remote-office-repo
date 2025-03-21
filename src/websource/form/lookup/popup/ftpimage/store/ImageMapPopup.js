Ext.define('lookup.popup.ftpimage.store.ImageMapPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.ftpimage.model.ImageMapPopup',
	autoLoad: false,
//	pageSize: 16,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/item/itemmarket/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});