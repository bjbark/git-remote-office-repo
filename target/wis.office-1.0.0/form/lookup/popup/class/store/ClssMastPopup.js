Ext.define('lookup.popup.class.store.ClssMastPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.class.model.ClssMastPopup',

	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/basic/clssmast/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});