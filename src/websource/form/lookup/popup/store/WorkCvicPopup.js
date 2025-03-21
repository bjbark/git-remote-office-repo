Ext.define('lookup.popup.store.WorkCvicPopup', { extend:'Axt.data.Store',

	model :'lookup.popup.model.WorkCvicPopup',
	autoLoad: false,
//	pageSize: 17,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/prod/cvic/cvicmast/get/lookup2.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});