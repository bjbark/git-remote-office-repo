Ext.define('lookup.popup.store.CstmPopup3', {extend:'Axt.data.Store',
	model :'lookup.popup.model.CstmPopup3',
	autoLoad: false,
	pageSize: 500,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/cust/cstmmast/get/lookup3.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});