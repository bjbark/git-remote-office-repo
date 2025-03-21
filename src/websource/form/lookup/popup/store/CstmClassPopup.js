Ext.define('lookup.popup.store.CstmClassPopup', { extend:'Axt.data.Store',
	model	:'lookup.popup.model.CstmClassPopup',
	autoLoad: false,
	pageSize: 100,
	proxy	: {
		api	: {
			read		: _global.api_host_info + "/system/cust/cstmclass/get/lookup.do"
		},
		actionMethods	: { read	: 'POST' , update: 'POST' },
		extraParams		: { token	: _global.token_id }
	}
});