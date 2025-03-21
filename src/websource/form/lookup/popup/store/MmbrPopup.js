Ext.define('lookup.popup.store.MmbrPopup', { extend:'Axt.data.Store',
	model	: 'lookup.popup.model.MmbrPopup',
	autoLoad: false,
//	pageSize: 17,
	pageSize: 100,
	proxy	: {
		api	: {
			read		: _global.api_host_info + "/system/workshop/print/basic/mmbrmast/get/lookup.do"
		},
		actionMethods	: { read: 'POST'  },
		extraParams		:{ token : _global.token_id }
	}
});