Ext.define('lookup.popup.store.ItemPopupSjflv', { extend:'Axt.data.Store',
	model :'lookup.popup.model.ItemPopup',
	autoLoad: false,
	remoteSort: true,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/sjflv/item/itemmast/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});