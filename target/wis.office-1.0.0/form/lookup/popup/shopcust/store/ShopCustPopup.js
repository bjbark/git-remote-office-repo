Ext.define('lookup.popup.shopcust.store.ShopCustPopup', {extend:'Axt.data.Store',
	model :'lookup.popup.shopcust.model.ShopCustPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/shop/shopcustinfo/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});