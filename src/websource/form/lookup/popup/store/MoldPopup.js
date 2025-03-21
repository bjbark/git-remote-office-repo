Ext.define('lookup.popup.store.MoldPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.MoldPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/prod/mold/moldmast/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});