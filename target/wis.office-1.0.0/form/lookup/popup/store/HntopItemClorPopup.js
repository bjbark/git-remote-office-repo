Ext.define('lookup.popup.store.HntopItemClorPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.HntopItemClorPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/hantop/item/bommast/get/lookup.do"
		},
		actionMethods: { read: 'POST' },
		extraParams:{ token : _global.token_id }
	}
});