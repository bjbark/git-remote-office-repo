Ext.define('lookup.popup.store.ProdPopup', {extend:'Axt.data.Store',
	model :'lookup.popup.model.ProdPopup',
	autoLoad: false,
	pageSize: 99999,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/iypkg/item/productmast/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});