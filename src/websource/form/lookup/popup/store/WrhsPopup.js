Ext.define('lookup.popup.store.WrhsPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.WrhsPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/basic/wrhsmast/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});