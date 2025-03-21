Ext.define('lookup.popup.cust.store.B2BCustGroupPopup', {extend:'Axt.data.Store',
	model :'lookup.popup.cust.model.B2BCustGroupPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info+ "/system/cust/b2bcustgroup/get/lookup.do",
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});