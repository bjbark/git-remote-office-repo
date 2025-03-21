Ext.define('lookup.popup.item.store.ItemClassPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.item.model.ItemClassPopup',

	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/item/itemclass/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});