Ext.define('lookup.popup.store.CstmPopup', {extend:'Axt.data.Store',
	model :'lookup.popup.model.CstmPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/cust/cstmmast/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});