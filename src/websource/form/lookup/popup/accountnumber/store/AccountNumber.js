Ext.define('lookup.popup.accountnumber.store.AccountNumber', { extend:'Axt.data.Store',
	model :'lookup.popup.accountnumber.model.AccountNumber',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/basic/accountnumber/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});