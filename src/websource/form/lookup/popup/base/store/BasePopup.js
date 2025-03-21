Ext.define('lookup.popup.base.store.BasePopup', { extend:'Axt.data.Store',
	model :'lookup.popup.base.model.BasePopup',
	autoLoad: false,
	pageSize: 100,
	proxy   : {
		api: {
			read   : _global.api_host_info + "/system/basic/basemast/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});