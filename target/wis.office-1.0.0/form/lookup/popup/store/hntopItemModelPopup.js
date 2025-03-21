Ext.define('lookup.popup.store.hntopItemModelPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.hntopItemModelPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/hantop/item/itemmodel/get/lookup.do"
		},
		actionMethods: { read: 'POST' },
		extraParams:{ token : _global.token_id }
	}
});