Ext.define('lookup.popup.store.LaboRatePopup', { extend:'Axt.data.Store',
	model	: 'lookup.popup.model.LaboRatePopup',
	autoLoad: false,
//	pageSize: 17,
	pageSize: 100,
	proxy	: {
		api	: {
			read		: _global.api_host_info + "/system/user/laborate/get/lookup.do"
		},
		actionMethods	: { read: 'POST'  },
		extraParams		:{ token : _global.token_id }
	}
});