Ext.define('lookup.popup.store.VendPopup', { extend:'Axt.data.Store',

	model :'lookup.popup.model.VendPopup',
	autoLoad: false,
//	pageSize: 17,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/vend/vendstore/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});