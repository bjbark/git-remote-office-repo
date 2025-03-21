Ext.define('lookup.popup.store.UnitPopup', { extend:'Axt.data.Store',

	model :'lookup.popup.model.UnitPopup',

	autoLoad: false,
//	pageSize: 17,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/basic/unitmast/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});