Ext.define('lookup.popup.store.BzplPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.BzplPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/basic/bzplmast/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});