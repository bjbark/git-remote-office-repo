Ext.define('lookup.popup.store.AsmtPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.AsmtPopup',
	autoLoad: false,
	remoteSort: true,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/iypkg/item/asmtmast/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});