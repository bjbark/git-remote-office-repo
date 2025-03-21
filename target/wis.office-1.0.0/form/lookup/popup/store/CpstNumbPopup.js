Ext.define('lookup.popup.store.CpstNumbPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.BasePopup',
	autoLoad: false,
	pageSize: 500,
	proxy   : {
		api: {
			read   : _global.api_host_info + "/system/basic/basemast/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});