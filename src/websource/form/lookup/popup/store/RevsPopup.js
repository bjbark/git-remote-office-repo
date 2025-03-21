Ext.define('lookup.popup.store.RevsPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.RevsPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/custom/komec/item/bommast/get/search2.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});