Ext.define('lookup.popup.cust.store.CustPopup', {extend:'Axt.data.Store',
	model :'lookup.popup.cust.model.CustPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info+ "/system/cust/custstore/get/lookup.do",
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});