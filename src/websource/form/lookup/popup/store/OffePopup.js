Ext.define('lookup.popup.store.OffePopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.OffePopup',
	autoLoad: false,
	pageSize: 100,
	proxy   : {
		api: {
			read   : _global.api_host_info + "/system/basic/basemast/get/offelookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});