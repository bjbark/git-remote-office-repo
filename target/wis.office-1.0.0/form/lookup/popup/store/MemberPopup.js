Ext.define('lookup.popup.store.MemberPopup', { extend:'Axt.data.Store',
	model	: 'lookup.popup.model.MemberPopup',
	autoLoad: false,
//	pageSize: 17,
	pageSize: 100,
	proxy	: {
		api	: {
			read		: _global.api_host_info + "/system/membership/memberentry/get/lookup.do"
		},
		actionMethods	: { read: 'POST'  },
		extraParams		:{ token : _global.token_id }
	}
});