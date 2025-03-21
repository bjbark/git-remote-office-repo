Ext.define('lookup.popup.item.store.ItemPopup', {
	extend:'Axt.data.Store',
	model:'lookup.popup.item.model.ItemPopup',
	autoLoad: false,
//	pageSize: 16,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/item/itemstore/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});