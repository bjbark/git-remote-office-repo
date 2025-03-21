Ext.define('lookup.popup.store.ScopePopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.ScopePopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/user/userscope/get/lookup.do"
		},
		actionMethods: { read: 'POST' , update: 'POST' },
		extraParams:{ token : _global.token_id }
	}
});