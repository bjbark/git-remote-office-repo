Ext.define('lookup.popup.store.HntopItemTypePopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.HntopItemTypePopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/hantop/item/itemtype/get/lookup.do"
		},
		actionMethods: { read: 'POST' },
		extraParams:{ token : _global.token_id }
	}
});