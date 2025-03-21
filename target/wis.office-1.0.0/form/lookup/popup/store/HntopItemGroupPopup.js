Ext.define('lookup.popup.store.HntopItemGroupPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.HntopItemGroupPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/hantop/item/itemgroup/get/lookup.do"
		},
		actionMethods: { read: 'POST' },
		extraParams:{ token : _global.token_id }
	}
});