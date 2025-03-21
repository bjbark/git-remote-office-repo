Ext.define('lookup.popup.store.BankPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.BankPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/basic/bankinfo/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});