Ext.define('lookup.popup.store.ItemClassPopup', { extend:'Axt.data.Store',
	model	:'lookup.popup.model.ItemClassPopup',
	autoLoad: false,
	pageSize: 100,
	proxy	: {
		api	: {
			read		: _global.api_host_info + "/system/item/itemclss/get/lookup.do"
		},
		actionMethods	: { read	: 'POST' , update: 'POST' },
		extraParams		: { token	: _global.token_id }
	}
});