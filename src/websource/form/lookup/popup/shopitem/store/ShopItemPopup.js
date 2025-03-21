Ext.define('lookup.popup.shopitem.store.ShopItemPopup', {
	extend:'Axt.data.Store',
	model:'lookup.popup.shopitem.model.ShopItemPopup',
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