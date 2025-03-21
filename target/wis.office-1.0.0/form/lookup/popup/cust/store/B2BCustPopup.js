Ext.define('lookup.popup.cust.store.B2BCustPopup', {extend:'Axt.data.Store',
	model :'lookup.popup.cust.model.B2BCustPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info+ "/system/cust/b2bcustinfo/get/lookup.do",
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});