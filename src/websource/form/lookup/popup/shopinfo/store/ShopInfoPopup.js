Ext.define('lookup.popup.shopinfo.store.ShopInfoPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.shopinfo.model.ShopInfoPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/shop/shopinfo/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});